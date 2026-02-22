/* =====================================================
   MAIN.JS — Portfolio Global Script
   Description: UI interactions + i18n + EmailJS
===================================================== */

(() => {
  "use strict";

  const EMAIL_JS_PUBLIC_KEY = "tjw1lER8-6wZCb5Wg";
  const EMAIL_JS_SERVICE_ID = "service_1f3kxsk";
  const EMAIL_JS_TEMPLATE_ID = "template_5tfub9f";

  const I18N_STORAGE_KEY = "portfolio_language";
  const FORM_SUBMIT_RATE_LIMIT_MS = 3000;

  let lastFormSubmissionAt = 0;

  const TRANSLATIONS = {
    en: {
      "menu.toggle": "Toggle menu",
      "nav.main": "Main navigation",
      "nav.home": "Home",
      "nav.about": "About",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.certificates": "Certificates",
      "nav.education": "Education",
      "nav.experience": "Experience",
      "nav.contact": "Contact",
      "role.student": "IT Student & Aspiring Full-Stack Developer",
      "role.fullstack": "Full-Stack Developer",
      "home.welcome": "Welcome to my portfolio",
      "home.cta.projects": "View Projects",
      "home.cta.cv": "Download CV",
      "footer.built": "Built with HTML, CSS & JavaScript",
      "lang.label": "Language",
      "lang.en": "English",
      "lang.km": "Khmer",
      "contact.subtitle": "Feel free to send me a message or connect with me on social media.",
      "contact.email": "Email",
      "contact.phone": "Phone",
      "contact.location": "Location",
      "contact.form.title": "Send Me a Message",
      "contact.form.name": "Your Name",
      "contact.form.email": "Email Address",
      "contact.form.message": "Your Message",
      "contact.form.placeholder.name": "Enter your name",
      "contact.form.placeholder.email": "Enter your email",
      "contact.form.placeholder.message": "Write your message...",
      "contact.form.submit": "Send Message",
      "contact.form.sending": "Sending...",
      "contact.form.success": "✅ Message sent successfully!",
      "contact.form.error": "❌ Failed to send message. Please try again."
    },
    km: {
      "menu.toggle": "បើក/បិទ ម៉ឺនុយ",
      "nav.main": "ម៉ឺនុយមេ",
      "nav.home": "ទំព័រដើម",
      "nav.about": "អំពីខ្ញុំ",
      "nav.skills": "ជំនាញ",
      "nav.projects": "គម្រោង",
      "nav.certificates": "វិញ្ញាបនបត្រ",
      "nav.education": "ការអប់រំ",
      "nav.experience": "បទពិសោធន៍",
      "nav.contact": "ទំនាក់ទំនង",
      "role.student": "និស្សិត IT និងអ្នកអភិវឌ្ឍន៍ Full-Stack កំពុងអភិវឌ្ឍ",
      "role.fullstack": "អ្នកអភិវឌ្ឍន៍ Full-Stack",
      "home.welcome": "សូមស្វាគមន៍មកកាន់ផតហ្វូលីយ៉ូរបស់ខ្ញុំ",
      "home.cta.projects": "មើលគម្រោង",
      "home.cta.cv": "ទាញយក CV",
      "footer.built": "បង្កើតដោយ HTML, CSS និង JavaScript",
      "lang.label": "ភាសា",
      "lang.en": "អង់គ្លេស",
      "lang.km": "ខ្មែរ",
      "contact.subtitle": "អ្នកអាចផ្ញើសារ ឬភ្ជាប់ទំនាក់ទំនងតាមបណ្ដាញសង្គមរបស់ខ្ញុំបាន។",
      "contact.email": "អ៊ីមែល",
      "contact.phone": "ទូរស័ព្ទ",
      "contact.location": "ទីតាំង",
      "contact.form.title": "ផ្ញើសារមកខ្ញុំ",
      "contact.form.name": "ឈ្មោះរបស់អ្នក",
      "contact.form.email": "អាសយដ្ឋានអ៊ីមែល",
      "contact.form.message": "សាររបស់អ្នក",
      "contact.form.placeholder.name": "បញ្ចូលឈ្មោះរបស់អ្នក",
      "contact.form.placeholder.email": "បញ្ចូលអ៊ីមែលរបស់អ្នក",
      "contact.form.placeholder.message": "សរសេរសាររបស់អ្នក...",
      "contact.form.submit": "ផ្ញើសារ",
      "contact.form.sending": "កំពុងផ្ញើ...",
      "contact.form.success": "✅ ផ្ញើសារបានជោគជ័យ!",
      "contact.form.error": "❌ ផ្ញើសារមិនជោគជ័យ។ សូមព្យាយាមម្តងទៀត។"
    }
  };

  const NAV_KEY_MAP = {
    "index.html": "nav.home",
    "about.html": "nav.about",
    "skills.html": "nav.skills",
    "projects.html": "nav.projects",
    "certificates.html": "nav.certificates",
    "education.html": "nav.education",
    "experience.html": "nav.experience",
    "contact.html": "nav.contact"
  };

  /**
   * Cached common DOM references used across initializers.
   */
  function cacheDom() {
    return {
      menuButton: document.getElementById("menuBtn"),
      sidebar: document.getElementById("sidebar"),
      mainNav: document.querySelector(".nav"),
      sidebarFooter: document.querySelector(".sidebar-footer"),
      form: document.getElementById("contactForm"),
      formStatus: document.getElementById("formStatus"),
      sendButton: document.getElementById("sendBtn")
    };
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function getCurrentLanguage() {
    const saved = localStorage.getItem(I18N_STORAGE_KEY);
    if (saved && TRANSLATIONS[saved]) return saved;
    return "en";
  }

  function t(key, language = getCurrentLanguage()) {
    return TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? key;
  }

  function setI18nAttribute(element, key) {
    if (!element || !key) return;
    element.setAttribute("data-i18n", key);
  }

  function setI18nPlaceholderAttribute(element, key) {
    if (!element || !key) return;
    element.setAttribute("data-i18n-placeholder", key);
  }

  function setI18nAriaLabelAttribute(element, key) {
    if (!element || !key) return;
    element.setAttribute("data-i18n-aria-label", key);
  }

  function setTextContent(element, value) {
    if (!element || element.textContent === value) return;
    element.textContent = value;
  }

  function setWidthStyle(element, value) {
    if (!element || element.style.width === value) return;
    element.style.width = value;
  }

  function parseInteger(value) {
    const parsed = parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function sanitizeInput(value) {
    return String(value ?? "")
      .replace(/[<>]/g, "")
      .replace(/[\u0000-\u001F\u007F]/g, "")
      .trim();
  }

  function updateStatusMessage(statusElement, message, color) {
    if (!statusElement) return;
    setTextContent(statusElement, message);
    statusElement.style.color = color;
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

  function setSendButtonLoadingState(sendButton, loading, language) {
    if (!sendButton) return;

    sendButton.disabled = loading;
    sendButton.setAttribute("aria-busy", String(loading));

    const label = sendButton.querySelector("span") || sendButton;
    const translationKey = loading ? "contact.form.sending" : "contact.form.submit";
    setTextContent(label, t(translationKey, language));
  }

  function animateValue(duration, targetValue, onUpdate) {
    const startTime = performance.now();
    let previousValue = -1;

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const currentValue = Math.floor(targetValue * progress);

      if (currentValue !== previousValue) {
        onUpdate(currentValue);
        previousValue = currentValue;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  /**
   * Applies i18n binding attributes for all translatable elements.
   */
  function attachI18nAttributes(dom) {
    setI18nAriaLabelAttribute(dom.menuButton, "menu.toggle");
    setI18nAriaLabelAttribute(dom.mainNav, "nav.main");

    Object.entries(NAV_KEY_MAP).forEach(([href, key]) => {
      document.querySelectorAll(`.nav a[href="${href}"] span`).forEach(el => setI18nAttribute(el, key));
    });

    document.querySelectorAll(".site-footer p").forEach(el => setI18nAttribute(el, "footer.built"));

    const roleElement = document.querySelector(".role");
    if (roleElement) {
      const roleText = roleElement.textContent.trim();
      if (roleText.includes("IT Student")) {
        setI18nAttribute(roleElement, "role.student");
      } else {
        setI18nAttribute(roleElement, "role.fullstack");
      }
    }

    const homeWelcome = document.querySelector(".hero-subtitle");
    if (homeWelcome) setI18nAttribute(homeWelcome, "home.welcome");

    const homePrimaryButton = document.querySelector('.hero-buttons .btn.primary');
    if (homePrimaryButton) setI18nAttribute(homePrimaryButton, "home.cta.projects");

    const homeOutlineButton = document.querySelector('.hero-buttons .btn.outline');
    if (homeOutlineButton) setI18nAttribute(homeOutlineButton, "home.cta.cv");

    const contactSubtitle = document.querySelector(".contact-page .subtitle");
    if (contactSubtitle) setI18nAttribute(contactSubtitle, "contact.subtitle");

    const contactLabels = document.querySelectorAll(".contact-card .contact-label");
    if (contactLabels[0]) setI18nAttribute(contactLabels[0], "contact.email");
    if (contactLabels[1]) setI18nAttribute(contactLabels[1], "contact.phone");
    if (contactLabels[2]) setI18nAttribute(contactLabels[2], "contact.location");

    const contactFormTitle = document.querySelector(".form-title");
    if (contactFormTitle) setI18nAttribute(contactFormTitle, "contact.form.title");

    const contactFormGroups = document.querySelectorAll(".contact-form .form-group");
    if (contactFormGroups[0]) {
      const label = contactFormGroups[0].querySelector("label");
      setI18nAttribute(label, "contact.form.name");
    }
    if (contactFormGroups[1]) {
      const label = contactFormGroups[1].querySelector("label");
      setI18nAttribute(label, "contact.form.email");
    }
    if (contactFormGroups[2]) {
      const label = contactFormGroups[2].querySelector("label");
      setI18nAttribute(label, "contact.form.message");
    }

    setI18nPlaceholderAttribute(document.getElementById("name"), "contact.form.placeholder.name");
    setI18nPlaceholderAttribute(document.getElementById("email"), "contact.form.placeholder.email");
    setI18nPlaceholderAttribute(document.getElementById("message"), "contact.form.placeholder.message");

    const sendButtonText = dom.sendButton?.querySelector("span");
    if (sendButtonText) setI18nAttribute(sendButtonText, "contact.form.submit");
  }

  /**
   * Injects language switcher inside sidebar footer if not already present.
   */
  function injectLanguageSwitcher(sidebarFooter) {
    if (!sidebarFooter || sidebarFooter.querySelector(".lang-switcher")) return;

    const year = new Date().getFullYear();

    sidebarFooter.innerHTML = `
      <div class="lang-switcher" role="group" data-i18n-aria-label="lang.label">
        <span class="lang-switcher-label" data-i18n="lang.label"></span>
        <div class="lang-switcher-buttons">
          <button type="button" class="lang-btn" data-lang="en" data-i18n="lang.en"></button>
          <button type="button" class="lang-btn" data-lang="km" data-i18n="lang.km"></button>
        </div>
      </div>
      <p class="sidebar-copy">© <span id="sidebarYear">${year}</span> Pich Chanthorn</p>
    `;
  }

  /**
   * Applies all translations for text, placeholders and aria-labels.
   */
  function applyTranslations(language) {
    const activeLanguage = TRANSLATIONS[language] ? language : "en";
    const dictionary = TRANSLATIONS[activeLanguage];

    document.documentElement.lang = activeLanguage;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (!key || !dictionary[key]) return;
      el.textContent = dictionary[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (!key || !dictionary[key]) return;
      el.setAttribute("placeholder", dictionary[key]);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(el => {
      const key = el.getAttribute("data-i18n-aria-label");
      if (!key || !dictionary[key]) return;
      el.setAttribute("aria-label", dictionary[key]);
    });

    document.querySelectorAll(".lang-btn").forEach(button => {
      const isActive = button.dataset.lang === activeLanguage;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    const sendButton = document.getElementById("sendBtn");
    if (sendButton && !sendButton.disabled) {
      const label = sendButton.querySelector("span") || sendButton;
      setTextContent(label, dictionary["contact.form.submit"]);
    }
  }

  /**
   * Initializes language switcher interactions and keyboard navigation.
   */
  function initializeLanguageSwitcher(dom) {
    injectLanguageSwitcher(dom.sidebarFooter);
    attachI18nAttributes(dom);

    const language = getCurrentLanguage();
    applyTranslations(language);

    const switcher = document.querySelector(".lang-switcher");
    if (!switcher) return;

    switcher.addEventListener("click", event => {
      const button = event.target.closest(".lang-btn");
      if (!button) return;

      const languageCode = button.dataset.lang;
      if (!TRANSLATIONS[languageCode]) return;

      localStorage.setItem(I18N_STORAGE_KEY, languageCode);
      applyTranslations(languageCode);
    });

    switcher.addEventListener("keydown", event => {
      const currentButton = event.target.closest(".lang-btn");
      if (!currentButton) return;

      const buttons = [...switcher.querySelectorAll(".lang-btn")];
      const index = buttons.indexOf(currentButton);
      if (index < 0) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        buttons[(index + 1) % buttons.length].focus();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        buttons[(index - 1 + buttons.length) % buttons.length].focus();
      }
    });
  }

  /**
   * Initializes mobile menu toggle and keyboard close behavior.
   */
  function initializeMobileMenu(dom) {
    const { menuButton, sidebar } = dom;
    if (!menuButton || !sidebar) return;

    menuButton.setAttribute("aria-controls", "sidebar");
    menuButton.setAttribute("aria-expanded", "false");

    const toggleMenu = forceState => {
      const nextState = typeof forceState === "boolean" ? forceState : !sidebar.classList.contains("active");
      sidebar.classList.toggle("active", nextState);
      menuButton.setAttribute("aria-expanded", String(nextState));
    };

    menuButton.addEventListener("click", () => toggleMenu());

    sidebar.addEventListener("click", event => {
      if (!event.target.closest("a")) return;
      toggleMenu(false);
    });

    document.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      if (!sidebar.classList.contains("active")) return;
      toggleMenu(false);
      menuButton.focus();
    });
  }

  /**
   * Reveals generic sections on viewport entry.
   */
  function initializeScrollReveal() {
    const revealSections = document.querySelectorAll(".reveal");
    if (!revealSections.length) return;

    if (prefersReducedMotion()) {
      revealSections.forEach(el => el.classList.add("active"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    revealSections.forEach(el => revealObserver.observe(el));
  }

  function setSkillCardToTarget(card) {
    const percentEl = card.querySelector(".skill-percent");
    const barEl = card.querySelector(".skill-fill");
    if (!percentEl || !barEl) return;

    const target = parseInteger(percentEl.textContent);
    if (target === null) return;

    setTextContent(percentEl, `${target}%`);
    setWidthStyle(barEl, `${target}%`);
  }

  function animateSkillCard(card) {
    const percentEl = card.querySelector(".skill-percent");
    const barEl = card.querySelector(".skill-fill");
    if (!percentEl || !barEl) return;

    const target = parseInteger(percentEl.textContent);
    if (target === null) return;

    setTextContent(percentEl, "0%");
    setWidthStyle(barEl, "0%");

    animateValue(900, target, value => {
      setTextContent(percentEl, `${value}%`);
      setWidthStyle(barEl, `${value}%`);
    });
  }

  /**
   * Initializes animated skill counters and progress bars.
   */
  function initializeSkillCounter() {
    const skillCards = document.querySelectorAll(".skills-page .skill-card");
    if (!skillCards.length) return;

    if (prefersReducedMotion()) {
      skillCards.forEach(setSkillCardToTarget);
      return;
    }

    const skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const card = entry.target;
          observer.unobserve(card);
          animateSkillCard(card);
        });
      },
      { threshold: 0.55 }
    );

    skillCards.forEach(card => skillObserver.observe(card));
  }

  function setStatToTarget(element) {
    const target = parseInteger(element.dataset.target);
    if (target === null) return;
    setTextContent(element, `${target}+`);
  }

  function animateStat(element) {
    const target = parseInteger(element.dataset.target);
    if (target === null) return;

    setTextContent(element, "0");

    animateValue(1200, target, value => {
      setTextContent(element, `${value}+`);
    });
  }

  /**
   * Initializes homepage stats counting animation.
   */
  function initializeHomeStatsCounter() {
    const statNumbers = document.querySelectorAll(".stat-number[data-target]");
    if (!statNumbers.length) return;

    if (prefersReducedMotion()) {
      statNumbers.forEach(setStatToTarget);
      return;
    }

    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const element = entry.target;
          observer.unobserve(element);
          animateStat(element);
        });
      },
      { threshold: 0.6 }
    );

    statNumbers.forEach(el => statsObserver.observe(el));
  }

  /**
   * Enables smooth-scrolling for same-page anchor links.
   */
  function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", event => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;

        const id = href.substring(1);
        if (!id) return;

        const target = document.getElementById(id);
        if (!target) return;

        event.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 20,
          behavior: prefersReducedMotion() ? "auto" : "smooth"
        });
      });
    });
  }

  /**
   * Initializes education section reveal and semester card animations.
   */
  function initializeEducationAnimations() {
    const eduReveal = document.querySelectorAll(".edu-reveal");
    if (eduReveal.length) {
      const eduObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.15 }
      );

      eduReveal.forEach(el => eduObserver.observe(el));
    }

    const semesterCards = document.querySelectorAll(".semester-card");
    if (semesterCards.length) {
      const semesterObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.25 }
      );

      semesterCards.forEach(card => semesterObserver.observe(card));
    }
  }

  /**
   * Injects current year values in all supported placeholders.
   */
  function initializeYears() {
    const year = new Date().getFullYear();

    ["currentYear", "currentYearFooter", "sidebarYear"].forEach(id => {
      const element = document.getElementById(id);
      if (!element) return;
      setTextContent(element, String(year));
    });
  }

  function getSanitizedFormPayload(form) {
    return {
      name: sanitizeInput(form?.name?.value),
      email: sanitizeInput(form?.email?.value),
      message: sanitizeInput(form?.message?.value)
    };
  }

  function isRateLimited() {
    const now = Date.now();
    if (now - lastFormSubmissionAt < FORM_SUBMIT_RATE_LIMIT_MS) {
      return true;
    }

    lastFormSubmissionAt = now;
    return false;
  }

  /**
   * Initializes EmailJS contact form behavior with sanitization,
   * anti-spam protection, and submission throttling.
   */
  function initializeEmailJs(dom) {
    if (window.emailjs?.init) {
      emailjs.init(EMAIL_JS_PUBLIC_KEY);
    }

    const { form, formStatus, sendButton } = dom;
    if (!form || !sendButton || !formStatus) return;

    formStatus.setAttribute("role", "status");
    formStatus.setAttribute("aria-live", "polite");

    const honeypot = ensureHoneypotField(form);

    if (!window.emailjs?.send) {
      updateStatusMessage(formStatus, t("contact.form.error"), "#ef4444");
      return;
    }

    form.addEventListener("submit", async event => {
      event.preventDefault();

      const language = getCurrentLanguage();

      if (honeypot?.value.trim()) return;
      if (isRateLimited()) {
        updateStatusMessage(formStatus, t("contact.form.error", language), "#ef4444");
        return;
      }

      const params = getSanitizedFormPayload(form);
      setSendButtonLoadingState(sendButton, true, language);

      try {
        await emailjs.send(EMAIL_JS_SERVICE_ID, EMAIL_JS_TEMPLATE_ID, params);
        updateStatusMessage(formStatus, t("contact.form.success", language), "#22c55e");
        form.reset();
      } catch (error) {
        console.error("EmailJS Error:", error);
        updateStatusMessage(formStatus, t("contact.form.error", language), "#ef4444");
      } finally {
        setSendButtonLoadingState(sendButton, false, language);
      }
    });
  }

  /**
   * Initializes all UI modules once DOM is ready.
   */
  document.addEventListener("DOMContentLoaded", () => {
    const dom = cacheDom();

    if (window.lucide?.createIcons) {
      lucide.createIcons();
    }

    initializeMobileMenu(dom);
    initializeLanguageSwitcher(dom);
    initializeScrollReveal();
    initializeSkillCounter();
    initializeHomeStatsCounter();
    initializeSmoothScroll();
    initializeEducationAnimations();
    initializeYears();
    initializeEmailJs(dom);
  });
})();
