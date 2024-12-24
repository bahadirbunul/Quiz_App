const questions = [
  {
    question: "What is the capital of France?",
    answer: [
      { text: "New York", correct: false },
      { text: "London", correct: false },
      { text: "Paris", correct: true },
      { text: "Dublin", correct: false },
    ],
  },
  {
    question: "Which animal is the largest?",
    answer: [
      { text: "Elephant", correct: true },
      { text: "Lion", correct: false },
      { text: "Tiger", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "How many floors does the Empire State Building have?",
    answer: [
      { text: "102", correct: true },
      { text: "101", correct: false },
      { text: "100", correct: false },
      { text: "99", correct: false },
    ],
  },
  {
    question: "How long is the Great Wall of China?",
    answer: [
      { text: "13,171 miles", correct: true },
      { text: "10,000 miles", correct: false },
      { text: "8,850 miles", correct: false },
      { text: "6,000 miles", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerText = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Restart";
  nextButton.style.display = "block";
}

function handleNextButton(params) {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
