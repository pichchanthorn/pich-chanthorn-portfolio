/* =====================================================
   MAIN.JS — Portfolio Global Script
   Description: UI interactions + i18n + EmailJS
===================================================== */

(() => {
  "use strict";

  const I18N_STORAGE_KEY = "portfolio_language";

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

  function attachI18nAttributes() {
    const menuButton = document.getElementById("menuBtn");
    setI18nAriaLabelAttribute(menuButton, "menu.toggle");

    const mainNav = document.querySelector(".nav");
    setI18nAriaLabelAttribute(mainNav, "nav.main");

    const navKeyMap = {
      "index.html": "nav.home",
      "about.html": "nav.about",
      "skills.html": "nav.skills",
      "projects.html": "nav.projects",
      "certificates.html": "nav.certificates",
      "education.html": "nav.education",
      "experience.html": "nav.experience",
      "contact.html": "nav.contact"
    };

    Object.entries(navKeyMap).forEach(([href, key]) => {
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

    const sendButtonText = document.querySelector("#sendBtn span");
    if (sendButtonText) setI18nAttribute(sendButtonText, "contact.form.submit");
  }

  function injectLanguageSwitcher() {
    const sidebarFooter = document.querySelector(".sidebar-footer");
    if (!sidebarFooter) return;
    if (sidebarFooter.querySelector(".lang-switcher")) return;

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
  }

  function initializeLanguageSwitcher() {
    injectLanguageSwitcher();
    attachI18nAttributes();

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
  }

  function initializeMobileMenu() {
    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");

    if (!menuBtn || !sidebar) return;

    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }

  function initializeScrollReveal() {
    const revealSections = document.querySelectorAll(".reveal");
    if (!revealSections.length) return;

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

  function initializeSkillCounter() {
    const skillCards = document.querySelectorAll(".skills-page .skill-card");
    if (!skillCards.length) return;

    const skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const card = entry.target;
          observer.unobserve(card);

          const percentEl = card.querySelector(".skill-percent");
          const barEl = card.querySelector(".skill-fill");
          if (!percentEl || !barEl) return;

          const target = parseInt(percentEl.textContent, 10);
          const duration = 900;
          const start = performance.now();

          percentEl.textContent = "0%";
          barEl.style.width = "0%";

          function animate(now) {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.floor(target * progress);

            percentEl.textContent = value + "%";
            barEl.style.width = value + "%";

            if (progress < 1) requestAnimationFrame(animate);
          }

          requestAnimationFrame(animate);
        });
      },
      { threshold: 0.55 }
    );

    skillCards.forEach(card => skillObserver.observe(card));
  }

  function initializeHomeStatsCounter() {
    const statNumbers = document.querySelectorAll(".stat-number[data-target]");
    if (!statNumbers.length) return;

    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const element = entry.target;
          observer.unobserve(element);

          const target = parseInt(element.dataset.target, 10);
          const duration = 1200;
          const start = performance.now();

          element.textContent = "0";

          function animate(now) {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.floor(target * progress);
            element.textContent = value + "+";

            if (progress < 1) requestAnimationFrame(animate);
          }

          requestAnimationFrame(animate);
        });
      },
      { threshold: 0.6 }
    );

    statNumbers.forEach(el => statsObserver.observe(el));
  }

  function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", event => {
        const id = link.getAttribute("href").substring(1);
        const target = document.getElementById(id);
        if (!target) return;

        event.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 20,
          behavior: "smooth"
        });
      });
    });
  }

  function initializeEducationAnimations() {
    const eduReveal = document.querySelectorAll(".edu-reveal");
    if (eduReveal.length) {
      const eduObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
            }
          });
        },
        { threshold: 0.15 }
      );

      eduReveal.forEach(el => eduObserver.observe(el));
    }

    const semesterCards = document.querySelectorAll(".semester-card");
    if (semesterCards.length) {
      const semesterObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("fade-in");
            }
          });
        },
        { threshold: 0.25 }
      );

      semesterCards.forEach(card => semesterObserver.observe(card));
    }
  }

  function initializeYears() {
    const year = new Date().getFullYear();

    ["currentYear", "currentYearFooter", "sidebarYear"].forEach(id => {
      const element = document.getElementById(id);
      if (element) element.textContent = year;
    });
  }

  function initializeEmailJs() {
    if (window.emailjs) {
      emailjs.init("tjw1lER8-6wZCb5Wg");
    }

    const form = document.getElementById("contactForm");
    const statusText = document.getElementById("formStatus");
    const sendBtn = document.getElementById("sendBtn");

    if (!form || !sendBtn || !statusText) return;

    form.addEventListener("submit", event => {
      event.preventDefault();

      const language = getCurrentLanguage();

      sendBtn.disabled = true;
      sendBtn.textContent = t("contact.form.sending", language);

      const params = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim()
      };

      emailjs
        .send("service_1f3kxsk", "template_5tfub9f", params)
        .then(() => {
          statusText.textContent = t("contact.form.success", language);
          statusText.style.color = "#22c55e";
          form.reset();
        })
        .catch(error => {
          console.error("EmailJS Error:", error);
          statusText.textContent = t("contact.form.error", language);
          statusText.style.color = "#ef4444";
        })
        .finally(() => {
          sendBtn.disabled = false;
          sendBtn.innerHTML = `<i data-lucide="send"></i><span data-i18n="contact.form.submit">${t("contact.form.submit", language)}</span>`;
          if (window.lucide) lucide.createIcons();
        });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) {
      lucide.createIcons();
    }

    initializeMobileMenu();
    initializeLanguageSwitcher();
    initializeScrollReveal();
    initializeSkillCounter();
    initializeHomeStatsCounter();
    initializeSmoothScroll();
    initializeEducationAnimations();
    initializeYears();
    initializeEmailJs();
  });
})();
