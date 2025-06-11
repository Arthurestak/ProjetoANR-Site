document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form[action='/login']");
    const signupForm = document.querySelector("form[action='/signup']");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ email, password })
            })
            .then(response => response.text())
            .then(data => alert(data))
            .catch(error => console.error("Erro ao fazer login:", error));
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            fetch("/signup", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ name, email, password })
            })
            .then(response => response.text())
            .then(data => alert(data))
            .catch(error => console.error("Erro ao cadastrar:", error));
        });
    }
});
