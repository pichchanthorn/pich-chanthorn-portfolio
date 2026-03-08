/* =====================================================
   NAVIGATION.JS — Sidebar, Mobile Menu, Active Nav,
   Language Switcher (i18n)
===================================================== */

(() => {
  "use strict";

  const I18N_STORAGE_KEY = "portfolio_language";

  const AUTO_TEXT_SELECTOR = [
    "main h1",
    "main h2",
    "main h3",
    "main p",
    "main li",
    "main a span",
    "main button span",
    "main label",
    ".sidebar .logo-name",
    ".sidebar .role",
    ".sidebar .nav span",
    ".site-footer p",
    ".contact-label",
    ".contact-value",
    ".stat-label"
  ].join(",");

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
      "footer.rights": "Pich Chanthorn. All rights reserved.",
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
      "contact.form.error": "❌ Failed to send message. Please try again.",
      "contact.form.rateLimit": "❌ Please wait a few seconds before sending again.",
      "projects.back": "Back to Projects",
      "projects.about": "About this Project",
      "projects.features": "Key Features",
      "projects.achievements": "Key Achievements",
      "projects.techStack": "Tech Stack",
      "projects.links": "Project Links",
      "projects.other": "Other Projects",
      "projects.viewCode": "View Source Code",
      "projects.liveDemo": "Live Demo",
      "cv.title": "My CV Library",
      "cv.subtitle": "Choose CV for your position",
      "cv.view": "View",
      "cv.download": "Download",
      "cv.backHome": "← Back to Home"
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
      "footer.rights": "Pich Chanthorn។ រក្សាសិទ្ធិគ្រប់យ៉ាង។",
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
      "contact.form.error": "❌ ផ្ញើសារមិនជោគជ័យ។ សូមព្យាយាមម្តងទៀត។",
      "contact.form.rateLimit": "❌ សូមរង់ចាំបន្តិច មុនពេលផ្ញើម្ដងទៀត។",
      "projects.back": "ត្រឡប់ទៅគម្រោង",
      "projects.about": "អំពីគម្រោងនេះ",
      "projects.features": "មុខងារសំខាន់ៗ",
      "projects.achievements": "សមិទ្ធផលសំខាន់ៗ",
      "projects.techStack": "បច្ចេកវិទ្យា",
      "projects.links": "តំណភ្ជាប់គម្រោង",
      "projects.other": "គម្រោងផ្សេងៗ",
      "projects.viewCode": "មើលកូដដើម",
      "projects.liveDemo": "មើល Demo",
      "cv.title": "បណ្ណាល័យ CV របស់ខ្ញុំ",
      "cv.subtitle": "ជ្រើសរើស CV សម្រាប់តួនាទីរបស់អ្នក",
      "cv.view": "មើល",
      "cv.download": "ទាញយក",
      "cv.backHome": "← ត្រឡប់ទៅទំព័រដើម"
    }
  };

  const AUTO_PHRASE_KM = {
    "Back to Projects": "ត្រឡប់ទៅគម្រោង",
    "About this Project": "អំពីគម្រោងនេះ",
    "Key Features": "មុខងារសំខាន់ៗ",
    "Key Achievements": "សមិទ្ធផលសំខាន់ៗ",
    "Tech Stack": "បច្ចេកវិទ្យា",
    "Project Links": "តំណភ្ជាប់គម្រោង",
    "Other Projects": "គម្រោងផ្សេងៗ",
    "View Source Code": "មើលកូដដើម",
    "Live Demo": "មើល Demo",
    "Built with HTML, CSS & JavaScript": "បង្កើតដោយ HTML, CSS និង JavaScript",
    "Pich Chanthorn. All rights reserved.": "Pich Chanthorn។ រក្សាសិទ្ធិគ្រប់យ៉ាង។"
  };

  const AUTO_WORD_KM = {
    home: "ទំព័រដើម",
    about: "អំពី",
    skills: "ជំនាញ",
    projects: "គម្រោង",
    certificates: "វិញ្ញាបនបត្រ",
    education: "ការអប់រំ",
    experience: "បទពិសោធន៍",
    contact: "ទំនាក់ទំនង",
    project: "គម្រោង",
    app: "កម្មវិធី",
    platform: "វេទិកា",
    system: "ប្រព័ន្ធ",
    management: "ការគ្រប់គ្រង",
    portfolio: "ផតហ្វូលីយ៉ូ",
    website: "គេហទំព័រ",
    responsive: "ឆ្លើយតបល្អ",
    design: "ការរចនា",
    features: "មុខងារ",
    achievements: "សមិទ្ធផល",
    developer: "អ្នកអភិវឌ្ឍន៍",
    frontend: "ខាងមុខ",
    backend: "ខាងក្រោយ",
    full: "ពេញលេញ",
    stack: "ស្តេក",
    view: "មើល",
    download: "ទាញយក",
    choose: "ជ្រើសរើស",
    library: "បណ្ណាល័យ",
    send: "ផ្ញើ",
    message: "សារ",
    email: "អ៊ីមែល",
    phone: "ទូរស័ព្ទ",
    location: "ទីតាំង",
    language: "ភាសា",
    year: "ឆ្នាំ"
  };

  // Expose translations globally for other modules
  window.__i18n = {
    TRANSLATIONS,
    I18N_STORAGE_KEY,
    getCurrentLanguage
  };

  function normalizeWhitespace(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function slugify(value) {
    return normalizeWhitespace(value)
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9\s.-]/g, "")
      .replace(/[\s.]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 80) || "text";
  }

  function getCurrentLanguage() {
    const saved = localStorage.getItem(I18N_STORAGE_KEY);
    return saved && TRANSLATIONS[saved] ? saved : "en";
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

  function setI18nTitleAttribute(element, key) {
    if (!element || !key) return;
    element.setAttribute("data-i18n-title", key);
  }

  function inferKhmerTranslation(text) {
    const normalized = normalizeWhitespace(text);
    if (!normalized) return "";
    if (AUTO_PHRASE_KM[normalized]) return AUTO_PHRASE_KM[normalized];

    return normalized.replace(/\b([A-Za-z][A-Za-z/&-]*)\b/g, word => {
      const translated = AUTO_WORD_KM[word.toLowerCase()];
      return translated || word;
    });
  }

  function ensureTranslationEntry(key, englishValue) {
    if (!key || !englishValue) return;

    if (!TRANSLATIONS.en[key]) {
      TRANSLATIONS.en[key] = englishValue;
    }

    if (!TRANSLATIONS.km[key]) {
      TRANSLATIONS.km[key] = inferKhmerTranslation(englishValue);
    }
  }

  function buildAutoKey(prefix, textValue) {
    const page = location.pathname.split("/").pop()?.replace(".html", "") || "page";
    return `auto.${page}.${prefix}.${slugify(textValue)}`;
  }

  function bindAutoTextNodes() {
    document.querySelectorAll(AUTO_TEXT_SELECTOR).forEach(element => {
      if (element.hasAttribute("data-i18n")) return;

      const text = normalizeWhitespace(element.textContent);
      if (!text) return;

      const key = buildAutoKey("text", text);
      setI18nAttribute(element, key);
      ensureTranslationEntry(key, text);
    });
  }

  function bindAutoAttributes() {
    document.querySelectorAll("[placeholder]").forEach(element => {
      if (element.hasAttribute("data-i18n-placeholder")) return;
      const value = normalizeWhitespace(element.getAttribute("placeholder"));
      if (!value) return;
      const key = buildAutoKey("placeholder", value);
      setI18nPlaceholderAttribute(element, key);
      ensureTranslationEntry(key, value);
    });

    document.querySelectorAll("[aria-label]").forEach(element => {
      if (element.hasAttribute("data-i18n-aria-label")) return;
      const value = normalizeWhitespace(element.getAttribute("aria-label"));
      if (!value) return;
      const key = buildAutoKey("aria", value);
      setI18nAriaLabelAttribute(element, key);
      ensureTranslationEntry(key, value);
    });

    document.querySelectorAll("[title]").forEach(element => {
      if (element.hasAttribute("data-i18n-title")) return;
      const value = normalizeWhitespace(element.getAttribute("title"));
      if (!value) return;
      const key = buildAutoKey("title", value);
      setI18nTitleAttribute(element, key);
      ensureTranslationEntry(key, value);
    });
  }

  function attachI18nAttributes(dom) {
    setI18nAriaLabelAttribute(dom.menuButton, "menu.toggle");
    setI18nAriaLabelAttribute(dom.mainNav, "nav.main");

    const navKeyMap = {
      "nav.home": "Home",
      "nav.about": "About",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.certificates": "Certificates",
      "nav.education": "Education",
      "nav.experience": "Experience",
      "nav.contact": "Contact"
    };

    document.querySelectorAll(".nav a span").forEach(span => {
      const text = normalizeWhitespace(span.textContent);
      for (const [key, label] of Object.entries(navKeyMap)) {
        if (text === label) {
          setI18nAttribute(span, key);
          break;
        }
      }
    });

    const roleElement = document.querySelector(".role");
    if (roleElement) {
      const roleText = normalizeWhitespace(roleElement.textContent);
      setI18nAttribute(roleElement, roleText.includes("IT Student") ? "role.student" : "role.fullstack");
    }

    setI18nAttribute(document.querySelector(".hero-subtitle"), "home.welcome");
    setI18nAttribute(document.querySelector(".hero-buttons .btn.primary"), "home.cta.projects");
    setI18nAttribute(document.querySelector(".hero-buttons .btn.outline"), "home.cta.cv");

    setI18nAttribute(document.querySelector(".contact-page .subtitle"), "contact.subtitle");
    const contactLabels = [...document.querySelectorAll(".contact-card .contact-label")];
    setI18nAttribute(contactLabels[0], "contact.email");
    setI18nAttribute(contactLabels[1], "contact.phone");
    setI18nAttribute(contactLabels[2], "contact.location");

    setI18nAttribute(document.querySelector(".form-title"), "contact.form.title");

    const formGroups = [...document.querySelectorAll(".contact-form .form-group")];
    setI18nAttribute(formGroups[0]?.querySelector("label"), "contact.form.name");
    setI18nAttribute(formGroups[1]?.querySelector("label"), "contact.form.email");
    setI18nAttribute(formGroups[2]?.querySelector("label"), "contact.form.message");

    setI18nPlaceholderAttribute(document.getElementById("name"), "contact.form.placeholder.name");
    setI18nPlaceholderAttribute(document.getElementById("email"), "contact.form.placeholder.email");
    setI18nPlaceholderAttribute(document.getElementById("message"), "contact.form.placeholder.message");

    setI18nAttribute(dom.sendButton?.querySelector("span"), "contact.form.submit");

    setI18nAttribute(document.querySelector(".breadcrumb-link span"), "projects.back");
    document.querySelectorAll(".project-section .section-title").forEach(title => {
      const label = normalizeWhitespace(title.textContent);
      if (label.includes("About")) setI18nAttribute(title, "projects.about");
      if (label.includes("Features")) setI18nAttribute(title, "projects.features");
    });
    document.querySelectorAll(".project-section .section-title-sm").forEach(title => {
      const label = normalizeWhitespace(title.textContent);
      if (label.includes("Achievements")) setI18nAttribute(title, "projects.achievements");
    });

    document.querySelectorAll(".sidebar-title").forEach(title => {
      const value = normalizeWhitespace(title.textContent);
      if (value.includes("Tech Stack")) setI18nAttribute(title, "projects.techStack");
      if (value.includes("Project Links")) setI18nAttribute(title, "projects.links");
      if (value.includes("Other Projects")) setI18nAttribute(title, "projects.other");
    });

    document.querySelectorAll(".btn.ghost.full span").forEach(span => {
      if (normalizeWhitespace(span.textContent).includes("Source")) setI18nAttribute(span, "projects.viewCode");
    });
    document.querySelectorAll(".btn.primary.full span").forEach(span => {
      if (normalizeWhitespace(span.textContent).includes("Live")) setI18nAttribute(span, "projects.liveDemo");
    });

    setI18nAttribute(document.querySelector(".text-center h1"), "cv.title");
    setI18nAttribute(document.querySelector(".text-center p"), "cv.subtitle");
    document.querySelectorAll(".cv-card .actions a:first-child").forEach(link => setI18nAttribute(link, "cv.view"));
    document.querySelectorAll(".cv-card .actions a:last-child").forEach(link => setI18nAttribute(link, "cv.download"));

    // Match CV back-home link by text content instead of href
    document.querySelectorAll(".text-center a").forEach(link => {
      const text = normalizeWhitespace(link.textContent);
      if (text.includes("Back to Home")) setI18nAttribute(link, "cv.backHome");
    });

    document.querySelectorAll(".site-footer p").forEach(element => {
      setI18nAttribute(element, "footer.built");
    });
  }

  function injectLanguageSwitcher(sidebarFooter) {
    if (!sidebarFooter || sidebarFooter.querySelector(".lang-switcher")) return;

    const year = new Date().getFullYear();
    sidebarFooter.innerHTML = `
      <div class="lang-switcher" role="group" data-i18n-aria-label="lang.label">
        <span class="lang-switcher-label" data-i18n="lang.label"></span>
        <div class="lang-switcher-buttons">
          <button type="button" class="lang-btn" data-lang="en" data-i18n="lang.en" title="English"></button>
          <button type="button" class="lang-btn" data-lang="km" data-i18n="lang.km" title="Khmer"></button>
        </div>
      </div>
      <p class="sidebar-copy">© <span id="sidebarYear">${year}</span> Pich Chanthorn</p>
    `;
  }

  function translatePage(language = getCurrentLanguage()) {
    const activeLanguage = TRANSLATIONS[language] ? language : "en";
    const dictionary = TRANSLATIONS[activeLanguage];

    document.documentElement.lang = activeLanguage;

    document.querySelectorAll("[data-i18n]").forEach(element => {
      const key = element.getAttribute("data-i18n");
      if (!key) return;
      const translated = dictionary[key];
      if (!translated) return;
      if (element.textContent !== translated) element.textContent = translated;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
      const key = element.getAttribute("data-i18n-placeholder");
      if (!key) return;
      const translated = dictionary[key];
      if (!translated) return;
      if (element.getAttribute("placeholder") !== translated) element.setAttribute("placeholder", translated);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(element => {
      const key = element.getAttribute("data-i18n-aria-label");
      if (!key) return;
      const translated = dictionary[key];
      if (!translated) return;
      if (element.getAttribute("aria-label") !== translated) element.setAttribute("aria-label", translated);
    });

    document.querySelectorAll("[data-i18n-title]").forEach(element => {
      const key = element.getAttribute("data-i18n-title");
      if (!key) return;
      const translated = dictionary[key];
      if (!translated) return;
      if (element.getAttribute("title") !== translated) element.setAttribute("title", translated);
    });

    document.querySelectorAll(".lang-btn").forEach(button => {
      const isActive = button.dataset.lang === activeLanguage;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  // Expose translate function globally
  window.__i18n.translatePage = translatePage;

  function initializeLanguage(dom) {
    injectLanguageSwitcher(dom.sidebarFooter);
    attachI18nAttributes(dom);
    bindAutoTextNodes();
    bindAutoAttributes();

    const language = getCurrentLanguage();
    translatePage(language);

    const switcher = document.querySelector(".lang-switcher");
    if (!switcher) return;

    switcher.addEventListener("click", event => {
      const button = event.target.closest(".lang-btn");
      if (!button || !TRANSLATIONS[button.dataset.lang]) return;

      localStorage.setItem(I18N_STORAGE_KEY, button.dataset.lang);
      translatePage(button.dataset.lang);
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
      if (event.key !== "Escape" || !sidebar.classList.contains("active")) return;
      toggleMenu(false);
      menuButton.focus();
    });
  }

  // Expose initialization functions
  window.__navigation = {
    initializeMobileMenu,
    initializeLanguage
  };
})();
