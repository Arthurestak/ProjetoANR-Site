window.addEventListener("DOMContentLoaded", async () => {
    const section = document.querySelectorAll(".section-title");
    const container = document.querySelectorAll(".container");
    const sidebar = document.getElementById("sidebar");
    const toggleButton = document.querySelector(".sidebar-toggle");
    const closeButton = document.querySelector(".close-sidebar");

    section.forEach((section, hidden) =>{
        setTimeout(() => {
            section.classList.remove("hidden");
            section.classList.add("show");
        }, 700)
    });

    container
    .forEach((card, hidden) =>{
        setTimeout(() => {
            card.classList.remove("hidden");
            card.classList.add("show");
        }, 1000)
    });

     toggleButton.addEventListener("click", function () {
         sidebar.classList.add("active");
     });

    closeButton.addEventListener("click", function () {
        sidebar.classList.remove("active");
    });
});