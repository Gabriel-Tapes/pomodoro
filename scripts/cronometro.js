const cronometro = {
    display: document.querySelector("#cronometro"),
    repeticoes: 0,
    tempo: 0,
    minuto: 0,
    segundo: 0,
    intervalo: 0,
    sessao: -1
};

const timer = () => {
    cronometro.intervalo = setInterval(() => {
        atualizarTimer();

        if (--cronometro.tempo === -2) {
            clearInterval(cronometro.intervalo);
            
            localStorage.identificador = localStorage.identificador == 1 ? 0 : 1;

            abrirModal();
        }
    }, 1000);
}

const alternar = () => {
    if (parseInt(localStorage.identificador)) pausa();
    else estudo();

const pausa = () => {
    cronometro.tempo = parseInt(document.getElementById("pausa").innerText) * 60;

    AlternaIdentificadorEntreEstudoEPausa('Pausa');
    construirTimer();
}

const estudo = () => {
    cronometro.tempo = parseInt(document.getElementById("estudo").innerText) * 60;

    if (++cronometro.sessao >= cronometro.repeticoes) {
        fimPomodoro();
    } else {
        document.getElementById(cronometro.sessao).classList.add("checkedEstudo", "checkedPausa");
        AlternaIdentificadorEntreEstudoEPausa('Estudo');
        construirTimer();
    }
}
}

const AlternaIdentificadorEntreEstudoEPausa = () => {
    const identificador = document.querySelector('#identificador');
    cronometro.display.classList.toggle("pausa");
    
    document.querySelector('#identificador').classList.toggle("pausa");
    identificador.textContent = identificador.textContent === 'Estudo' ? 'Pausa' : 'Estudo'
    
    document.querySelectorAll('.checkedEstudo').forEach(el => el.classList.toggle('checkedPausa'));
}

const atualizarTimer = () {
    cronometro.minuto = parseInt(cronometro.tempo / 60, 10);
    cronometro.segundo = parseInt(cronometro.tempo % 60, 10);

    cronometro.minuto = cronometro.minuto < 10 ? "0" + cronometro.minuto : cronometro.minuto;
    cronometro.segundo = cronometro.segundo < 10 ? "0" + cronometro.segundo : cronometro.segundo;

    cronometro.display.textContent = cronometro.minuto + ":" + cronometro.segundo;
}