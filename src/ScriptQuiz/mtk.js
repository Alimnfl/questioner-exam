const questions = [
  {
    question: 'Hasil dari 5 + [6 : (–3)] adalah …',
    answers: [
      { text: '7', correct: false },
      { text: '4', correct: false },
      { text: '3', correct: true },
      { text: '-3', correct: false },
    ],
  },
  {
    question: 'Hasil dari 1 3/4 : 2 1/4 + 1 1/3 adalah…',
    answers: [
      { text: '2 1/18 ', correct: false },
      { text: '2 1/9 ', correct: true },
      { text: '2 2/3', correct: false },
      { text: '3 19/36', correct: false },
    ],
  },
  {
    question: 'Suatu pekerjaan apabila dilakukan oleh 6 orang dapat diselesaikan dalam 6 hari. Apabila pekerja ditambah 3 orang, maka pekerjaan tersebut dapat selesai dalam waktu…',
    answers: [
      { text: '5 Hari', correct: false },
      { text: '4 Hari', correct: true },
      { text: '3 Hari', correct: false },
      { text: '2 Hari', correct: false },
    ],
  },
  {
    question: 'Sebuah toko menjual satu lusin buku dengan harga Rp. 90.000,00. Uang yang harus dibayarkan Abdul jika membeli 15 buah buku tersebut adalah…',
    answers: [
      { text: 'Rp. 135.000,00', correct: false },
      { text: 'Rp. 125.000,00', correct: false },
      { text: 'Rp. 115.500,00', correct: false },
      { text: 'Rp. 112.500,00', correct: true },
    ],
  },
  {
    question: 'Hasil dari (36 pangkat 3/2) adalah … ',
    answers: [
      { text: '216', correct: true },
      { text: '108', correct: false },
      { text: '72', correct: false },
      { text: '48', correct: false },
    ],
  },
  {
    question: 'Hasil dari √14 x 3√7 adalah…',
    answers: [
      { text: '21√2 ', correct: true },
      { text: '28√3', correct: false },
      { text: '21√7', correct: false },
      { text: '28√7 ', correct: false },
    ],
  },
  {
    question: 'Dua suku berikutnya dari pola bilangan 3, 4, 6, 9, … adalah…',
    answers: [
      { text: '12, 15', correct: false },
      { text: '12, 16', correct: false },
      { text: '13, 17', correct: false },
      { text: '13, 18', correct: true },
    ],
  },
  {
    question: 'Suatu barisan aritmetika diketahui U6 = 18 dan U10 = 30. Jumlah 16 suku pertama adalah...',
    answers: [
      { text: '360', correct: false },
      { text: '408', correct: true },
      { text: '512', correct: false },
      { text: '896', correct: false },
    ],
  },
  {
    question: 'Bu Ani menabung uang Rp. 800.000,00. Dengan suku bunga tunggal 9% setahun. Tabungan saat diambil sebesar Rp. 920.000,00. Lama Bu Ani menabung adalah…  ',
    answers: [
      { text: '24 bulan', correct: false },
      { text: '22 bulan', correct: true },
      { text: '20 bulan', correct: false },
      { text: '18 bulan', correct: false },
    ],
  },
  {
    question: 'Pemfaktoran dari 49a pangkat 2 – 64b pangkat 2 adalah…  ',
    answers: [
      { text: '(7a + 4b)( 7a – 16b)', correct: false },
      { text: '(7a + 8b)( 7a + 8b)', correct: false },
      { text: '(7a – 16b)( 7a – 4b)', correct: false },
      { text: '(7a + 8b)( 7a – 8b)', correct: true },
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
