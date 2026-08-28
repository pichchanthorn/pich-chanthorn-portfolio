/* =====================================================
   MAIN.JS — Portfolio Global Orchestrator
   Shared utilities + module initialization
===================================================== */

(() => {
  "use strict";

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
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

  function initializeTechStackReveal() {
    const grid = document.querySelector(".tech-categories");
    const pills = document.querySelectorAll(".tech-categories .tech-pill");
    if (!grid || !pills.length) return;

    if (prefersReducedMotion()) {
      pills.forEach(pill => pill.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          activeObserver.unobserve(entry.target);

          pills.forEach((pill, index) => {
            setTimeout(() => pill.classList.add("is-visible"), index * 70);
          });
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(grid);
  }

  function initializeHomeStatsCounter() {
    const statNumbers = document.querySelectorAll(".stat-number[data-target]");
    if (!statNumbers.length) return;

    const formatValue = element => {
      // Keep compatibility with both markup styles: with or without a separate .stat-plus element.
      const hasSeparatePlus = Boolean(element.parentElement?.querySelector(".stat-plus"));
      return value => (hasSeparatePlus ? `${value}` : `${value}+`);
    };

    const getFallbackValue = element => {
      const fallback = Number.parseInt(element.dataset.fallback || "", 10);
      const target = Number.parseInt(element.dataset.target || "", 10);
      if (Number.isFinite(fallback)) return fallback;
      if (Number.isFinite(target)) return target;
      const existing = Number.parseInt(element.textContent || "", 10);
      return Number.isFinite(existing) ? existing : 0;
    };

    // Immediate fallback rendering so values are meaningful even if animation does not run.
    statNumbers.forEach(element => {
      const fallback = getFallbackValue(element);
      element.textContent = formatValue(element)(fallback);
    });

    if (prefersReducedMotion()) {
      statNumbers.forEach(element => {
        const target = Number.parseInt(element.dataset.target, 10);
        if (!Number.isFinite(target)) return;
        element.textContent = formatValue(element)(target);
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

          const fallback = getFallbackValue(entry.target);
          const formatter = formatValue(entry.target);
          if (fallback >= target) {
            entry.target.textContent = formatter(target);
            return;
          }

          animateValue(1200, target - fallback, value => {
            const nextValue = fallback + value;
            entry.target.textContent = formatter(nextValue);
          });

          // Guarantee final target value after animation rounding.
          setTimeout(() => {
            entry.target.textContent = formatter(target);
          }, 1250);
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

  function initializeProjectFilters() {
    const filterTabs = document.querySelectorAll(".project-filter-tab[data-filter]");
    const projectCards = document.querySelectorAll(".projects-grid .project-card[data-category]");
    if (!filterTabs.length || !projectCards.length) return;

    const applyFilter = filter => {
      projectCards.forEach(card => {
        const category = (card.dataset.category || "").toLowerCase();
        const shouldShow = filter === "all" || category.includes(filter);
        card.classList.toggle("is-hidden", !shouldShow);
      });
    };

    filterTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        filterTabs.forEach(item => {
          item.classList.remove("active");
          item.setAttribute("aria-pressed", "false");
        });

        tab.classList.add("active");
        tab.setAttribute("aria-pressed", "true");
        applyFilter((tab.dataset.filter || "all").toLowerCase());
      });
    });
  }

  function initializeCertificateFilters() {
    const filterButtons = document.querySelectorAll(".cert-filter-btn[data-filter]");
    const certCards = document.querySelectorAll(".cert-timeline-item[data-category]");
    if (!filterButtons.length || !certCards.length) return;

    const applyFilter = filter => {
      certCards.forEach(card => {
        const category = (card.dataset.category || "").toLowerCase();
        const shouldShow = filter === "all" || category.includes(filter);
        card.classList.toggle("is-hidden", !shouldShow);
      });
    };

    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        filterButtons.forEach(item => {
          item.classList.remove("active");
          item.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");
        applyFilter((button.dataset.filter || "all").toLowerCase());
      });
    });

    const defaultButton = document.querySelector(".cert-filter-btn.active") || filterButtons[0];
    applyFilter((defaultButton?.dataset.filter || "all").toLowerCase());
  }

  function initializeCertificateLightbox() {
    const thumbs = document.querySelectorAll(".cert-page .cert-thumb");
    const lightbox = document.getElementById("certLightbox");
    if (!thumbs.length || !lightbox) return;

    const lightboxImg = document.getElementById("certLightboxImg");
    const lightboxCaption = document.getElementById("certLightboxCaption");
    const closeBtn = document.getElementById("certLightboxClose");
    let lastFocused = null;

    const openLightbox = thumb => {
      const img = thumb.querySelector("img");
      if (!img) return;
      lastFocused = document.activeElement;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = img.alt;
      lightbox.hidden = false;
      document.body.classList.add("cert-lightbox-open");
      closeBtn.focus();
    };

    const closeLightbox = () => {
      lightbox.hidden = true;
      lightboxImg.src = "";
      document.body.classList.remove("cert-lightbox-open");
      lastFocused?.focus();
    };

    thumbs.forEach(thumb => {
      thumb.setAttribute("role", "button");
      thumb.setAttribute("tabindex", "0");
      const title = thumb.closest(".cert-card")?.querySelector(".cert-title")?.textContent?.trim();
      thumb.setAttribute("aria-label", title ? `View larger image of ${title}` : "View larger certificate image");

      thumb.addEventListener("click", () => openLightbox(thumb));
      thumb.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(thumb);
        }
      });
    });

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

  function initializeWelcomeScreen() {
    // The inline head script (present on every page) is the single source of
    // truth for "should this load show the intro" — it already inspected
    // performance.getEntriesByType("navigation") and document.referrer before
    // first paint. If that attribute isn't set, there is nothing to do: no
    // element is created, so a page with JS disabled never sees any trace of
    // this feature.
    if (document.documentElement.getAttribute("data-welcome") !== "pending") return;

    // Built here instead of living as a markup block in every HTML file, so
    // the one welcome component is defined in a single place.
    const welcomeScreen = document.createElement("div");
    welcomeScreen.className = "welcome-screen";
    welcomeScreen.id = "welcomeScreen";
    welcomeScreen.setAttribute("role", "dialog");
    welcomeScreen.setAttribute("aria-modal", "true");
    welcomeScreen.setAttribute(
      "aria-label",
      "Welcome — Pich Chanthorn, Information Technology Student and Aspiring Full-Stack Web Developer"
    );
    welcomeScreen.innerHTML =
      '<div class="welcome-screen__content" aria-hidden="true">' +
        '<p class="welcome-screen__line welcome-screen__name">Pich <span class="highlight">Chanthorn</span></p>' +
        '<p class="welcome-screen__line welcome-screen__greeting">Welcome to my portfolio</p>' +
        '<p class="welcome-screen__line welcome-screen__role">Information Technology Student &amp; Aspiring Full-Stack Web Developer</p>' +
      "</div>" +
      '<button type="button" class="btn ghost welcome-screen__skip" id="welcomeSkip">Skip</button>';

    // position:fixed + the CSS layer's z-index means DOM position doesn't
    // affect stacking, so appending is enough — no need to reorder existing
    // body children.
    document.body.appendChild(welcomeScreen);

    const skipButton = welcomeScreen.querySelector("#welcomeSkip");
    document.body.classList.add("welcome-open");

    let finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      document.body.classList.remove("welcome-open");
      document.documentElement.removeAttribute("data-welcome");
      welcomeScreen.remove();
    }

    // Normal path: the CSS animation (full or reduced-motion variant) ends.
    welcomeScreen.addEventListener("animationend", event => {
      if (event.target === welcomeScreen) finish();
    });

    // Safety net: if the animation is ever blocked or never fires, the
    // overlay still self-clears instead of blocking the page indefinitely.
    setTimeout(finish, 2200);

    skipButton.addEventListener("click", finish);

    document.addEventListener("keydown", function onKeydown(event) {
      if (event.key !== "Escape") return;
      finish();
      document.removeEventListener("keydown", onKeydown);
    });

    skipButton.focus({ preventScroll: true });
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

  /**
   * App entrypoint — orchestrates all modules.
   */
  document.addEventListener("DOMContentLoaded", () => {
    const dom = cacheDom();

    if (window.lucide?.createIcons && document.querySelector("i[data-lucide]")) {
      lucide.createIcons();
    }

    // Navigation & i18n (navigation.js)
    window.__navigation?.initializeMobileMenu(dom);
    window.__navigation?.initializeLanguage(dom);

    // Welcome intro (home page only)
    initializeWelcomeScreen();

    // Shared animations & counters
    initializeScrollReveal();
    initializeSkillCounter();
    initializeTechStackReveal();
    initializeHomeStatsCounter();
    initializeSmoothScroll();
    initializeProjectFilters();
    initializeCertificateFilters();
    initializeCertificateLightbox();

    // Music widget (music-widget.js)
    window.__musicWidget?.initializeMusicPlayer();

    // Education page (education.js)
    window.__education?.initializeEducationAnimations();
    window.__education?.initializeEducationAccordion();

    // Year displays
    initializeYears();

    // Contact form (contact-form.js)
    window.__contactForm?.initializeEmailJs(dom);
  });
})();