const questions = [
  {
    question: 'Perkembangbiakan tumbuhan secara tidak kawin dengan bantuan manusia disebut perkembangbiakan…',
    answers: [
      { text: 'Generatif', correct: false },
      { text: 'Vegetatif Buatan', correct: false },
      { text: 'Vegetatif Alami', correct: true },
      { text: 'Aseksual Alami', correct: false },
    ],
  },
  {
    question: 'Hasil akhir dari proses oogenesis adalah….',
    answers: [
      { text: 'Melindungi embrio dari guncangan', correct: true },
      { text: 'Melindungi embrio dari guncangan', correct: false },
      { text: 'Memberi makan dan oksigen pada embrio', correct: false },
      { text: 'Melindungi ibu hamil', correct: false },
    ],
  },
  {
    question: 'Fungsi dari amnion adalah …',
    answers: [
      { text: 'Masyarakat merasa takut terhadap hukum', correct: false },
      { text: 'Menjadi pedoman hidup bermasyarakat', correct: false },
      { text: 'Lembaga hukum memiliki kewibawaan', correct: false },
      { text: 'Dipatuhi oleh setiap warga negara', correct: true },
    ],
  },
  {
    question: 'Hormon yang paling aktif sejak awal proses menstruasi pada wanita dewasa adalah hormon…',
    answers: [
      { text: 'Estrogen', correct: false },
      { text: 'Progesteron', correct: false },
      { text: 'FSH', correct: true },
      { text: 'Gonadotropin', correct: false },
    ],
  },
  {
    question: 'Berikut ini penyakit pada sistem reproduksi yang dapat mengakibatkan menurunnya sistem kekebalan tubuh seseorang adalah…',
    answers: [
      { text: 'AIDS', correct: true },
      { text: 'Herpes', correct: false },
      { text: 'Gonore', correct: false },
      { text: 'Sifilis', correct: false },
    ],
  },
  {
    question: 'Jika termometer Celsius menunjukkan angka 50°C maka termometer Reamur menunjukkan...',
    answers: [
      { text: '100°R', correct: false },
      { text: '60°R', correct: false },
      { text: '40°R', correct: true },
      { text: '20°R', correct: false },
    ],
  },
  {
    question: 'Dengan suara yang sama, di dalam ruangan kelas lebih nyaring dari pada di lapangan. Hal ini disebabkan...',
    answers: [
      { text: 'Di lapangan sepi', correct: false },
      { text: 'Dalam ruangan banyak suara', correct: false },
      { text: 'Dinding pantul jauh dari sumber bunyi', correct: false },
      { text: 'Dinding pantul dekat dengan sumber bunyi', correct: true },
    ],
  },
  {
    question: 'Dinding pantul dekat dengan sumber bunySebuah benda diletakkan 20 cm di depan cermin cekung berjari-jari 30 cm. Jarak bayangan benda terhadap cermin adalah...',
    answers: [
      { text: '20 cm', correct: false },
      { text: '30 cm', correct: false },
      { text: '45 cm', correct: false },
      { text: '60 cm', correct: true },
    ],
  },
  {
    question: 'Batang kaca akan bermuatan positif jika digosok dengan kain sutera, karena...',
    answers: [
      { text: 'Ada proton berpindah dari kaca ke kain', correct: false },
      { text: 'Ada proton berpindah dari kain ke kaca', correct: false },
      { text: 'Ada elektron berpindah dari kaca ke kain', correct: true },
      { text: 'Ada elektron berpindah dari kain ke kaca', correct: false },
    ],
  },
  {
    question: 'Sebuah setrika listrik dengan daya 350 watt digunakan selama 2 jam. Energi yang digunakan...',
    answers: [
      { text: '0,174 kwh', correct: false },
      { text: '0,7 kwh', correct: true },
      { text: '122,5 kwh', correct: false },
      { text: '252 kwh', correct: false },
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
