const questions = [
  {
    question: 'Norma merupakan pedoman hidup untuk…',
    answers: [
      { text: 'Bertingkah laku', correct: true },
      { text: 'Memberi sanksi', correct: false },
      { text: 'Memberi kaidah', correct: false },
      { text: 'Memaksa', correct: false },
    ],
  },
  {
    question: 'Petunjuk hidup yang berasal dari hati nurani adalah norma…',
    answers: [
      { text: 'Agama', correct: false },
      { text: 'Hukum', correct: false },
      { text: 'kesusilaan', correct: true },
      { text: 'Kesopanan', correct: false },
    ],
  },
  {
    question: 'Norma hukum bersifat memaksa agar…',
    answers: [
      { text: 'Masyarakat merasa takut terhadap hukum', correct: false },
      { text: 'Menjadi pedoman hidup bermasyarakat', correct: false },
      { text: 'Lembaga hukum memiliki kewibawaan', correct: false },
      { text: 'Dipatuhi oleh setiap warga negara', correct: true },
    ],
  },
  {
    question: 'Berdasarkan tata hukum di Indonesia, jenis hukum yang dikelompokkan berdasarkan isinya adalah…',
    answers: [
      { text: 'Hukum traktat dan yurisprudensi', correct: false },
      { text: 'Hukum publik dan hukum privat', correct: true },
      { text: 'Hukum waris dan perdata', correct: false },
      { text: 'Hukum tata negara dan pidana', correct: false },
    ],
  },
  {
    question: 'Perilaku yang harus kamu hindari agar tidak melanggar hukum adalah…',
    answers: [
      { text: 'Memahami kepentingan orang lain', correct: false },
      { text: 'Menjunjung tinggi aturan yang berlaku', correct: false },
      { text: 'Menggunakan helm saat ada polisi', correct: true },
      { text: 'Mendahulukan kewajiban daripada hak', correct: false },
    ],
  },
];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const backButton = document.getElementById('backto-dashboard');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  backButton.style.display = 'none';
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }
  //   Memberi dan block pada button
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
  backButton.style.display = 'none';
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function backToDashboard() {
  window.location.href = '/index.html';
}

backButton.addEventListener('click', function () {
  backToDashboard();
});

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = 'Play Again?';
  backButton.innerHTML = 'Back to Dashboard';
  nextButton.style.display = 'Block';
  backButton.style.display = 'Block';
}

startQuiz();
