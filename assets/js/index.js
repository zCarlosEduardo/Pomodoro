const atividadeButton = document.getElementById("atividadeButton");
const descansoButton = document.getElementById("descansoButton");
const iniciarButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");

const tempoInicial = 1500; // Tempo de ativiade

var tempo = tempoInicial;
var ultimoTempo = tempoInicial;
var timerInterval;

const tempoAtividade = tempoInicial;
const tempoDescanso = 300; // Tempo de descanso

// Função para atualizar o tempo
function atualizarTempo(novoTempo) {
  tempo = novoTempo;
  ultimoTempo = novoTempo;
  // A o mudar o tempo ele atualiza o display imediatamente
  atualizarDisplay();
}

// Função para atualizar a exibição
function atualizarDisplay() {
  // Formata os números
  var min = Math.floor(tempo / 60);
  var seg = tempo % 60;

  if (min < 10) min = "0" + min;
  if (seg < 10) seg = "0" + seg;

  // Imprime as variáveis
  document.getElementById("minutos").textContent = min;
  document.getElementById("segundos").textContent = seg;

  // Configurando as ações dos botões
  iniciarButton.disabled = true;

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
  if (tempo >= 0) {
    atualizarDisplay();
    tempo--;
  } else {
    clearInterval(timerInterval);
    // Para o timer com o tempo
  }
}

// Habilitando e desabilitando botões

// Atividade
atividadeButton.addEventListener("click", function () {
  // Atualiza o tempo e para o timer.
  atualizarTempo(tempoAtividade);
  clearInterval(timerInterval);

  // Ações
  atividadeButton.disabled = true;
  descansoButton.disabled = false;
  iniciarButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
});

// Descanso
descansoButton.addEventListener("click", function () {
  atualizarTempo(tempoDescanso);
  clearInterval(timerInterval);

  // Ações
  atividadeButton.disabled = false;
  descansoButton.disabled = true;
  iniciarButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
});

// Iniciar
iniciarButton.addEventListener("click", function () {
  // Começa o temporizador
  timerInterval = setInterval(temporizador, 1000);

  // Ações
  atividadeButton.disabled = true;
  descansoButton.disabled = true;
  iniciarButton.disabled = true;
  resetButton.disabled = false;
  pauseButton.disabled = false;
});

// Pausar
pauseButton.addEventListener("click", function () {
  clearInterval(timerInterval);

  // Ações
  atividadeButton.disabled = true;
  descansoButton.disabled = true;
  iniciarButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = false;
});

// Reiniciar
resetButton.addEventListener("click", function () {
  clearInterval(timerInterval);
  tempo = ultimoTempo;
  atualizarDisplay();

  // Ações
  if (ultimoTempo == tempoAtividade) {
    atividadeButton.disabled = true;
    descansoButton.disabled = false;
  } else if (ultimoTempo == tempoDescanso) {
    atividadeButton.disabled = false;
    descansoButton.disabled = true;
  } else {
    alert("Erro critico ao selecioar o tempo, erro: 001");
  }

  iniciarButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
});
