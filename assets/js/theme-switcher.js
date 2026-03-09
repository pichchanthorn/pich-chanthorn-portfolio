/* =====================================================
   THEME-SWITCHER.JS — Theme Selection & Persistence
   Three modes: light, dark, system (OS preference)
===================================================== */

(() => {
  "use strict";

  const THEME_KEY = "portfolio_theme";
  const VALID_THEMES = ["light", "dark", "system"];

  /* ---- SVG Icons (inline to avoid extra network requests) ---- */
  const ICONS = {
    sun: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    moon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    monitor: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    palette: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c0.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>'
  };

  /* ---- Helpers ---- */
  function getSavedTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    return VALID_THEMES.includes(saved) ? saved : "system";
  }

  function getResolvedTheme(theme) {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    return theme;
  }

  function getButtonIcon(theme) {
    const resolved = getResolvedTheme(theme);
    return resolved === "light" ? ICONS.sun : ICONS.moon;
  }

  /* ---- Apply theme to <html> ---- */
  function applyTheme(theme, animate) {
    const html = document.documentElement;

    if (animate) {
      html.classList.add("theme-transitioning");
      setTimeout(() => html.classList.remove("theme-transitioning"), 450);
    }

    html.setAttribute("data-theme", theme);
  }

  /* ---- Inject the switcher UI ---- */
  function injectSwitcher() {
    if (document.querySelector(".theme-switcher")) return;

    const currentTheme = getSavedTheme();

    const wrapper = document.createElement("div");
    wrapper.className = "theme-switcher";
    wrapper.innerHTML = `
      <button class="theme-switcher__btn" aria-label="Switch theme" aria-haspopup="true" aria-expanded="false" type="button">
        ${getButtonIcon(currentTheme)}
      </button>
      <div class="theme-switcher__dropdown" role="menu">
        <span class="theme-switcher__label">Theme</span>
        <button class="theme-option" data-theme-value="light" role="menuitem" type="button">
          <span class="theme-option__icon">${ICONS.sun}</span>
          <span class="theme-option__text">Light</span>
          <span class="theme-option__check">${ICONS.check}</span>
        </button>
        <button class="theme-option" data-theme-value="dark" role="menuitem" type="button">
          <span class="theme-option__icon">${ICONS.moon}</span>
          <span class="theme-option__text">Dark</span>
          <span class="theme-option__check">${ICONS.check}</span>
        </button>
        <button class="theme-option" data-theme-value="system" role="menuitem" type="button">
          <span class="theme-option__icon">${ICONS.monitor}</span>
          <span class="theme-option__text">System</span>
          <span class="theme-option__check">${ICONS.check}</span>
        </button>
      </div>
    `;

    document.body.appendChild(wrapper);
    updateActiveState(currentTheme, wrapper);
    bindEvents(wrapper);
  }

  /* ---- Update the active/checked state ---- */
  function updateActiveState(theme, container) {
    const options = container.querySelectorAll(".theme-option");
    options.forEach(opt => {
      const isActive = opt.dataset.themeValue === theme;
      opt.classList.toggle("active", isActive);
      opt.setAttribute("aria-checked", String(isActive));
    });

    const btn = container.querySelector(".theme-switcher__btn");
    if (btn) btn.innerHTML = getButtonIcon(theme);
  }

  /* ---- Toggle dropdown open/close ---- */
  function toggleDropdown(container, forceState) {
    const dropdown = container.querySelector(".theme-switcher__dropdown");
    const btn = container.querySelector(".theme-switcher__btn");
    if (!dropdown || !btn) return;

    const isOpen = typeof forceState === "boolean" ? forceState : !dropdown.classList.contains("open");
    dropdown.classList.toggle("open", isOpen);
    btn.setAttribute("aria-expanded", String(isOpen));
  }

  /* ---- Bind all event listeners ---- */
  function bindEvents(container) {
    const btn = container.querySelector(".theme-switcher__btn");
    const dropdown = container.querySelector(".theme-switcher__dropdown");

    /* Toggle on button click */
    btn.addEventListener("click", e => {
      e.stopPropagation();
      toggleDropdown(container);
    });

    /* Theme option click */
    dropdown.addEventListener("click", e => {
      const option = e.target.closest(".theme-option");
      if (!option) return;

      const value = option.dataset.themeValue;
      if (!VALID_THEMES.includes(value)) return;

      localStorage.setItem(THEME_KEY, value);
      applyTheme(value, true);
      updateActiveState(value, container);
      toggleDropdown(container, false);
    });

    /* Close on outside click */
    document.addEventListener("click", e => {
      if (!container.contains(e.target)) {
        toggleDropdown(container, false);
      }
    });

    /* Close on Escape */
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && dropdown.classList.contains("open")) {
        toggleDropdown(container, false);
        btn.focus();
      }
    });

    /* Keyboard navigation within dropdown */
    dropdown.addEventListener("keydown", e => {
      const options = [...dropdown.querySelectorAll(".theme-option")];
      const current = document.activeElement;
      const index = options.indexOf(current);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        options[(index + 1) % options.length].focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        options[(index - 1 + options.length) % options.length].focus();
      }
    });

    /* Listen for OS color scheme changes (for system mode) */
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
      const current = getSavedTheme();
      if (current === "system") {
        applyTheme("system", true);
        updateActiveState("system", container);
      }
    });
  }

  /* ---- Initialize ---- */
  function init() {
    const theme = getSavedTheme();
    applyTheme(theme, false);
    injectSwitcher();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
