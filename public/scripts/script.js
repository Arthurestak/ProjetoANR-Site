document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const toggleButton = document.querySelector(".sidebar-toggle");
    const closeButton = document.querySelector(".close-sidebar");

    toggleButton.addEventListener("click", function () {
        sidebar.classList.add("active");
    });

    closeButton.addEventListener("click", function () {
        sidebar.classList.remove("active");
    });
});
