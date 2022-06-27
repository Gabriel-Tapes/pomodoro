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

const aumentar = (id) => {
    const inputTempo = document.getElementById(id);

    inputTempo.innerText = inputTempo.innerText < 100 ? parseInt(inputTempo.innerText) + 1 : inputTempo.innerText;
}

const diminuir = (id) => {
    const inputTempo = document.getElementById(id);

    inputTempo.innerText = inputTempo.innerText > 1 ? parseInt(inputTempo.innerText) - 1 : inputTempo.innerText;
}