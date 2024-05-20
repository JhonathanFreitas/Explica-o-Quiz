// Importa o array de perguntas do arquivo questions.js
import questions from "./questions.js";

// Função para embaralhar as perguntas no array
function shuffleArray(array) {
  // Loop para percorrer o array de trás para frente
  for (let i = array.length - 1; i > 0; i--) {
    // Gera um índice aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Troca os elementos de posição
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Seleciona elementos do DOM
const question = document.querySelector(".question"); // Elemento para exibir a pergunta
const answers = document.querySelector(".answers"); // Elemento para exibir as respostas
const spnQtd = document.querySelector(".spnQtd"); // Elemento para exibir a quantidade de perguntas
const textFinish = document.querySelector(".finish span"); // Elemento para exibir o texto de finalização
const content = document.querySelector(".content"); // Elemento do conteúdo principal
const contentFinish = document.querySelector(".finish"); // Elemento do conteúdo de finalização
const btnRestart = document.querySelector(".finish button"); // Botão para reiniciar o quiz

// Variáveis para controlar o estado do quiz
let currentIndex = 0; // Índice da pergunta atual
let questionsCorrect = 0; // Contador de respostas corretas

// Função para carregar uma pergunta
function loadQuestion() {
  const item = questions[currentIndex]; // Obtém a pergunta atual
  question.innerHTML = item.question; // Define o texto da pergunta
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`; // Atualiza o contador de perguntas
  answers.innerHTML = ""; // Limpa as respostas anteriores

  // Gera os botões de resposta
  item.answers.forEach(answer => {
    const button = document.createElement("button"); // Cria um botão para cada resposta
    button.className = "answer"; // Adiciona a classe "answer" ao botão
    button.dataset.correct = answer.correct; // Define se a resposta está correta
    button.textContent = answer.option; // Define o texto do botão
    button.onclick = nextQuestion; // Define a função a ser chamada ao clicar no botão
    answers.appendChild(button); // Adiciona o botão ao elemento de respostas
  });
}

// Função para avançar para a próxima pergunta ou terminar o quiz
function nextQuestion(event) {
  if (event.target.dataset.correct === "true") {
    questionsCorrect++; // Incrementa o contador de respostas corretas se a resposta estiver correta
  }
  currentIndex++; // Incrementa o índice da pergunta atual
  if (currentIndex < questions.length) {
    loadQuestion(); // Carrega a próxima pergunta se ainda houver perguntas
  } else {
    finish(); // Termina o quiz se não houver mais perguntas
  }
}

// Função para finalizar o quiz
function finish() {
  textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}`; // Exibe o número de respostas corretas
  content.style.display = "none"; // Oculta o conteúdo principal
  contentFinish.style.display = "flex"; // Exibe o conteúdo de finalização
}

// Função para reiniciar o quiz
btnRestart.onclick = () => {
  shuffleArray(questions); // Embaralha as perguntas
  currentIndex = 0; // Reseta o índice da pergunta atual
  questionsCorrect = 0; // Reseta o contador de respostas corretas
  content.style.display = "flex"; // Exibe o conteúdo principal
  contentFinish.style.display = "none"; // Oculta o conteúdo de finalização
  loadQuestion(); // Carrega a primeira pergunta
};

// Carrega a primeira pergunta ao iniciar o quiz
shuffleArray(questions); // Embaralha as perguntas na carga inicial
loadQuestion(); // Carrega a primeira pergunta
