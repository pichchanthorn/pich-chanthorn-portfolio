// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {

    /* ============================
       0) Initialize Lucide Icons
    ============================ */
    if (window.lucide) {
        lucide.createIcons();
    }

    /* ============================
       1) Scroll Reveal Animation
    ============================ */
    const revealSections = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("active");   // trigger CSS animation
                observer.unobserve(entry.target);       // animate once
            });
        },
        { threshold: 0.18 }
    );

    revealSections.forEach(sec => revealObserver.observe(sec));


    /* ===========================================
       2) Skill Percent Count-Up (Skills Page)
    ============================================ */
    // const skillCards = document.querySelectorAll(".skills-page .skill-card");

    // const percentObserver = new IntersectionObserver(
    //     (entries, observer) => {
    //         entries.forEach(entry => {
    //             if (!entry.isIntersecting) return;

    //             const card = entry.target;
    //             observer.unobserve(card);

    //             const percentText = card.querySelector(".skill-percent");
    //             if (!percentText) return;

    //             const target = parseInt(percentText.textContent, 10);
    //             let start = 0;
    //             percentText.textContent = "0%";

    //             const duration = 900;
    //             const begin = performance.now();

    //             function animate(now) {
    //                 let progress = Math.min((now - begin) / duration, 1);
    //                 let value = Math.floor(target * progress);
    //                 percentText.textContent = value + "%";

    //                 if (progress < 1) requestAnimationFrame(animate);
    //             }

    //             requestAnimationFrame(animate);
    //         });
    //     },
    //     { threshold: 0.55 }
    // );

    // skillCards.forEach(card => percentObserver.observe(card));

    /* ===========================================
   2) Skill Percent Count-Up (Skills Page)
============================================ */
const skillCards = document.querySelectorAll(".skills-page .skill-card");

const percentObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const card = entry.target;
            observer.unobserve(card);

            const percentText = card.querySelector(".skill-percent");
            const bar = card.querySelector(".skill-fill");
            if (!percentText || !bar) return;

            // target from text (80, 75, ...)
            const target = parseInt(percentText.textContent, 10);
            const duration = 900;
            const begin = performance.now();

            // start state
            percentText.textContent = "0%";
            bar.style.width = "0%";

            function animate(now) {
                const progress = Math.min((now - begin) / duration, 1);
                const value = Math.floor(target * progress);

                // update text
                percentText.textContent = value + "%";
                // update bar width
                bar.style.width = value + "%";

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }

            requestAnimationFrame(animate);
        });
    },
    { threshold: 0.55 }
);

skillCards.forEach(card => percentObserver.observe(card));



    /* ====================================
       3) Home Page Stats Counter (5+, 12+)
    ===================================== */
    const counters = document.querySelectorAll(".stat-number[data-target]");

    if (counters.length > 0) {
        const statsObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    const el = entry.target;
                    observer.unobserve(el);

                    let target = parseInt(el.dataset.target, 10);
                    let start = 0;
                    const duration = 1200;
                    const begin = performance.now();

                    function tick(now) {
                        let progress = Math.min((now - begin) / duration, 1);
                        let value = Math.floor(start + (target - start) * progress);
                        el.textContent = value + "+";

                        if (progress < 1) requestAnimationFrame(tick);
                    }

                    requestAnimationFrame(tick);
                });
            },
            { threshold: 0.6 }
        );

        counters.forEach(c => statsObserver.observe(c));
    }


    /* =================================
       4) Smooth Scroll for # links
    ================================= */
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

});













document.addEventListener("DOMContentLoaded", () => {
    /* ======================================================
       1. Scroll Reveal Animation (.edu-reveal)
    ====================================================== */
    const revealEls = document.querySelectorAll(".edu-reveal");

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("show");
            });
        },
        { threshold: 0.15 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));

    /* ======================================================
       2. Fade-in animation for semester tables
    ====================================================== */
    const semesterCards = document.querySelectorAll(".semester-card");

    const tableObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("fade-in");
            });
        },
        { threshold: 0.25 }
    );

    semesterCards.forEach((card) => tableObserver.observe(card));

    /* ======================================================
       3. Smooth Scroll for internal links (#)
    ====================================================== */
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
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

    /* ======================================================
       4. Auto-highlight current semester while scrolling
    ====================================================== */
    const semesters = document.querySelectorAll(".semester-card");

    const highlightObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const id = entry.target.getAttribute("id");
                const menuLink = document.querySelector(`a[href="#${id}"]`);
                if (!menuLink) return;

                if (entry.isIntersecting) {
                    document
                        .querySelectorAll(".sem-link")
                        .forEach((l) => l.classList.remove("active"));

                    menuLink.classList.add("active");
                }
            });
        },
        { threshold: 0.6 }
    );

    semesters.forEach((el) => highlightObserver.observe(el));
});


// ===================================
// Auto Update Year (Sidebar + Footer)
// ===================================
document.addEventListener("DOMContentLoaded", () => {
    const year = new Date().getFullYear(); // example: 2026

    // Main footer
    const footerYear = document.getElementById("currentYear");
    if (footerYear) {
        footerYear.textContent = year;
    }

    // Sidebar footer
    const sidebarYear = document.getElementById("sidebarYear");
    if (sidebarYear) {
        sidebarYear.textContent = year;
    }
});
