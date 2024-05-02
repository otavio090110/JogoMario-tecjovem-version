const mario = document.querySelector('.mario')
const tubo = document.querySelector('.tubo')
const inimigo = document.getElementById('inimigo')
const bloco = document.getElementById('bloco')
const moedas = document.getElementById('moedas')
const pontos = document.getElementById('pontos')
const vidas = document.getElementById('vidas')
const tempo = document.getElementById("tempo");
const botaoReiniciar = document.getElementById("reiniciar")
const botaoIniciar = document.getElementById("iniciar")
const audioJogoNormal = document.getElementById("audioJogoNormal");
const audioPulo = document.getElementById("jump");
const audioMoeda = document.getElementById("moeda");
const audioVidaExtra = document.getElementById("audioVidaExtra");
const audioLevouDano = document.getElementById("levou_dano");
const audioGameOver = document.getElementById("game_over");
const audioMissaoNormal = document.getElementById("missao_normal");
const audioTempoAcabando = document.getElementById("audioTempoAcabando");

let vidasAtual = 5
let moedasAtual = 0
let pontosAtual = 0
let tempoAtual =  400
let checarRelogio

const jump = () => {
    mario.classList.add('jump')

    audioPulo.play()

    setTimeout(() => {

        mario.classList.remove('jump')

    }, 500)
}


const loop = setInterval(() => {

    const tuboPosition = tubo.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (tuboPosition <= 120 && tuboPosition > 0 && marioPosition < 80) {
        vidasAtual -= 5
        vidas.textContent = vidasAtual 
        localStorage.setItem("vidas", vidasAtual)
        audioMissaoNormal.pause()
        audioGameOver.play(0,2000)
        tubo.style.animation = 'none'
        tubo.style.left = `${tuboPosition}px`
        botaoReiniciar.style.display = "block";


        mario.style.animation = 'none'
        mario.style.bottom = `${marioPosition}px`
        mario.src = "images - Copia/images - Copia/game-over.png"
        mario.style.width = '75px'
        mario.style.marginLeft = '50px'

        clearInterval(loop);
    }
}, 10)

function colisaoComBloco() {

    const checarMario = mario.getBoundingClientRect()
    const checarBloco = bloco.getBoundingClientRect()

    if (
        checarBloco.left < checarMario.right &&
        checarBloco.right > checarMario.left &&
        checarBloco.top < checarMario.bottom &&
        checarBloco.bottom > checarMario.top
    ) {
        clearInterval(checarColisaoComBloco)
        audioMoeda.play()
        moedasAtual++
        moedas.textContent = moedasAtual;
        pontosAtual += +10
        pontos.textContent = pontosAtual
        localStorage.setItem("pontos", pontosAtual);
        localStorage.setItem("vidas", vidasAtual);
        localStorage.setItem("moedas", moedasAtual);
        checarMoedas();
        setTimeout(() => {
            checarColisaoComBloco = setInterval(colisaoComBloco, 10)
        }, 500)

    }
}


function colisaoComInimigo() {

    const checarMario = mario.getBoundingClientRect()
    const checarInimigo = inimigo.getBoundingClientRect()

    if (checarInimigo.left < checarMario.right) {
        clearInterval(checarColisaoComInimigo)
        audioLevouDano.play()    
        mario.classList.toggle('mariodano')
        moedasAtual--
        moedas.textContent = moedasAtual;
        pontosAtual -=-10
        pontos.textContent = pontosAtual
        localStorage.setItem("vidasAtual", vidasAtual);
        checarMoedas();
        setTimeout(() => {
            checarColisaoComInimigo = setInterval(colisaoComInimigo, 10)
        },1000)
}}

botaoReiniciar.addEventListener("click", function () {
    moedasAtual = 0;
    moedas.textContent = moedasAtual;
    localStorage.setItem("moedasAtual", moedasAtual);
    pontosAtual = 0;
    pontos.textContent = pontosAtual;
    localStorage.setItem("pontosAtual", pontosAtual);
    vidasAtual = 5;
    vidas.textContent = vidasAtual;
    localStorage.setItem("vidasAtual", vidasAtual);
    location.reload();
})

function checarMoedas() {
    if (moedasAtual === 5) {
        moedasAtual = 0;
        moedas.textContent = moedasAtual;
        localStorage.setItem("moedas", moedasAtual);
        vidasAtual++;
        vidas.textContent = vidasAtual
        audioVidaExtra.play();
    }
}


function relogio() {
    tempoAtual--;
    tempo.textContent = tempoAtual;
    if (tempoAtual === 100) {
        audioJogoNormal.volume = 0.5;
        audioTempoAcabando.play();
        setTimeout(() =>{
            audioJogoNormal.volume = 0;
            audioTempoAcabando.volume = 0;
            audioMissaoRapido.play();
        }, 3000);

    } else if (tempoAtual === 0) {
        removerTeclas();
        clearInterval(checarRelogio);
        inimigo.style.display = "none";
        audioEsperando.pause();
        audioJogoNormal.pause();
        audioMissaoRapido.pause();
        audioGameOver.play();
        botaoReiniciar.style.display = "block";
    }
}

function checarJogo() {
    if (vidasAtual >= 1) {
        location.reload();
    } else {
        botaoReiniciar.style.display = "block";
        audioEsperando.pause();
        audioJogoNormal.pause();
        audioMissaoRapido.pause();
        audioGameOver.play();
    }
}




checarColisaoComBloco = setInterval(colisaoComBloco, 10)
checarColisaoComInimigo = setInterval(colisaoComInimigo, 10)
checarRelogio = setInterval(relogio, 1000)
// document.addEventListener('keydown', jump)
document.addEventListener('keydown', (e) => {
    if ((e.code === "ArrowUp") | (e.code === "Space")) {
        jump()
    }
});
botaoIniciar.addEventListener('click', () => {
    
})



