const cronometro = {
    display: document.getElementById("cronometro"),
    vezes: 0,
    tempo: 0,
    minuto: 0,
    segundo: 0,
};
let idIntervalo, idChecked, sessao;
sessao = -1;
let identificador = 0;

const aumentar = (id) => {
    let inputTempo = parseInt(document.getElementById(id).innerText);

    if (id == "sessoes" && inputTempo === 50) {
        document.getElementById(id).innerText = inputTempo;
    } else {
        document.getElementById(id).innerText = inputTempo + 1;
    }

}

const diminuir = (id) => {
    let inputTempo = document.getElementById(id).innerText;
    if (inputTempo > 1) {
        inputTempo = parseInt(inputTempo) - 1;
    }
    document.getElementById(id).innerText = inputTempo;
}

const construirCheck = (nSessoes, sessoes) => {
    nSessoes.innerHTML = "";
    for (let i = 0; i < sessoes; i++) {
        check = `<div id="${i}"> </div>`
        nSessoes.innerHTML += check;
    }
}

const timer = () => {
    idIntervalo = setInterval(() => {
        cronometro.minuto = parseInt(cronometro.tempo / 60, 10);
        cronometro.segundo = parseInt(cronometro.tempo % 60, 10);

        cronometro.minuto = cronometro.minuto < 10 ? "0" + cronometro.minuto : cronometro.minuto;
        cronometro.segundo = cronometro.segundo < 10 ? "0" + cronometro.segundo : cronometro.segundo;

        cronometro.display.textContent = cronometro.minuto + ":" + cronometro.segundo;

        if (--cronometro.tempo === -2) {
            alert("Tempo esgotado!");
            identificador = 1 ? identificador == 0 : 0;
            document.getElementById("play").classList.remove("hidden");
            document.getElementById("pause").classList.add("hidden");
            iniciar();
            clearInterval(idIntervalo);
        }
    }, 1000);
}

const pausa = () => {
    const pausa = parseInt(document.getElementById("pausa").innerText);
    cronometro.tempo = pausa * 60;
    cronometro.display.classList.add("pausa");
    document.getElementById(sessao).classList.remove("checkedTrabalho");
    document.getElementById(sessao).classList.add("chekedPausa");
    document.getElementById("identificador").textContent = "Pausa";
    document.getElementById("identificador").classList.add("pausa");
    document.getElementById("identificador").classList.remove("trabalho");

    construirTimer(cronometro.tempo);
}

const trabalho = () => {
    const trabalho = parseInt(document.getElementById("trabalho").innerText);
    cronometro.tempo = trabalho * 60;
    if (++sessao >= cronometro.vezes) {
        alert("Terminado! Clique em Ok para voltar ao início.");
        clearInterval(idIntervalo);
        voltar();
    } else {
        cronometro.display.classList.remove("pausa");
        document.getElementById(sessao).classList.remove("checkedPausa");
        document.getElementById(sessao).classList.add("chekedTrabalho");
        document.getElementById("identificador").textContent = "Estudo";
        document.getElementById("identificador").classList.add("trabalho");
        document.getElementById("identificador").classList.remove("pausa");
        construirTimer();
    }
}

const alternar = () => {
    if (identificador) {
        pausa();
    } else {
        trabalho();
    }
}

const play = () => {
    document.getElementById("play").classList.add("hidden");
    document.getElementById("pause").classList.remove("hidden");

    timer();
}

const pause = () => {
    document.getElementById("play").classList.remove("hidden");
    document.getElementById("pause").classList.add("hidden");

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
    document.getElementById("tempo-container").classList.add("hidden");
    document.getElementById("cronometro-container").classList.remove("hidden");
    document.getElementById("botao-inicio").classList.remove("hidden");
    document.getElementById("iniciar").classList.add("hidden");
}

const mostrarTelaInicial = () => {
    document.getElementById("tempo-container").classList.remove("hidden");
    document.getElementById("cronometro-container").classList.add("hidden");
    document.getElementById("botao-inicio").classList.add("hidden");
    document.getElementById("iniciar").classList.remove("hidden");
}

const iniciar = () => {
    const sessoes = parseInt(document.getElementById("sessoes").innerText);
    const nSessoes = document.getElementById("n-sessoes");
    cronometro.vezes = parseInt(document.getElementById("sessoes").innerText);

    esconderTelaInicial();
    construirCheck(nSessoes, sessoes);
    alternar();
}

const voltar = () => {
    cronometro.tempo = 0;
    identificador = 0;
    sessao = -1;

    mostrarTelaInicial();

    for (let i = 0; i < cronometro.vezes; i++) {
        document.getElementById(i).remove();
    }
    clearInterval(idIntervalo);
    cronometro.display.textContent = "";

    document.getElementById("play").classList.remove("hidden");
    document.getElementById("pause").classList.add("hidden");
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
    } else if (elemento.id == "sessoes" && valor > 50) {
        elemento.innerText = 50;
    } else if (elemento.innerText > 1000) {
        elemento.innerText = 1000;
    }
}