document.addEventListener("DOMContentLoaded", function () {
    iniciarMenu();
});

function iniciarMenu() {
    const botaoMenu = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".site-nav");

    if (!botaoMenu || !menu) {
        return;
    }

    botaoMenu.addEventListener("click", function () {
        menu.classList.toggle("open");

        const menuAberto = menu.classList.contains("open");
        botaoMenu.setAttribute("aria-expanded", menuAberto ? "true" : "false");
    });
}
