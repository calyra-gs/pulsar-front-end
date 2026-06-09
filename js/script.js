document.addEventListener("DOMContentLoaded", function () {
    iniciarMenu();
    iniciarFormularioAlerta();
    iniciarSimulador();
    iniciarMorador();
    iniciarFiltroRetornos();
    iniciarContato();
    iniciarFaq();
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
            mostrarErro("erroAlertArea", "Selecione a área de risco.");
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
            document.getElementById("alertSuccess").textContent = "Alerta emitido na simulação. Use os botões ao lado para acompanhar.";
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

    document.getElementById("previewArea").textContent = area.value || "Área ainda não selecionada";
    document.getElementById("previewType").textContent = tipo.value || "Risco elevado";
    document.getElementById("previewMessage").textContent = mensagem.value || "A mensagem aparecerá aqui.";
    document.getElementById("previewPoint").textContent = ponto.value || "Ponto ainda não informado";
    document.getElementById("previewValidity").textContent = formatarData(data.value) + " às " + hora.value;
}

function mostrarErro(id, mensagem) {
    document.getElementById(id).textContent = mensagem;
}

function limparErro(id) {
    document.getElementById(id).textContent = "";
}

function formatarData(data) {
    if (!data) {
        return "Data não informada";
    }

    const partes = data.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
}

function iniciarSimulador() {
    const botaoProxima = document.getElementById("btnProximaEtapa");
    const botaoReiniciar = document.getElementById("btnReiniciarSimulacao");
    const etapas = document.querySelectorAll(".sim-step");
    const status = document.getElementById("routeStatus");
    const timeline = document.getElementById("simTimeline");

    if (!botaoProxima || !botaoReiniciar || etapas.length === 0 || !status || !timeline) {
        return;
    }

    const textos = [
        "Mensagem criada pela Defesa Civil.",
        "Alerta armazenado no gateway comunitário.",
        "Link principal indisponível. Mensagem aguardando nova conexão.",
        "Rota alternativa detectada para encaminhamento.",
        "Morador recebeu o alerta oficial.",
        "Morador enviou status ou pedido de socorro.",
        "Retorno chegou ao painel da Defesa Civil."
    ];

    const horarios = ["10:00:00", "10:00:05", "10:01:15", "10:03:40", "10:04:25", "10:06:10", "10:06:30"];
    let etapaAtual = 0;

    botaoProxima.addEventListener("click", function () {
        if (etapaAtual < etapas.length - 1) {
            etapaAtual++;
            atualizarSimulador();
        }
    });

    botaoReiniciar.addEventListener("click", function () {
        etapaAtual = 0;
        atualizarSimulador();
    });

    function atualizarSimulador() {
        etapas.forEach(function (etapa, indice) {
            etapa.classList.remove("active");
            etapa.classList.remove("done");

            if (indice < etapaAtual) {
                etapa.classList.add("done");
            }

            if (indice === etapaAtual) {
                etapa.classList.add("active");
            }
        });

        status.innerHTML = "<strong>Status atual:</strong> <span>" + textos[etapaAtual] + "</span>";
        timeline.innerHTML = "";

        for (let i = 0; i <= etapaAtual; i++) {
            const item = document.createElement("li");
            item.innerHTML = "<strong>" + horarios[i] + "</strong> " + textos[i];
            timeline.appendChild(item);
        }
    }

    atualizarSimulador();
}

function iniciarMorador() {
    const formulario = document.getElementById("residentForm");

    if (!formulario) {
        return;
    }

    const opcoes = document.querySelectorAll("input[name='residentStatus']");
    const detalhes = document.getElementById("rescueDetails");
    const observacao = document.getElementById("residentNote");

    opcoes.forEach(function (opcao) {
        opcao.addEventListener("change", function () {
            atualizarDetalhesResgate();
        });
    });

    observacao.addEventListener("input", function () {
        document.getElementById("residentCounter").textContent = observacao.value.length;
    });

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const statusSelecionado = document.querySelector("input[name='residentStatus']:checked").value;
        const coordenadaDtn = document.getElementById("gpsDtn").value.trim();

        if (statusSelecionado === "Preciso de resgate" && coordenadaDtn === "") {
            document.getElementById("residentSuccess").textContent = "Para resgate, confirme o status GPS/DTN.";
            return;
        }

        let mensagem = "Status registrado na simulação: " + statusSelecionado + ".";

        if (statusSelecionado === "Preciso de resgate") {
            mensagem += " Coordenada DTN anexada ao pedido.";
        }

        document.getElementById("residentSuccess").textContent = mensagem;
    });

    function atualizarDetalhesResgate() {
        const statusSelecionado = document.querySelector("input[name='residentStatus']:checked").value;

        if (statusSelecionado === "Preciso de resgate") {
            detalhes.classList.add("show");
        } else {
            detalhes.classList.remove("show");
        }
    }

    atualizarDetalhesResgate();
}

