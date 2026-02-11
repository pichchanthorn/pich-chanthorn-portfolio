/* =====================================================
   MAIN.JS — FINAL MERGED VERSION
   Mobile Menu + Animations + EmailJS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     1. Lucide Icons
  ========================= */
  if (window.lucide) {
    lucide.createIcons();
  }

  /* =========================
     2. MOBILE MENU (FIXED ✅)
  ========================= */
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");

  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
      console.log("Menu toggled");
    });
  }

  /* =========================
     3. Scroll Reveal (.reveal)
  ========================= */
  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length) {
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

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* =========================
     4. Skills Counter
  ========================= */
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
          const start = performance.now();
          const duration = 900;

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

  /* =========================
     5. Auto Year
  ========================= */
  const year = new Date().getFullYear();
  const footerYear = document.getElementById("currentYear");
  if (footerYear) footerYear.textContent = year;
});


/* =====================================================
   EMAILJS CONTACT FORM (WORKING ✅)
===================================================== */

// Init EmailJS
(function () {
  emailjs.init("tjw1lER8-6wZCb5Wg"); // ✅ your real public key
})();

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("contactForm");
  const statusText = document.getElementById("formStatus");
  const sendBtn = document.getElementById("sendBtn");

  if (!form) return;

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
      .catch(err => {
        console.error("EmailJS Error:", err);
        statusText.textContent = "❌ Failed to send message.";
        statusText.style.color = "red";
      })
      .finally(() => {
        sendBtn.disabled = false;
        sendBtn.innerHTML =
          '<i data-lucide="send"></i><span> Send Message</span>';
        if (window.lucide) lucide.createIcons();
      });
  });

});
