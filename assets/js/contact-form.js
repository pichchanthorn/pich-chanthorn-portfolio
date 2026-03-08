/* =====================================================
   CONTACT-FORM.JS — EmailJS Contact Form with
   validation, rate limiting, honeypot, and toast
===================================================== */

(() => {
  "use strict";

  const EMAIL_JS_PUBLIC_KEY = "tjw1lER8-6wZCb5Wg";
  const EMAIL_JS_SERVICE_ID = "service_1f3kxsk";
  const EMAIL_JS_TEMPLATE_ID = "template_5tfub9f";
  const FORM_SUBMIT_RATE_LIMIT_MS = 3000;

  let lastFormSubmissionAt = 0;

  function sanitizeInput(value) {
    return String(value ?? "")
      .replace(/[<>]/g, "")
      .replace(/[\u0000-\u001F\u007F]/g, "")
      .trim();
  }

  function getCurrentLanguage() {
    return window.__i18n?.getCurrentLanguage?.() || "en";
  }

  function getTranslation(language, key) {
    const translations = window.__i18n?.TRANSLATIONS;
    return translations?.[language]?.[key] || translations?.en?.[key] || "";
  }

  function ensureHoneypotField(form) {
    if (!form) return null;

    let honeypot = form.querySelector('input[name="website"]');
    if (honeypot) return honeypot;

    honeypot = document.createElement("input");
    honeypot.type = "text";
    honeypot.name = "website";
    honeypot.autocomplete = "off";
    honeypot.tabIndex = -1;
    honeypot.setAttribute("aria-hidden", "true");
    honeypot.style.position = "absolute";
    honeypot.style.left = "-9999px";
    honeypot.style.opacity = "0";
    honeypot.style.pointerEvents = "none";
    form.appendChild(honeypot);

    return honeypot;
  }

  function setSendButtonState(button, isLoading, language) {
    if (!button) return;
    button.disabled = isLoading;
    button.setAttribute("aria-busy", String(isLoading));
    button.classList.toggle("is-loading", isLoading);
    const label = button.querySelector("span") || button;
    const key = isLoading ? "contact.form.sending" : "contact.form.submit";
    label.textContent = getTranslation(language, key);
  }

  function setFormStatus(formStatus, message, type) {
    if (!formStatus) return;
    formStatus.textContent = message || "";
    formStatus.classList.remove("is-success", "is-error");
    if (type === "success") formStatus.classList.add("is-success");
    if (type === "error") formStatus.classList.add("is-error");
  }

  function showFormToast(message, type = "success") {
    const toast = document.getElementById("formToast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.remove("is-success", "is-error");
    toast.classList.add("is-visible", type === "error" ? "is-error" : "is-success");

    window.clearTimeout(showFormToast.timeoutId);
    showFormToast.timeoutId = window.setTimeout(() => {
      toast.classList.remove("is-visible", "is-success", "is-error");
    }, 3000);
  }

  function validateField(field) {
    if (!field) return { valid: true, message: "" };

    const value = String(field.value || "").trim();
    if (!value) {
      return { valid: false, message: "This field is required." };
    }

    if (field.type === "email") {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
      if (!isValidEmail) {
        return { valid: false, message: "Please enter a valid email address." };
      }
    }

    return { valid: true, message: "" };
  }

  function updateFieldValidationUI(field) {
    const group = field?.closest(".form-input-group");
    if (!group || !field) return true;

    const errorElementId = field.getAttribute("aria-describedby");
    const errorElement = errorElementId ? document.getElementById(errorElementId) : null;
    const { valid, message } = validateField(field);

    group.classList.remove("is-valid", "is-invalid");
    group.classList.add(valid ? "is-valid" : "is-invalid");
    field.setAttribute("aria-invalid", String(!valid));

    if (errorElement) {
      errorElement.textContent = valid ? "" : message;
    }

    return valid;
  }

  function initializeFormFieldValidation(form) {
    if (!form) return [];

    const fields = [...form.querySelectorAll("input[name='name'], input[name='email'], textarea[name='message']")];
    fields.forEach(field => {
      field.addEventListener("blur", () => updateFieldValidationUI(field));
      field.addEventListener("input", () => {
        const group = field.closest(".form-input-group");
        if (group?.classList.contains("is-invalid")) {
          updateFieldValidationUI(field);
        }
      });
    });

    return fields;
  }

  function initializeEmailJs(dom) {
    if (window.emailjs?.init) {
      emailjs.init(EMAIL_JS_PUBLIC_KEY);
    }

    const { form, formStatus, sendButton } = dom;
    if (!form || !formStatus || !sendButton) return;

    formStatus.setAttribute("role", "status");
    formStatus.setAttribute("aria-live", "polite");

    const honeypot = ensureHoneypotField(form);
    const fields = initializeFormFieldValidation(form);

    form.addEventListener("submit", async event => {
      event.preventDefault();

      const language = getCurrentLanguage();
      setFormStatus(formStatus, "", null);

      if (honeypot?.value.trim()) return;

      const isFormValid = fields.every(field => updateFieldValidationUI(field));
      if (!isFormValid) {
        setFormStatus(formStatus, "Please correct the highlighted fields and try again.", "error");
        return;
      }

      const now = Date.now();
      if (now - lastFormSubmissionAt < FORM_SUBMIT_RATE_LIMIT_MS) {
        const rateLimitMessage = getTranslation(language, "contact.form.rateLimit");
        setFormStatus(formStatus, rateLimitMessage, "error");
        showFormToast(rateLimitMessage, "error");
        return;
      }
      lastFormSubmissionAt = now;

      if (!window.emailjs?.send) {
        const errorMessage = getTranslation(language, "contact.form.error");
        setFormStatus(formStatus, errorMessage, "error");
        showFormToast(errorMessage, "error");
        return;
      }

      const params = {
        name: sanitizeInput(form?.name?.value),
        email: sanitizeInput(form?.email?.value),
        message: sanitizeInput(form?.message?.value)
      };

      setSendButtonState(sendButton, true, language);

      try {
        await emailjs.send(EMAIL_JS_SERVICE_ID, EMAIL_JS_TEMPLATE_ID, params);
        const successMessage = getTranslation(language, "contact.form.success");
        setFormStatus(formStatus, successMessage, "success");
        showFormToast(successMessage, "success");
        form.reset();
        fields.forEach(field => {
          const group = field.closest(".form-input-group");
          if (!group) return;
          group.classList.remove("is-valid", "is-invalid");
          field.setAttribute("aria-invalid", "false");
          const errorElementId = field.getAttribute("aria-describedby");
          const errorElement = errorElementId ? document.getElementById(errorElementId) : null;
          if (errorElement) errorElement.textContent = "";
        });
      } catch (error) {
        console.error("EmailJS Error:", error);
        const errorMessage = getTranslation(language, "contact.form.error");
        setFormStatus(formStatus, errorMessage, "error");
        showFormToast(errorMessage, "error");
      } finally {
        setSendButtonState(sendButton, false, language);
      }
    });
  }

  // Expose initialization function
  window.__contactForm = { initializeEmailJs };
})();
