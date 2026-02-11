/* =====================================================
   MAIN.JS — Portfolio Global Script
   Author: Pich Chanthorn
   Description: UI interactions + EmailJS contact
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     1) LUCIDE ICONS
  ===================================================== */
  if (window.lucide) {
    lucide.createIcons();
  }

  /* =====================================================
     2) MOBILE MENU (SIDEBAR)
  ===================================================== */
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");

  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }

  /* =====================================================
     3) SCROLL REVEAL (.reveal)
  ===================================================== */
  const revealSections = document.querySelectorAll(".reveal");

  if (revealSections.length) {
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

  /* =====================================================
     4) SKILL PERCENT COUNT-UP
  ===================================================== */
  const skillCards = document.querySelectorAll(".skills-page .skill-card");

  if (skillCards.length) {
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

  /* =====================================================
     5) HOME STATS COUNTER (0 → number+)
  ===================================================== */
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");

  if (statNumbers.length) {
    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          observer.unobserve(el);

          const target = parseInt(el.dataset.target, 10);
          const duration = 1200;
          const start = performance.now();

          el.textContent = "0";

          function animate(now) {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.floor(target * progress);
            el.textContent = value + "+";

            if (progress < 1) requestAnimationFrame(animate);
          }

          requestAnimationFrame(animate);
        });
      },
      { threshold: 0.6 }
    );

    statNumbers.forEach(el => statsObserver.observe(el));
  }

  /* =====================================================
     6) SMOOTH SCROLL (#ANCHOR)
  ===================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href").substring(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 20,
        behavior: "smooth",
      });
    });
  });

  /* =====================================================
     7) EDUCATION PAGE ANIMATIONS
  ===================================================== */
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

  /* =====================================================
     8) AUTO UPDATE YEAR
  ===================================================== */
  const year = new Date().getFullYear();

  const footerYear = document.getElementById("currentYear");
  if (footerYear) footerYear.textContent = year;

  const sidebarYear = document.getElementById("sidebarYear");
  if (sidebarYear) sidebarYear.textContent = year;

});


/* =====================================================
   9) EMAILJS CONTACT FORM
===================================================== */

/* Init EmailJS (PUBLIC KEY) */
(function () {
  if (window.emailjs) {
    emailjs.init("tjw1lER8-6wZCb5Wg");
  }
})();

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("contactForm");
  const statusText = document.getElementById("formStatus");
  const sendBtn = document.getElementById("sendBtn");

  if (!form || !sendBtn || !statusText) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";

    const params = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    emailjs
      .send("service_1f3kxsk", "template_5tfub9f", params)
      .then(() => {
        statusText.textContent = "✅ Message sent successfully!";
        statusText.style.color = "#22c55e";
        form.reset();
      })
      .catch(error => {
        console.error("EmailJS Error:", error);
        statusText.textContent = "❌ Failed to send message. Please try again.";
        statusText.style.color = "#ef4444";
      })
      .finally(() => {
        sendBtn.disabled = false;
        sendBtn.innerHTML =
          '<i data-lucide="send"></i><span> Send Message</span>';
        if (window.lucide) lucide.createIcons();
      });
  });

});
