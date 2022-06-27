const iniciarPomodoro = () => {
    const sessoes = parseInt(document.querySelector("#sessoes").innerText);
    const nSessoes = document.querySelector("#n-sessoes");
    cronometro.repeticoes = parseInt(document.querySelector("#sessoes").innerText);

    localStorage.setItem('identificador', 0);

    esconderTelaInicial();
    construirCheck(nSessoes, sessoes);
    alternar();
}

const construirTimer = () => {
    cronometro.minuto = parseInt(cronometro.tempo / 60, 10);
    cronometro.minuto = cronometro.minuto < 10 ? "0" + cronometro.minuto : cronometro.minuto;

    cronometro.segundo = parseInt(cronometro.tempo % 60, 10);
    cronometro.segundo = cronometro.segundo < 10 ? "0" + cronometro.segundo : cronometro.segundo;

    cronometro.display.textContent = cronometro.minuto + ":" + cronometro.segundo;
}

const esconderTelaInicial = () => {
    document.querySelector("#tempo-container").classList.add("hidden");
    document.querySelector("#iniciar").classList.add("hidden");

    document.querySelector("#cronometro-container").classList.remove("hidden");
    document.querySelector("#botao-inicio").classList.remove("hidden");
}

const mostrarTelaInicial = () => {
    document.querySelector("#tempo-container").classList.remove("hidden");
    document.querySelector("#iniciar").classList.remove("hidden");

    document.querySelector("#cronometro-container").classList.add("hidden");
    document.querySelector("#botao-inicio").classList.add("hidden");
}

const construirCheck = (nSessoes, sessoes) => {
    for (let i = 0; i < sessoes; i++) {
        nSessoes.innerHTML += `<div class="check" id="${i}"> </div>`;
    }
}


const voltar = () => {
    zerarValores();

    mostrarTelaInicial();

    document.querySelector("#play").classList.remove("hidden");
    document.querySelector("#pause").classList.add("hidden");

    document.querySelector("dialog").close();
    document.querySelector("#reiniciar").classList.add("hidden");
    document.querySelector("#continuar").classList.remove("hidden");
}

const play = () => {
    document.querySelector("#play").classList.add("hidden");
    document.querySelector("#pause").classList.remove("hidden");

    timer();
}

const pause = () => {
    document.querySelector("#play").classList.remove("hidden");
    document.querySelector("#pause").classList.add("hidden");

    clearInterval(cronometro.intervalo);
}


const zerarValores = () => {
    cronometro.tempo = 0;
    cronometro.sessao = -1;
    cronometro.display.textContent = "";

    document.querySelector('audio').load();
    localStorage.clear();

    document.querySelector('#identificador').textContent = "";
    document.querySelector('#identificador').classList.add('pausa');
    cronometro.display.classList.add('pausa');

    document.querySelectorAll(".check").forEach(check => check.remove());

    clearInterval(cronometro.intervalo);
}