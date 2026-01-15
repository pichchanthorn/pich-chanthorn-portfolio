document.querySelectorAll(".cv-card").forEach((card, i) => {
  card.style.opacity = 0;
  card.style.transform = "translateY(30px)";

  setTimeout(() => {
    card.style.transition = "0.6s";
    card.style.opacity = 1;
    card.style.transform = "translateY(0)";
  }, i * 150);
});
