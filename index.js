const stratButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const atividadeButton = document.getElementById("atividadeButton");
const descansoButton = document.getElementById("descansoButton");

var tempo = 1500;
var ultimoTempo = 1500;
var timerInterval;

// Função para atualizar o tempo
function atualizarTempo(novoTempo) {
  tempo = novoTempo;
  ultimoTempo = novoTempo;
  // Atualiza a exibição imediatamente
  atualizarDisplay();
}

// Função para atualizar a exibição
function atualizarDisplay() {
  var min = Math.floor(tempo / 60);
  var seg = tempo % 60;

  // Formata os números menores que dez
  if (min < 10) min = "0" + min;
  if (seg < 10) seg = "0" + seg;

  // Imprime as variáveis
  document.getElementById("minutes").textContent = min;
  document.getElementById("seconds").textContent = seg;

  stratButton.disabled = true;

  if (tempo <= 0) {
    pauseButton.disabled = true;
    atividadeButton.disabled = false;
    descansoButton.disabled = false;
  } else {
    pauseButton.disabled = false;
    atividadeButton.disabled = true;
    descansoButton.disabled = true;
  }
}

// Função do temporizador
function temporizador() {
  // Se o tempo não for zerado
  if (tempo >= 0) {
    atualizarDisplay(); // Atualiza a exibição
    tempo--; // Diminui o tempo
  } else {
    clearInterval(timerInterval); // Para o timer
  }
}

// Iniciar Timer
stratButton.addEventListener("click", function () {
  timerInterval = setInterval(temporizador, 1000);
  stratButton.disabled = true;
  resetButton.disabled = false;
  pauseButton.disabled = false;
  atividadeButton.disabled = true;
  descansoButton.disabled = true;
});

// Pausar o tempo
pauseButton.addEventListener("click", function () {
  clearInterval(timerInterval);
  stratButton.disabled = false;
  pauseButton.disabled = true;
  atividadeButton.disabled = true;
  descansoButton.disabled = true;
});

// Reset o tempo
resetButton.addEventListener("click", function () {
  clearInterval(timerInterval);
  tempo = ultimoTempo; // Reseta o tempo para 1500 segundos
  atualizarDisplay(); // Atualiza a exibição
  stratButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  atividadeButton.disabled = false;
  descansoButton.disabled = false;
});

// Atividade tempo
atividadeButton.addEventListener("click", function () {
  atualizarTempo(1500);
  clearInterval(timerInterval); // Para o timer antes de reiniciar
  stratButton.disabled = false; // Habilita o botão de iniciar
  pauseButton.disabled = true;
  resetButton.disabled = true;
  atividadeButton.disabled = true;
  descansoButton.disabled = false;
});

// Descanso tempo
descansoButton.addEventListener("click", function () {
  atualizarTempo(300);
  clearInterval(timerInterval); // Para o timer antes de reiniciar
  stratButton.disabled = false; // Habilita o botão de iniciar
  pauseButton.disabled = true;
  resetButton.disabled = true;
  atividadeButton.disabled = false;
  descansoButton.disabled = true;
});
