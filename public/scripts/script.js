// const SubSubjects = require('./controllers/materiasController');
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

    // /*Titulos da materias*/
     const fisrtTitle = window.document.getElementsByClassName('first-title');
     const secondTitle = window.document.getElementsByClassName('second-title');
     const thirdTitle = window.document.getElementsByClassName('third-title');
    rows = await new SubSubjects().assignment();

     console.log(rows)
     console.log("alguma coisa funcionou?")
    
    fisrtTitle.innerText = rows[1].name;
     secondTitle.innerText = rows[2].name;
     thirdTitle.innerText = rows[3].name;
    
});