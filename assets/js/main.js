/* =====================================================
   MAIN.JS — Portfolio Global Script
   Description: UI interactions + global i18n + EmailJS
===================================================== */

(() => {
  "use strict";

  const EMAIL_JS_PUBLIC_KEY = "tjw1lER8-6wZCb5Wg";
  const EMAIL_JS_SERVICE_ID = "service_1f3kxsk";
  const EMAIL_JS_TEMPLATE_ID = "template_5tfub9f";

  const I18N_STORAGE_KEY = "portfolio_language";
  const FORM_SUBMIT_RATE_LIMIT_MS = 3000;

  const MUSIC_STORAGE_KEY = "portfolio_music_widget_state_v1";
  const MUSIC_UI_STORAGE_KEY = "portfolio_music_widget_ui_v1";
  const MUSIC_USER_INTERACTED_KEY = "portfolio_music_user_interacted_v1";

  const MUSIC_PLAYLIST = [
    {
      title: "Coding Chillstep",
      artist: "Romansenyk",
      src: "assets/audio/romansenykmusic-coding-chillstep-153836.mp3",
      cover: "assets/img/music-cover-1.jpg"
    },
    {
      title: "Shuangmian",
      artist: "Trangiahung159",
      src: "assets/audio/trangiahung159-shuangmian-443317.mp3",
      cover: "assets/img/music-cover-2.jpg"
    }
  ];

  const MUSIC_FALLBACK_COVER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%230f172a'/%3E%3Cstop offset='100%25' stop-color='%2306472d'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='120' height='120' rx='22' fill='url(%23g)'/%3E%3Ccircle cx='60' cy='60' r='27' fill='none' stroke='%2386efac' stroke-width='4' opacity='0.85'/%3E%3Ccircle cx='60' cy='60' r='6' fill='%2386efac'/%3E%3C/svg%3E";

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

  let lastFormSubmissionAt = 0;

  /**
   * Returns true when user prefers reduced motion.
   */
  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /**
   * Caches core shared selectors.
   */
  function cacheDom() {
    return {
      html: document.documentElement,
      menuButton: document.getElementById("menuBtn"),
      sidebar: document.getElementById("sidebar"),
      mainNav: document.querySelector(".nav"),
      sidebarFooter: document.querySelector(".sidebar-footer"),
      form: document.getElementById("contactForm"),
      formStatus: document.getElementById("formStatus"),
      sendButton: document.getElementById("sendBtn")
    };
  }

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

  function sanitizeInput(value) {
    return String(value ?? "")
      .replace(/[<>]/g, "")
      .replace(/[\u0000-\u001F\u007F]/g, "")
      .trim();
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

  /**
   * Adds stable i18n keys for known, reusable UI areas.
   */
  function attachI18nAttributes(dom) {
    setI18nAriaLabelAttribute(dom.menuButton, "menu.toggle");
    setI18nAriaLabelAttribute(dom.mainNav, "nav.main");

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
      document.querySelectorAll(`.nav a[href="${href}"] span`).forEach(element => setI18nAttribute(element, key));
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
    setI18nAttribute(document.querySelector('.text-center a[href="index.html"]'), "cv.backHome");

    document.querySelectorAll(".site-footer p").forEach(element => {
      setI18nAttribute(element, "footer.built");
    });
  }

  /**
   * Injects sidebar language switcher.
   */
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

  function debugMissingKey(language, key) {
    console.warn(`[i18n] Missing translation key "${key}" for language "${language}"`);
  }

  /**
   * Single page translation pipeline.
   */
  function translatePage(language = getCurrentLanguage()) {
    const activeLanguage = TRANSLATIONS[language] ? language : "en";
    const dictionary = TRANSLATIONS[activeLanguage];

    document.documentElement.lang = activeLanguage;

    document.querySelectorAll("[data-i18n]").forEach(element => {
      const key = element.getAttribute("data-i18n");
      if (!key) return;

      const translated = dictionary[key];
      if (!translated) {
        debugMissingKey(activeLanguage, key);
        return;
      }

      if (element.textContent !== translated) {
        element.textContent = translated;
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
      const key = element.getAttribute("data-i18n-placeholder");
      if (!key) return;

      const translated = dictionary[key];
      if (!translated) {
        debugMissingKey(activeLanguage, key);
        return;
      }

      if (element.getAttribute("placeholder") !== translated) {
        element.setAttribute("placeholder", translated);
      }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(element => {
      const key = element.getAttribute("data-i18n-aria-label");
      if (!key) return;

      const translated = dictionary[key];
      if (!translated) {
        debugMissingKey(activeLanguage, key);
        return;
      }

      if (element.getAttribute("aria-label") !== translated) {
        element.setAttribute("aria-label", translated);
      }
    });

    document.querySelectorAll("[data-i18n-title]").forEach(element => {
      const key = element.getAttribute("data-i18n-title");
      if (!key) return;

      const translated = dictionary[key];
      if (!translated) {
        debugMissingKey(activeLanguage, key);
        return;
      }

      if (element.getAttribute("title") !== translated) {
        element.setAttribute("title", translated);
      }
    });

    document.querySelectorAll(".lang-btn").forEach(button => {
      const isActive = button.dataset.lang === activeLanguage;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  /**
   * Initializes language module and events.
   */
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

  function animateValue(duration, targetValue, onUpdate) {
    const start = performance.now();
    let previous = -1;

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(targetValue * progress);

      if (value !== previous) {
        onUpdate(value);
        previous = value;
      }

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function initializeScrollReveal() {
    const revealSections = document.querySelectorAll(".reveal");
    if (!revealSections.length) return;

    if (prefersReducedMotion()) {
      revealSections.forEach(element => element.classList.add("active"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("active");
          activeObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    revealSections.forEach(section => observer.observe(section));
  }

  function initializeSkillCounter() {
    const skillCards = document.querySelectorAll(".skills-page .skill-card");
    if (!skillCards.length) return;

    const setToTarget = card => {
      const percent = card.querySelector(".skill-percent");
      const fill = card.querySelector(".skill-fill");
      const target = Number.parseInt(percent?.textContent, 10);
      if (!percent || !fill || !Number.isFinite(target)) return;
      percent.textContent = `${target}%`;
      fill.style.width = `${target}%`;
    };

    if (prefersReducedMotion()) {
      skillCards.forEach(setToTarget);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          activeObserver.unobserve(entry.target);

          const percent = entry.target.querySelector(".skill-percent");
          const fill = entry.target.querySelector(".skill-fill");
          const target = Number.parseInt(percent?.textContent, 10);
          if (!percent || !fill || !Number.isFinite(target)) return;

          percent.textContent = "0%";
          fill.style.width = "0%";

          animateValue(900, target, value => {
            percent.textContent = `${value}%`;
            fill.style.width = `${value}%`;
          });
        });
      },
      { threshold: 0.55 }
    );

    skillCards.forEach(card => observer.observe(card));
  }

  function initializeHomeStatsCounter() {
    const statNumbers = document.querySelectorAll(".stat-number[data-target]");
    if (!statNumbers.length) return;

    if (prefersReducedMotion()) {
      statNumbers.forEach(element => {
        const target = Number.parseInt(element.dataset.target, 10);
        if (!Number.isFinite(target)) return;
        element.textContent = `${target}+`;
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          activeObserver.unobserve(entry.target);

          const target = Number.parseInt(entry.target.dataset.target, 10);
          if (!Number.isFinite(target)) return;

          entry.target.textContent = "0";
          animateValue(1200, target, value => {
            entry.target.textContent = `${value}+`;
          });
        });
      },
      { threshold: 0.6 }
    );

    statNumbers.forEach(element => observer.observe(element));
  }

  function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", event => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.getElementById(href.slice(1));
        if (!target) return;

        event.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 20,
          behavior: prefersReducedMotion() ? "auto" : "smooth"
        });
      });
    });
  }

  function initializeMusicPlayer() {
    if (!MUSIC_PLAYLIST.length) return;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const getTrack = index => MUSIC_PLAYLIST[index] || MUSIC_PLAYLIST[0];

    const normalizeMusicState = candidate => {
      const fallback = {
        trackIndex: 0,
        currentTime: 0,
        isPlaying: false,
        volume: 0.7,
        updatedAt: Date.now()
      };

      if (!candidate || typeof candidate !== "object") return fallback;

      const boundedIndex = Number.isFinite(candidate.trackIndex)
        ? clamp(candidate.trackIndex, 0, MUSIC_PLAYLIST.length - 1)
        : fallback.trackIndex;

      const boundedTime = Number.isFinite(candidate.currentTime) && candidate.currentTime >= 0
        ? candidate.currentTime
        : fallback.currentTime;

      const boundedVolume = Number.isFinite(candidate.volume)
        ? clamp(candidate.volume, 0, 1)
        : fallback.volume;

      return {
        trackIndex: boundedIndex,
        currentTime: boundedTime,
        isPlaying: Boolean(candidate.isPlaying),
        volume: boundedVolume,
        updatedAt: Number.isFinite(candidate.updatedAt) ? candidate.updatedAt : Date.now()
      };
    };

    const readStoredMusicState = () => {
      try {
        const raw = localStorage.getItem(MUSIC_STORAGE_KEY);
        if (!raw) return normalizeMusicState(null);
        return normalizeMusicState(JSON.parse(raw));
      } catch {
        return normalizeMusicState(null);
      }
    };

    const persistMusicState = nextState => {
      const normalized = normalizeMusicState(nextState);
      try {
        localStorage.setItem(MUSIC_STORAGE_KEY, JSON.stringify(normalized));
      } catch {
        // Ignore storage quota/privacy mode failures.
      }
      return normalized;
    };

    const readUiState = () => {
      try {
        const raw = localStorage.getItem(MUSIC_UI_STORAGE_KEY);
        if (!raw) return { expanded: false };
        const parsed = JSON.parse(raw);
        return { expanded: Boolean(parsed?.expanded) };
      } catch {
        return { expanded: false };
      }
    };

    const writeUiState = uiState => {
      const normalized = { expanded: Boolean(uiState?.expanded) };
      try {
        localStorage.setItem(MUSIC_UI_STORAGE_KEY, JSON.stringify(normalized));
      } catch {
        // Ignore storage failures.
      }
      return normalized;
    };

    const legacyButton = document.getElementById("musicToggleBtn");
    const legacyAudio = document.getElementById("portfolioMusic");
    if (legacyButton?.parentElement) legacyButton.remove();
    if (legacyAudio?.parentElement) legacyAudio.remove();

    let widget = document.getElementById("musicWidget");
    if (!widget) {
      widget = document.createElement("aside");
      widget.className = "music-widget collapsed";
      widget.id = "musicWidget";
      widget.setAttribute("aria-label", "Music player");
      widget.innerHTML = `
        <img id="musicWidgetCover" class="music-widget__cover" src="${MUSIC_FALLBACK_COVER}" alt="Current track cover" loading="lazy" />
        <div class="music-widget__meta">
          <p id="musicWidgetTitle" class="music-widget__title">${MUSIC_PLAYLIST[0].title}</p>
          <p id="musicWidgetArtist" class="music-widget__artist">${MUSIC_PLAYLIST[0].artist}</p>
          <div class="music-widget__volume-wrap">
            <span class="music-widget__volume-label" aria-hidden="true">VOL</span>
            <input id="musicWidgetVolume" class="music-widget__volume" type="range" min="0" max="1" step="0.01" value="0.7" aria-label="Music volume" />
          </div>
        </div>
        <div class="music-widget__actions">
          <button id="musicWidgetPlayPause" class="music-widget__btn" type="button" aria-label="Play music" title="Play">
            <i data-lucide="play" class="music-widget__icon-play"></i>
            <i data-lucide="pause" class="music-widget__icon-pause"></i>
          </button>
          <button id="musicWidgetNext" class="music-widget__btn" type="button" aria-label="Next song" title="Next">
            <i data-lucide="skip-forward"></i>
          </button>
        </div>
      `;
      document.body.appendChild(widget);
    }

    let audio = document.getElementById("musicWidgetAudio");
    if (!audio) {
      audio = document.createElement("audio");
      audio.id = "musicWidgetAudio";
      audio.preload = "metadata";
      audio.setAttribute("aria-hidden", "true");
      audio.style.display = "none";
      document.body.appendChild(audio);
    }

    if (window.lucide?.createIcons) {
      lucide.createIcons();
    }

    const coverElement = document.getElementById("musicWidgetCover");
    const titleElement = document.getElementById("musicWidgetTitle");
    const artistElement = document.getElementById("musicWidgetArtist");
    const playPauseButton = document.getElementById("musicWidgetPlayPause");
    const nextButton = document.getElementById("musicWidgetNext");
    const volumeInput = document.getElementById("musicWidgetVolume");

    if (!coverElement || !titleElement || !artistElement || !playPauseButton || !nextButton || !volumeInput) return;

    let currentState = readStoredMusicState();
    let uiState = readUiState();

    const hasUserInteracted = () => localStorage.getItem(MUSIC_USER_INTERACTED_KEY) === "1";
    const markUserInteracted = () => {
      try {
        localStorage.setItem(MUSIC_USER_INTERACTED_KEY, "1");
      } catch {
        // Ignore storage failures.
      }
    };

    const applyTrack = (trackIndex, preserveTime = 0) => {
      const boundedIndex = clamp(trackIndex, 0, MUSIC_PLAYLIST.length - 1);
      const track = getTrack(boundedIndex);

      if (audio.dataset.trackSrc !== track.src) {
        audio.src = track.src;
        audio.dataset.trackSrc = track.src;
      }

      const seek = () => {
        try {
          audio.currentTime = Math.max(0, preserveTime);
        } catch {
          // Ignore seek failures during metadata transitions.
        }
      };

      if (audio.readyState >= 1) {
        seek();
      } else {
        audio.addEventListener("loadedmetadata", seek, { once: true });
      }

      return boundedIndex;
    };

    const snapshotState = () => ({
      trackIndex: currentState.trackIndex,
      currentTime: Number.isFinite(audio.currentTime) ? audio.currentTime : 0,
      isPlaying: !audio.paused,
      volume: Number.isFinite(audio.volume) ? audio.volume : currentState.volume,
      updatedAt: Date.now()
    });

    const setExpanded = (expanded, shouldPersist = true) => {
      widget.classList.toggle("collapsed", !expanded);
      widget.classList.toggle("expanded", expanded);
      widget.classList.remove("is-collapsed");
      if (shouldPersist) {
        uiState = writeUiState({ expanded });
      } else {
        uiState = { expanded };
      }
    };

    const renderState = state => {
      currentState = persistMusicState(state);
      const activeTrack = getTrack(currentState.trackIndex);

      titleElement.textContent = activeTrack.title;
      artistElement.textContent = activeTrack.artist;
      coverElement.src = activeTrack.cover || MUSIC_FALLBACK_COVER;
      coverElement.alt = `${activeTrack.title} cover`;
      volumeInput.value = String(currentState.volume);

      widget.classList.toggle("is-playing", currentState.isPlaying);
      const label = currentState.isPlaying ? "Pause music" : "Play music";
      playPauseButton.setAttribute("aria-label", label);
      playPauseButton.setAttribute("title", currentState.isPlaying ? "Pause" : "Play");
    };

    coverElement.addEventListener("error", () => {
      coverElement.src = MUSIC_FALLBACK_COVER;
    });

    const playCurrent = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.warn("Music playback was blocked by the browser.", error);
      }
      renderState({ ...snapshotState(), isPlaying: !audio.paused });
    };

    const pauseCurrent = () => {
      audio.pause();
      renderState({ ...snapshotState(), isPlaying: false });
    };

    const goToNext = async shouldAutoplay => {
      const nextIndex = (currentState.trackIndex + 1) % MUSIC_PLAYLIST.length;
      currentState = { ...currentState, trackIndex: applyTrack(nextIndex, 0), currentTime: 0, updatedAt: Date.now() };
      renderState(currentState);

      if (shouldAutoplay) {
        await playCurrent();
      }
    };

    playPauseButton.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      markUserInteracted();

      if (widget.classList.contains("collapsed")) {
        setExpanded(true);
      }

      if (audio.paused) {
        playCurrent();
      } else {
        pauseCurrent();
        setExpanded(false);
      }
    });

    nextButton.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      markUserInteracted();
      const shouldAutoplay = !audio.paused;
      goToNext(shouldAutoplay);
    });

    volumeInput.addEventListener("input", event => {
      event.preventDefault();
      markUserInteracted();
      const volume = Number.parseFloat(volumeInput.value);
      if (!Number.isFinite(volume)) return;

      const nextState = {
        ...currentState,
        volume: clamp(volume, 0, 1),
        updatedAt: Date.now()
      };

      audio.volume = nextState.volume;
      renderState(nextState);
    });

    audio.addEventListener("play", () => {
      renderState({ ...snapshotState(), isPlaying: true });
    });

    audio.addEventListener("pause", () => {
      renderState({ ...snapshotState(), isPlaying: false });
    });

    audio.addEventListener("timeupdate", () => {
      if (!audio.paused) {
        persistMusicState(snapshotState());
      }
    });

    audio.addEventListener("ended", () => {
      goToNext(true);
    });

    const persistBeforeExit = () => {
      persistMusicState(snapshotState());
    };

    window.addEventListener("beforeunload", persistBeforeExit);
    window.addEventListener("pagehide", persistBeforeExit);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        persistBeforeExit();
      }
    });

    currentState = {
      ...currentState,
      trackIndex: applyTrack(currentState.trackIndex, currentState.currentTime),
      volume: clamp(currentState.volume, 0, 1)
    };
    audio.volume = currentState.volume;

    setExpanded(uiState.expanded || currentState.isPlaying, false);
    renderState(currentState);

    if (currentState.isPlaying && hasUserInteracted()) {
      playCurrent();
    }
  }

  function initializeEducationAnimations() {
    const bindObserver = (selector, className, threshold) => {
      const elements = document.querySelectorAll(selector);
      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries, activeObserver) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add(className);
            activeObserver.unobserve(entry.target);
          });
        },
        { threshold }
      );

      elements.forEach(element => observer.observe(element));
    };

    bindObserver(".edu-reveal", "show", 0.15);
    bindObserver(".semester-card", "fade-in", 0.25);
  }

  /**
   * SemesterAccordionComponent:
   * - Adds accessible expand/collapse behavior for semester cards.
   * - Animates panel height for smooth transitions.
   * - Applies subtle highlight styling to A/A+ grade cells.
   */
  function initializeEducationAccordion() {
    const accordionGroups = document.querySelectorAll(".semester-accordion-component");
    if (!accordionGroups.length) return;

    const reducedMotion = prefersReducedMotion();

    const markTopGrades = () => {
      document.querySelectorAll(".edu-table tbody tr").forEach(row => {
        const gradeCell = row.lastElementChild;
        if (!gradeCell) return;

        gradeCell.classList.add("grade-cell");
        const grade = String(gradeCell.textContent || "").trim().toUpperCase();
        if (/^A\+?$/.test(grade)) {
          gradeCell.classList.add("is-a");
        }
      });
    };

    const setPanelState = (item, expand, instant = false) => {
      const trigger = item.querySelector(".accordion-trigger");
      const panel = item.querySelector(".accordion-panel");
      if (!trigger || !panel) return;

      item.classList.toggle("is-open", expand);
      trigger.setAttribute("aria-expanded", String(expand));

      if (expand) {
        panel.hidden = false;
        if (instant || reducedMotion) {
          panel.style.maxHeight = "none";
          panel.style.opacity = "1";
          return;
        }

        panel.style.maxHeight = `${panel.scrollHeight}px`;
        panel.style.opacity = "1";
        const onExpandEnd = event => {
          if (event.propertyName !== "max-height") return;
          if (item.classList.contains("is-open")) {
            panel.style.maxHeight = "none";
          }
          panel.removeEventListener("transitionend", onExpandEnd);
        };
        panel.addEventListener("transitionend", onExpandEnd);
        return;
      }

      if (instant || reducedMotion) {
        panel.style.maxHeight = "0px";
        panel.style.opacity = "0";
        panel.hidden = true;
        return;
      }

      panel.style.maxHeight = panel.style.maxHeight === "none" ? `${panel.scrollHeight}px` : panel.style.maxHeight;
      requestAnimationFrame(() => {
        panel.style.maxHeight = "0px";
        panel.style.opacity = "0";
      });

      const onCollapseEnd = event => {
        if (event.propertyName !== "max-height") return;
        if (!item.classList.contains("is-open")) {
          panel.hidden = true;
        }
        panel.removeEventListener("transitionend", onCollapseEnd);
      };
      panel.addEventListener("transitionend", onCollapseEnd);
    };

    accordionGroups.forEach((group, groupIndex) => {
      const items = group.querySelectorAll(".accordion-item");

      items.forEach((item, itemIndex) => {
        const trigger = item.querySelector(".accordion-trigger");
        const panel = item.querySelector(".accordion-panel");
        if (!trigger || !panel) return;

        if (!panel.id) {
          panel.id = `semester-panel-${groupIndex + 1}-${itemIndex + 1}`;
        }
        trigger.setAttribute("aria-controls", panel.id);

        const shouldOpen = item.dataset.open === "true" || trigger.getAttribute("aria-expanded") === "true";
        setPanelState(item, shouldOpen, true);

        trigger.addEventListener("click", () => {
          const isOpen = item.classList.contains("is-open");
          setPanelState(item, !isOpen);
        });
      });
    });

    markTopGrades();
  }

  function initializeYears() {
    const year = String(new Date().getFullYear());
    ["currentYear", "currentYearFooter", "sidebarYear"].forEach(id => {
      const element = document.getElementById(id);
      if (element && element.textContent !== year) {
        element.textContent = year;
      }
    });
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
    label.textContent = TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key];
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
        const rateLimitMessage = TRANSLATIONS[language]["contact.form.rateLimit"] || TRANSLATIONS.en["contact.form.rateLimit"];
        setFormStatus(formStatus, rateLimitMessage, "error");
        showFormToast(rateLimitMessage, "error");
        return;
      }
      lastFormSubmissionAt = now;

      if (!window.emailjs?.send) {
        const errorMessage = TRANSLATIONS[language]["contact.form.error"] || TRANSLATIONS.en["contact.form.error"];
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
        const successMessage = TRANSLATIONS[language]["contact.form.success"] || TRANSLATIONS.en["contact.form.success"];
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
        const errorMessage = TRANSLATIONS[language]["contact.form.error"] || TRANSLATIONS.en["contact.form.error"];
        setFormStatus(formStatus, errorMessage, "error");
        showFormToast(errorMessage, "error");
      } finally {
        setSendButtonState(sendButton, false, language);
      }
    });
  }

  /**
   * App entrypoint.
   */
  document.addEventListener("DOMContentLoaded", () => {
    const dom = cacheDom();

    if (window.lucide?.createIcons && document.querySelector("i[data-lucide]")) {
      lucide.createIcons();
    }

    initializeMobileMenu(dom);
    initializeLanguage(dom);
    initializeScrollReveal();
    initializeSkillCounter();
    initializeHomeStatsCounter();
    initializeSmoothScroll();
    initializeMusicPlayer();
    initializeEducationAnimations();
    initializeEducationAccordion();
    initializeYears();
    initializeEmailJs(dom);
  });
})();
