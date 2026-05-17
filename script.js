const questions = [
  {
    text: "日本で最も長い川はどれですか？",
    choices: ["利根川", "最上川", "信濃川", "木曽川", "天竜川"],
    correct: 2
  },
  {
    text: "元素記号「Au」が表す元素はどれですか？",
    choices: ["銀", "金", "銅", "白金", "鉄"],
    correct: 1
  },
  {
    text: "太陽系で最も大きい惑星はどれですか？",
    choices: ["土星", "天王星", "海王星", "木星", "火星"],
    correct: 3
  },
  {
    text: "世界で最も面積の大きい国はどれですか？",
    choices: ["カナダ", "アメリカ", "中国", "ロシア", "オーストラリア"],
    correct: 3
  },
  {
    text: "「モナ・リザ」を描いた芸術家はだれですか？",
    choices: ["ミケランジェロ", "ラファエロ", "レオナルド・ダ・ヴィンチ", "ボッティチェリ", "カラヴァッジョ"],
    correct: 2
  },
  {
    text: "人体の中で最も面積が大きい臓器はどれですか？",
    choices: ["肝臓", "肺", "心臓", "脳", "皮膚"],
    correct: 4
  },
  {
    text: "光が1秒間に進む距離として最も近いものはどれですか？",
    choices: ["約3万km", "約30万km", "約300万km", "約3,000万km", "約3億km"],
    correct: 1
  },
  {
    text: "日本の国鳥はどれですか？",
    choices: ["ツル", "ウグイス", "キジ", "タンチョウ", "ハクチョウ"],
    correct: 2
  },
  {
    text: "水の化学式はどれですか？",
    choices: ["CO₂", "NaCl", "H₂O₂", "H₂O", "O₂"],
    correct: 3
  },
  {
    text: "2024年パリオリンピックで日本が獲得した金メダルは何個ですか？",
    choices: ["14個", "17個", "20個", "12個", "9個"],
    correct: 2
  }
];

const LABELS = ["ア", "イ", "ウ", "エ", "オ"];

let currentIndex = 0;
let score = 0;

const startScreen  = document.getElementById("start-screen");
const quizScreen   = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const progressBar  = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const questionText = document.getElementById("question-text");
const choicesEl    = document.getElementById("choices");
const feedbackEl   = document.getElementById("feedback");
const nextBtn      = document.getElementById("next-btn");
const scoreText    = document.getElementById("score-text");
const scoreMessage = document.getElementById("score-message");

document.getElementById("start-btn").addEventListener("click", startQuiz);
nextBtn.addEventListener("click", goToNext);
document.getElementById("retry-btn").addEventListener("click", restartQuiz);

function startQuiz() {
  currentIndex = 0;
  score = 0;
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = questions[currentIndex];

  progressBar.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
  progressText.textContent = `問題 ${currentIndex + 1} / ${questions.length}`;
  questionText.textContent = q.text;

  feedbackEl.className = "feedback hidden";
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");
  nextBtn.textContent = currentIndex === questions.length - 1 ? "結果を見る" : "次の問題へ";

  choicesEl.innerHTML = "";
  q.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.innerHTML = `<span class="label">${LABELS[i]}</span>${choice}`;
    btn.addEventListener("click", () => handleAnswer(i));
    choicesEl.appendChild(btn);
  });
}

function handleAnswer(selectedIndex) {
  const q = questions[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice-btn");

  buttons.forEach(btn => (btn.disabled = true));

  if (selectedIndex === q.correct) {
    score++;
    buttons[selectedIndex].classList.add("correct");
    feedbackEl.textContent = "正解！";
    feedbackEl.className = "feedback correct";
  } else {
    buttons[selectedIndex].classList.add("incorrect");
    buttons[q.correct].classList.add("correct");
    feedbackEl.textContent = `不正解… 正解は「${q.choices[q.correct]}」です。`;
    feedbackEl.className = "feedback incorrect";
  }

  nextBtn.classList.remove("hidden");
}

function goToNext() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  scoreText.textContent = `${questions.length}問中 ${score}問正解`;

  const pct = (score / questions.length) * 100;
  if (pct === 100)      scoreMessage.textContent = "満点です！完璧な知識ですね！";
  else if (pct >= 80)   scoreMessage.textContent = "素晴らしい！とても優秀です。";
  else if (pct >= 60)   scoreMessage.textContent = "よくできました！あと少しで上位です。";
  else if (pct >= 40)   scoreMessage.textContent = "もう少し頑張りましょう！";
  else                  scoreMessage.textContent = "次回はきっと上がります。再挑戦してみてください！";
}

function restartQuiz() {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}
