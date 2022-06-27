const abrirModal = () => {
    const audio = document.querySelector('audio');
    let mensagem = `
        Tempo de ${document.getElementById("identificador").textContent} Esgotado! Clique em Continuar para continuar ou em Terminar para voltar ao início.
    `;

    document.querySelector("#mensagem-modal").textContent = mensagem;
    document.querySelector("#modal").showModal();

    audio.volume = 0.2;
    audio.play();
}

const fecharModal = () => {
    document.querySelector("#modal").close();
    document.querySelector('audio').load();

    document.querySelector("#play").classList.remove("hidden");
    document.querySelector("#pause").classList.add("hidden");

    alternar();
}

const fimPomodoro = () => {
    let mensagem = `Estudo terminado! Clique em Terminar para voltar ao início ou em Reiniciar para reiniciar`;

    document.querySelector("#reiniciar").classList.remove("hidden");
    document.querySelector("#continuar").classList.add("hidden");

    document.querySelector("#mensagem-modal").textContent = mensagem;
    document.querySelector("dialog").showModal();
}

const reiniciar = () => {
    cronometro.sessao = -1;
    document.querySelectorAll(".checkedEstudo").forEach(el => el.parentNode.removeChild(el));

    iniciarPomodoro();
    document.querySelector("dialog").close();

    document.getElementById("reiniciar").classList.add("hidden");
    document.getElementById("continuar").classList.remove("hidden");
}