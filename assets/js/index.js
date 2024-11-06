const atividadeButton = document.getElementById("atividadeButton");
const descansoButton = document.getElementById("descansoButton");
const iniciarButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");

// Função para definir os estados dos botões
function atividadesBotoes(atividade, descanso, iniciar, pause, reset) {
  atividadeButton.disabled = atividade;
  descansoButton.disabled = descanso;
  iniciarButton.disabled = iniciar;
  pauseButton.disabled = pause;
  resetButton.disabled = reset;
}

const tempoInicial = 1500; // Tempo de atividade
let tempo = tempoInicial;
let ultimoTempo = tempoInicial;
let timerInterval;

const tempoAtividade = tempoInicial;
const tempoDescanso = 300; // Tempo de descanso

// Função para atualizar o tempo
function atualizarTempo(novoTempo) {
  tempo = novoTempo;
  ultimoTempo = novoTempo;
  atualizarDisplay(); // Atualiza o display imediatamente
}

// Função para atualizar a exibição
function atualizarDisplay() {
  let min = Math.floor(tempo / 60);
  let seg = tempo % 60;

  if (min < 10) min = "0" + min;
  if (seg < 10) seg = "0" + seg;

  document.getElementById("minutos").textContent = min;
  document.getElementById("segundos").textContent = seg;

  iniciarButton.disabled = true;
  if (tempo <= 0) {
    atividadesBotoes(false, false, true, true, true);
  } else {
    atividadesBotoes(true, true, true, false, true);
  }
}

// Função do temporizador
function temporizador() {
  if (tempo >= 0) {
    atualizarDisplay();
    tempo--;
  } else {
    clearInterval(timerInterval);
  }
}

// Atividade
atividadeButton.addEventListener("click", function () {
  atualizarTempo(tempoAtividade);
  clearInterval(timerInterval);
  atividadesBotoes(true, false, false, true, true);
});

// Descanso
descansoButton.addEventListener("click", function () {
  atualizarTempo(tempoDescanso);
  clearInterval(timerInterval);
  atividadesBotoes(false, true, false, true, true);
});

// Iniciar
iniciarButton.addEventListener("click", function () {
  atividadesBotoes(true, true, true, false, true);
  setTimeout(function() {
    timerInterval = setInterval(temporizador, 1000);});
});

// Pausar
pauseButton.addEventListener("click", function () {
  clearInterval(timerInterval);
  atividadesBotoes(true, true, false, true, false);
});

// Reiniciar
resetButton.addEventListener("click", function () {
  clearInterval(timerInterval);
  tempo = ultimoTempo;
  atualizarDisplay();

  if (ultimoTempo === tempoAtividade) {
    atividadesBotoes(true, false, false, true, true);
  } else if (ultimoTempo === tempoDescanso) {
    atividadesBotoes(false, true, false, true, true);
  } else {
    alert("Erro crítico ao selecionar o tempo, código de erro: 001. Verifique as variáveis de tempo.");
  }

  iniciarButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
});
