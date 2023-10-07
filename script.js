//buscando a tag html do documento pela tag
const html = document.querySelector("html");
//buscando o botão foco do documento pela classe
const focoBt = document.querySelector(".app__card-button--foco");
//buscando o botão descanso curto do documento pela classe
const curtoBt = document.querySelector(".app__card-button--curto");
//buscando o botão descanso longo do documento pela classe
const longoBt = document.querySelector(".app__card-button--longo");
//buscando a imagem de funto do documento pela classe
const banner = document.querySelector(".app__image");
//buscando o texto do título do documento pela classe
const titulo = document.querySelector(".app__title");
//fazendo uma lista dos botoes do documento para aplicar um forEach (alteração em toda a lista)
const botoes = document.querySelectorAll(".app__card-button");
//buscando o botão começar no html
const startPauseBt = document.querySelector("#start-pause");
//buscando o local (div) onde iremos inserir o temporizador
const tempoNaTela = document.querySelector("#timer");
//buscando a imagem do botão começar/pausar
const imagemStartPauseBt = document.querySelector(".app__card-primary-butto-icon");
//buscando o texto do botão começar/pausar
const iniciarOuPausarBt = document.querySelector("#start-pause span");

//buscando o input de ativação da música
const musicaFocoInput = document.querySelector("#alternar-musica");
//inserindo o elemento audio no JS
const musica = new Audio("/sons/luna-rise-part-one.mp3");

//buscandos os elementos de som para pusar, dar play e quando o temporizador acaba
const somPause = new Audio("/sons/pause.mp3");
const somPlay = new Audio("/sons/play.wav");
const somBeep = new Audio ("sons/beep.mp3");



//criando uma variável dinâmica para o tempo do temporizador
let tempoDecorridoEmSegundos = 1500;
//criando uma variável para fazer a contagem regressiva automaticamente
let intervaloId = null;

//incluindo um loop na música do documento, para ela tocar além dos minutos que tem
musica.loop = true;

//adicionaod um evento ao input
musicaFocoInput.addEventListener("change", () => {
    //utilizando uma condicional para musica tocar ou pausar
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

//adicionando eventos ao click do botão utilizando uma aero function
focoBt.addEventListener("click", () => {
    //definição do tempo inicial do temporizador
    tempoDecorridoEmSegundos = 1500;
    //rodar a função alterar contexto
    alterarContexto("foco");
    //adicionando classe de botão ativo
    focoBt.classList.add("active");

})

//adicionando eventos ao click do botão utilizando uma aero function
curtoBt.addEventListener("click", () => {
    //definição do tempo inicial do temporizador
    tempoDecorridoEmSegundos = 300;
    //rodar a função alterar contexto
    alterarContexto("descanso-curto");
    //adicionando classe de botão ativo
    curtoBt.classList.add("active");

})

//adicionando eventos ao click do botão utilizando uma aero function
longoBt.addEventListener("click", () => {
    //definição do tempo inicial do temporizador
    tempoDecorridoEmSegundos = 900;
    //rodar a função alterar contexto
    alterarContexto("descanso-longo");
    //adicionando classe de botão ativo
    longoBt.classList.add("active");

})

//criando a função alterar contexto
function alterarContexto (contexto) {
    //chamamos a função mostrarTempo para garantir que o tempo vai ser alterado em cada mudança de contexto(clique)
    mostrarTempo();
    //utilizando o forEach para percorrer toda a lista de botoes e exevutar uma funçãp
    botoes.forEach(function (target) {
        //criando uma função para remover a classe "active" de todos os botoes
        target.classList.remove("active");
    })

    //chamando o elemento "html" e selecionando o parâmetro "contexto" da propriedade "data-contexto"
    html.setAttribute("data-contexto", contexto);
    //chamando o elemento "banner" e selecionando o parâmetro "contexto" da propriedade "src"
    banner.setAttribute("src", `/imagens/${contexto}.png`);
    //criando uma função switch para criar uma condição para aplicar ou não um inner.HTML específico para cada case (case)
    switch (contexto) {
        //leitura do switch: Se o parâmetro for foco, então.  Se não, break. 
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`


            break;
             //Se for descanso-curto, então. Se não, break.
        case "descanso-curto":
                titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `
            break;
            //Se for descanso-longo, então. Se não, break.    
        case "descanso-longo": 
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `

        default:
            //se nenhum dos parâmetros for cumprido, então break.
            break;
    }
}

//criando uma constante para decrementar o tempo decorrido do temporizador
const contagemRegressiva = () => {
    //criando uma condicional, somente se o tempo estiver zerado iremos começar
    if (tempoDecorridoEmSegundos <= 0) {
        //inserindo o som do play
        somBeep.play();
        //iniciando o cronômetro do zero
        zerar();
        return;
    }
    //decrementando 1 no valor do temporizador
    tempoDecorridoEmSegundos -= 1;
    //chamando a função mostrar tempo, para ela mostra a contagemRegressiva
    mostrarTempo();
    


}



//adicionando um evento no botão COMEÇAR para ele rodar a função contagemRegressiva
startPauseBt.addEventListener("click", iniciarOuPausar);

//criando uma função para a contagem regressiva ser feita automaticamente
function iniciarOuPausar () {
    if(intervaloId) {
        zerar();
        somPause.play();
        iniciarOuPausarBt.textContent = "Começar";
        imagemStartPauseBt.setAttribute("src", "/imagens/play_arrow.png")
        return;
    }
    //atribuindo a variável intervaloID a propriedade setInterval, que recebe dois parâmetros: função que irá acontecer tempo em milisegundos - 1000 milisegundos = 1 segundo
    intervaloId = setInterval(contagemRegressiva, 1000)
    somPlay.play();
    iniciarOuPausarBt.textContent = "Pausar";
    imagemStartPauseBt.setAttribute("src", "/imagens/pause.png")
}

//criada para zerar a contagem do temporizador
function zerar() {
    //a propriedade clearInterval interrompe a execução de um código
    clearInterval(intervaloId);
    //aqui estou voltando o elemento intervaloID para o seu valor inicial
    intervaloId = null;
}

//criada para mostrar o tempo na tela
function mostrarTempo () {
    //utilizamos aqui o objeto Date para ajudar a formatar o tempo do temporizador que é em milisegundos
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    //aqui usamos a propriedade toLocaleTimeString do objeto DATE para definir as propriedades de exibição do tempo
    const tempoFormatado = tempo.toLocaleTimeString("pt-br", {minute: "2-digit", second: "2-digit"});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

//chamando a função mostrar tempo no escopo global para o valor do temporizador já ser exibido na página
mostrarTempo();