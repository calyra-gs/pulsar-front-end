document.addEventListener("DOMContentLoaded", function () {
    iniciarMenu();
    iniciarFormularioAlerta();
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

function iniciarFormularioAlerta() {
    const formulario = document.getElementById("alertForm");

    if (!formulario) {
        return;
    }

    const campos = formulario.querySelectorAll("input, select, textarea");
    const mensagem = document.getElementById("alertMessage");

    campos.forEach(function (campo) {
        campo.addEventListener("input", atualizarPreviaAlerta);
        campo.addEventListener("change", atualizarPreviaAlerta);
    });

    mensagem.addEventListener("input", function () {
        document.getElementById("alertCounter").textContent = mensagem.value.length;
    });

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const area = document.getElementById("alertArea").value.trim();
        const tipo = document.getElementById("alertType").value.trim();
        const texto = document.getElementById("alertMessage").value.trim();
        const ponto = document.getElementById("meetingPoint").value.trim();

        let alertaValido = true;

        limparErro("erroAlertArea");
        limparErro("erroAlertType");
        limparErro("erroAlertMessage");
        limparErro("erroMeetingPoint");
        document.getElementById("alertSuccess").textContent = "";

        if (area === "") {
            mostrarErro("erroAlertArea", "Selecione a area de risco.");
            alertaValido = false;
        }

        if (tipo === "") {
            mostrarErro("erroAlertType", "Selecione o tipo de desastre.");
            alertaValido = false;
        }

        if (texto.length < 10) {
            mostrarErro("erroAlertMessage", "Escreva uma mensagem com pelo menos 10 caracteres.");
            alertaValido = false;
        }

        if (ponto.length < 3) {
            mostrarErro("erroMeetingPoint", "Informe um ponto de encontro.");
            alertaValido = false;
        }

        if (alertaValido) {
            document.getElementById("alertSuccess").textContent = "Alerta emitido na simulacao. Use os botoes ao lado para acompanhar.";
        }
    });

    formulario.addEventListener("reset", function () {
        setTimeout(function () {
            document.getElementById("alertCounter").textContent = "0";
            document.getElementById("alertSuccess").textContent = "";
            limparErro("erroAlertArea");
            limparErro("erroAlertType");
            limparErro("erroAlertMessage");
            limparErro("erroMeetingPoint");
            atualizarPreviaAlerta();
        }, 0);
    });

    atualizarPreviaAlerta();
}

function atualizarPreviaAlerta() {
    const area = document.getElementById("alertArea");
    const tipo = document.getElementById("alertType");
    const mensagem = document.getElementById("alertMessage");
    const ponto = document.getElementById("meetingPoint");
    const data = document.getElementById("validDate");
    const hora = document.getElementById("validTime");

    if (!area || !tipo || !mensagem || !ponto || !data || !hora) {
        return;
    }

    document.getElementById("previewArea").textContent = area.value || "Area ainda nao selecionada";
    document.getElementById("previewType").textContent = tipo.value || "Risco elevado";
    document.getElementById("previewMessage").textContent = mensagem.value || "A mensagem aparecera aqui.";
    document.getElementById("previewPoint").textContent = ponto.value || "Ponto ainda nao informado";
    document.getElementById("previewValidity").textContent = formatarData(data.value) + " as " + hora.value;
}

function mostrarErro(id, mensagem) {
    document.getElementById(id).textContent = mensagem;
}

function limparErro(id) {
    document.getElementById(id).textContent = "";
}

function formatarData(data) {
    if (!data) {
        return "Data nao informada";
    }

    const partes = data.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
}
