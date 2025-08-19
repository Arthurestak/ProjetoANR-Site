window.addEventListener("DOMContentLoaded", async () => {
  const sections = document.querySelectorAll(".section-title");
  const containers = document.querySelectorAll(".container");
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.querySelector(".sidebar-toggle");
  const closeButton = document.querySelector(".close-sidebar");

  // Animação das sections
  sections.forEach((section) => {
    setTimeout(() => {
      section.classList.remove("hidden");
      section.classList.add("show");
    }, 700);
  });

  // Animação dos containers
  containers.forEach((card) => {
    setTimeout(() => {
      card.classList.remove("hidden");
      card.classList.add("show");
    }, 1000);
  });

  // Evento para abrir a sidebar
  if (toggleButton && sidebar) {
    toggleButton.addEventListener("click", () => {
      sidebar.classList.add("active");
    });
  }

  // Evento para fechar a sidebar
  if (closeButton && sidebar) {
    closeButton.addEventListener("click", () => {
      sidebar.classList.remove("active");
    });
  }
});