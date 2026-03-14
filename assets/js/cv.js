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

const setupPrintButton = () => {
  const printButton = document.getElementById("printCvButton");
  if (!printButton) {
    return;
  }

  printButton.addEventListener("click", () => {
    window.print();
  });
};

updateLastModifiedText();
setupPrintButton();
