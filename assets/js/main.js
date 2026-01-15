// assets/js/main.js

/* =========================================
   GLOBAL INIT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ============================
       0) Lucide Icons
    ============================ */
    if (window.lucide) {
        lucide.createIcons();
    }

    /* ============================
       1) Scroll Reveal (.reveal)
    ============================ */
    const revealSections = document.querySelectorAll(".reveal");

    if (revealSections.length) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.18 });

        revealSections.forEach(sec => revealObserver.observe(sec));
    }

    /* ============================
       2) Skill Percent Count-Up
    ============================ */
    const skillCards = document.querySelectorAll(".skills-page .skill-card");

    if (skillCards.length) {
        const percentObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const card = entry.target;
                observer.unobserve(card);

                const percentText = card.querySelector(".skill-percent");
                const bar = card.querySelector(".skill-fill");
                if (!percentText || !bar) return;

                const target = parseInt(percentText.textContent, 10);
                const duration = 900;
                const begin = performance.now();

                percentText.textContent = "0%";
                bar.style.width = "0%";

                function animate(now) {
                    const progress = Math.min((now - begin) / duration, 1);
                    const value = Math.floor(target * progress);

                    percentText.textContent = value + "%";
                    bar.style.width = value + "%";

                    if (progress < 1) requestAnimationFrame(animate);
                }

                requestAnimationFrame(animate);
            });
        }, { threshold: 0.55 });

        skillCards.forEach(card => percentObserver.observe(card));
    }

    /* ============================
       3) Home Stats Counter
    ============================ */
    const counters = document.querySelectorAll(".stat-number[data-target]");

    if (counters.length) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const el = entry.target;
                observer.unobserve(el);

                const target = parseInt(el.dataset.target, 10);
                const duration = 1200;
                const begin = performance.now();

                function tick(now) {
                    const progress = Math.min((now - begin) / duration, 1);
                    const value = Math.floor(target * progress);
                    el.textContent = value + "+";

                    if (progress < 1) requestAnimationFrame(tick);
                }

                requestAnimationFrame(tick);
            });
        }, { threshold: 0.6 });

        counters.forEach(c => statsObserver.observe(c));
    }

    /* ============================
       4) Smooth Scroll (# links)
    ============================ */
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

    /* ============================
       5) Education Page Animations
    ============================ */
    const revealEls = document.querySelectorAll(".edu-reveal");
    if (revealEls.length) {
        const revealObserverEdu = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("show");
            });
        }, { threshold: 0.15 });

        revealEls.forEach(el => revealObserverEdu.observe(el));
    }

    const semesterCards = document.querySelectorAll(".semester-card");
    if (semesterCards.length) {
        const tableObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("fade-in");
            });
        }, { threshold: 0.25 });

        semesterCards.forEach(card => tableObserver.observe(card));

        const highlightObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute("id");
                const menuLink = document.querySelector(`a[href="#${id}"]`);
                if (!menuLink) return;

                if (entry.isIntersecting) {
                    document.querySelectorAll(".sem-link").forEach(l => l.classList.remove("active"));
                    menuLink.classList.add("active");
                }
            });
        }, { threshold: 0.6 });

        semesterCards.forEach(el => highlightObserver.observe(el));
    }

    /* ============================
       6) Auto Update Year
    ============================ */
    const year = new Date().getFullYear();

    const footerYear = document.getElementById("currentYear");
    if (footerYear) footerYear.textContent = year;

    const sidebarYear = document.getElementById("sidebarYear");
    if (sidebarYear) sidebarYear.textContent = year;

});


/* =========================================
   EMAILJS CONTACT FORM (External JS)
========================================= */

// Init EmailJS
(function () {
    emailjs.init("tjw1lER8-6wZCb5Wg"); // PUBLIC KEY (correct)
})();

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    const statusText = document.getElementById("formStatus");
    const sendBtn = document.getElementById("sendBtn");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        sendBtn.disabled = true;
        sendBtn.innerHTML = "Sending...";

        const params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

        emailjs
            .send("service_1f3kxsk", "template_5tfub9f", params)
            .then(function () {
                statusText.textContent = "✅ Message sent successfully!";
                statusText.style.color = "#22c55e";
                form.reset();
            })
            .catch(function (error) {
                statusText.textContent = "❌ Failed to send message. Please try again.";
                statusText.style.color = "red";
                console.error("EmailJS Error:", error);
            })
            .finally(function () {
                sendBtn.disabled = false;
                sendBtn.innerHTML = '<i data-lucide="send"></i><span> Send Message</span>';
                if (window.lucide) lucide.createIcons();
            });
    });

});
