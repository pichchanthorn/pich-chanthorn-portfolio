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

    // Shared animations & counters
    initializeScrollReveal();
    initializeSkillCounter();
    initializeHomeStatsCounter();
    initializeSmoothScroll();

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