/* =====================================================
   EDUCATION.JS — Education Page Animations
   and Semester Accordion Component
===================================================== */

(() => {
  "use strict";

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

  // Expose initialization functions
  window.__education = {
    initializeEducationAnimations,
    initializeEducationAccordion
  };
})();
