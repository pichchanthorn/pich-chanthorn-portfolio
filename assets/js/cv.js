const revealNodes = Array.from(document.querySelectorAll("[data-reveal]"));

const updateLastModifiedText = () => {
  const holder = document.getElementById("cv-last-updated");
  if (!holder) {
    return;
  }

  const updated = new Date(document.lastModified);
  if (Number.isNaN(updated.getTime())) {
    holder.textContent = "Recently";
    return;
  }

  holder.textContent = updated.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

const activateRevealAnimations = () => {
  if (!revealNodes.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealNodes.forEach((node) => {
      node.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const index = revealNodes.indexOf(entry.target);
        if (index >= 0) {
          entry.target.style.animationDelay = `${index * 80}ms`;
        }

        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealNodes.forEach((node) => observer.observe(node));
};

updateLastModifiedText();
activateRevealAnimations();
