const cronometro = {
        display: document.querySelector("cronometro"),
        vezes: 0,
        tempo: 0,
        minuto: 0,
        segundo: 0,
    };

const audio = document.querySelector("audio");

let idIntervalo, idChecked, sessao, identificador;

sessao = -1;
identificador = 0;

const aumentar = (id) => {
    const inputTempo = document.getElementById(id);

    inputTempo.innerText = inputTempo.innerText < 100 ? parseInt(inputTempo.innerText) + 1 : inputTempo.innerText;
}

const diminuir = (id) => {
    const inputTempo = document.getElementById(id);

    inputTempo.innerText = inputTempo.innerText > 1 ? parseInt(inputTempo.innerText) - 1 : inputTempo.innerText;
}

const construirCheck = (nSessoes, sessoes) => {
    for (let i = 0; i < sessoes; i++) {
        check = `<div class="check" id="${i}"> </div>`
        nSessoes.innerHTML += check;
    }
}

const abrirModal = () => {
    let mensagem = `
        Tempo de ${document.getElementById("identificador").textContent} Esgotado! Clique em Continuar para continuar ou em Terminar para voltar ao início.
    `;

    document.querySelector("#mensagem-modal").textContent = mensagem;
    document.querySelector("#modal").showModal();

    audio.volume = 0.2;
    audio.play();

    identificador = 1 ? identificador == 0 : 0;
}

const fecharModal = () => {
    document.querySelector("#modal").close();

    document.querySelector("#play").classList.remove("hidden");

    document.querySelector("#pause").classList.add("hidden");

    audio.load();

    alternar();
}

const reiniciar = () => {
    sessao = -1;

    document.querySelectorAll(".checkedTrabalho").forEach(el => el.parentNode.removeChild(el));

    iniciar();
    document.querySelector("dialog").close();

    document.getElementById("reiniciar").classList.add("hidden");
    document.getElementById("continuar").classList.remove("hidden");
}

const fimPomodoro = () => {
    let mensagem = `Tempo esgotado! Clique em Terminar para voltar ao início ou em Reiniciar para reiniciar`;

    document.querySelector("#reiniciar").classList.remove("hidden");

    document.querySelector("#continuar").classList.add("hidden");

    document.querySelector("#mensagem-modal").textContent = mensagem;

    document.querySelector("dialog").showModal();
}

const timer = () => {
    idIntervalo = setInterval(() => {
        cronometro.minuto = parseInt(cronometro.tempo / 60, 10);
        cronometro.segundo = parseInt(cronometro.tempo % 60, 10);

        cronometro.minuto = cronometro.minuto < 10 ? "0" + cronometro.minuto : cronometro.minuto;
        cronometro.segundo = cronometro.segundo < 10 ? "0" + cronometro.segundo : cronometro.segundo;

        cronometro.display.textContent = cronometro.minuto + ":" + cronometro.segundo;

        if (--cronometro.tempo === -2) {
            clearInterval(idIntervalo);
            abrirModal();
        }
    }, 1000);
}

const pausa = () => {
    const pausa = parseInt(document.getElementById("pausa").innerText);
    cronometro.tempo = pausa * 60;

    cronometro.display.classList.add("pausa");

    document.querySelector('#identificador').classList.add("pausa");
    document.querySelector('#identificador').textContent = "Pausa";

    document.querySelectorAll('.checkedTrabalho').forEach(el => el.classList.add('checkedPausa'));

    construirTimer();
}

const trabalho = () => {
    const trabalho = parseInt(document.getElementById("trabalho").innerText);
    cronometro.tempo = trabalho * 60;

    if (++sessao >= cronometro.vezes) {
        fimPomodoro();
    } else {
        cronometro.display.classList.remove("pausa");

        document.querySelector("#identificador").classList.remove("pausa");
        document.querySelector("#identificador").textContent = "Estudo";

        document.getElementById(sessao).classList.add("checkedTrabalho");

        document.querySelectorAll(".checkedTrabalho").forEach(el => el.classList.remove('checkedPausa'));


        construirTimer();
    }
}

const alternar = () => {
    if (identificador) pausa();
    else trabalho();
}
const play = () => {
    document.querySelector("#play").classList.add("hidden");
    document.querySelector("#pause").classList.remove("hidden");

    timer();
}

const pause = () => {
    document.querySelector("#play").classList.remove("hidden");
    document.querySelector("#pause").classList.add("hidden");

    clearInterval(idIntervalo);
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
    document.querySelector("#cronometro-container").classList.remove("hidden");
    document.querySelector("#botao-inicio").classList.remove("hidden");
    document.querySelector("#iniciar").classList.add("hidden");
}

const mostrarTelaInicial = () => {
    document.querySelector("#tempo-container").classList.remove("hidden");
    document.querySelector("#cronometro-container").classList.add("hidden");
    document.querySelector("#botao-inicio").classList.add("hidden");
    document.querySelector("#iniciar").classList.remove("hidden");
}

const iniciar = () => {
    const sessoes = parseInt(document.querySelector("#sessoes").innerText);
    const nSessoes = document.querySelector("#n-sessoes");
    cronometro.vezes = parseInt(document.querySelector("#sessoes").innerText);

    esconderTelaInicial();
    construirCheck(nSessoes, sessoes);
    alternar();
}
const zerarValores = () => {
    cronometro.tempo = 0;
    identificador = 0;
    sessao = -1;
    audio.load();
}


const voltar = () => {
    zerarValores();

    mostrarTelaInicial();

    document.querySelectorAll(".check").forEach(check => check.remove());

    clearInterval(idIntervalo);
    cronometro.display.textContent = "";

    document.querySelector("#play").classList.remove("hidden");
    document.querySelector("#pause").classList.add("hidden");

    document.querySelector("dialog").close();
    document.querySelector("#reiniciar").classList.add("hidden");
    document.querySelector("#continuar").classList.remove("hidden");
}

const verifica = (elemento) => {
    const padrao = {
        trabalho: 25,
        pausa: 5,
        sessoes: 3
    }
    let valor = parseInt(elemento.innerText);

    if (valor < 1) {
        elemento.innerText = 1;
    } else if (isNaN(valor)) {
        elemento.innerText = padrao[elemento.id];
    } else if (elemento.innerText > 100) {
        elemento.innerText = 100;
    }
}