function iniciarFiltroRetornos() {
    const filtro = document.getElementById("returnFilter");
    const linhas = document.querySelectorAll("#returnsTable tbody tr");

    if (!filtro || linhas.length === 0) {
        return;
    }

    filtro.addEventListener("change", function () {
        const valor = filtro.value;

        linhas.forEach(function (linha) {
            const prioridade = linha.getAttribute("data-priority");

            if (valor === "todos" || valor === prioridade) {
                linha.classList.remove("hidden-row");
            } else {
                linha.classList.add("hidden-row");
            }
        });
    });
}

function iniciarContato() {
    const formulario = document.getElementById("contactForm");

    if (!formulario) {
        return;
    }

    const mensagem = document.getElementById("contactMessage");

    mensagem.addEventListener("input", function () {
        document.getElementById("contactCounter").textContent = mensagem.value.length;
    });

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const assunto = document.getElementById("contactSubject").value.trim();
        const texto = document.getElementById("contactMessage").value.trim();

        let contatoValido = true;

        limparErro("erroContactName");
        limparErro("erroContactEmail");
        limparErro("erroContactSubject");
        limparErro("erroContactMessage");
        document.getElementById("contactSuccess").textContent = "";

        if (nome.length < 3) {
            mostrarErro("erroContactName", "Informe seu nome.");
            contatoValido = false;
        }

        if (!email.includes("@") || !email.includes(".")) {
            mostrarErro("erroContactEmail", "Informe um e-mail válido.");
            contatoValido = false;
        }

        if (assunto === "") {
            mostrarErro("erroContactSubject", "Selecione um assunto.");
            contatoValido = false;
        }

        if (texto.length < 10) {
            mostrarErro("erroContactMessage", "Escreva uma mensagem com pelo menos 10 caracteres.");
            contatoValido = false;
        }

        if (contatoValido) {
            document.getElementById("contactSuccess").textContent = "Mensagem registrada na simulação. Obrigado pelo contato!";
        }
    });

    formulario.addEventListener("reset", function () {
        setTimeout(function () {
            document.getElementById("contactCounter").textContent = "0";
            document.getElementById("contactSuccess").textContent = "";
            limparErro("erroContactName");
            limparErro("erroContactEmail");
            limparErro("erroContactSubject");
            limparErro("erroContactMessage");
        }, 0);
    });
}

function iniciarFaq() {
    const itens = document.querySelectorAll(".faq-item");

    if (itens.length === 0) {
        return;
    }

    itens.forEach(function (item) {
        const botao = item.querySelector(".faq-question");
        const icone = item.querySelector(".faq-icon");

        botao.addEventListener("click", function () {
            const aberto = item.classList.toggle("open");

            botao.setAttribute("aria-expanded", aberto ? "true" : "false");
            icone.textContent = aberto ? "-" : "+";
        });
    });
}
