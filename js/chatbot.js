window.watsonAssistantChatOptions = {
    integrationID: "0ac3c192-fd56-4300-90c7-16edbfdda322",
    region: "https://integrations.us-east.assistant.watson.appdomain.cloud",
    serviceInstanceID: "023d89d1-0e43-47ad-89cf-bdec02a90882",
    onLoad: async function (instance) {
        await instance.render();
    }
};

setTimeout(function () {
    const script = document.createElement("script");
    const clientVersion = window.watsonAssistantChatOptions.clientVersion || "latest";

    script.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + clientVersion + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(script);
});
