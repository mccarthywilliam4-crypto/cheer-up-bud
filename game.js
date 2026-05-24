const GROQ_API_KEY = ''; // Add your Groq API key here to enable AI-generated insults.

// To use a custom face image instead of the default emoji/SVG faces:
// 1. Place your image files in the assets/face/ folder (e.g., annoyed.png, angry.png, fuming.png, volcanic.png)
// 2. Update the 'img' paths in FACE_STATES below to point to your files
// 3. The images will be displayed at the size of the face-container (see style.css)
// Supported formats: PNG, JPG, GIF, SVG, WebP
const QUESTION_COUNT = 7;
const WRONG_LIMIT = 3;
const BUY_BEER_COST = 200;
const BUY_BEER_ANGER_REDUCTION = 20;
const GROQ_MODEL = 'llama3-8b-8192';

const FACE_STATES = [
  { max: 25, img: 'assets/face/annoyed.png', emoji: '😒', label: 'Annoyed', fallbackColor: '#f2c94c' },
  { max: 50, img: 'assets/face/angry.png', emoji: '😠', label: 'Angry', fallbackColor: '#f2994a' },
  { max: 75, img: 'assets/face/fuming.png', emoji: '😡', label: 'Fuming', fallbackColor: '#eb5757' },
  { max: 100, img: 'assets/face/volcanic.png', emoji: '🤬', label: 'Volcanic', fallbackColor: '#a33cf2' },
];

const DIFFICULTY_EFFECTS = {
  easy: { wrong: 15, correct: -3 },
  medium: { wrong: 12, correct: -6 },
  hard: { wrong: 8, correct: -10 },
};

const CORRECT_RESPONSES = [
  "Fine. You got one right. Don't cream yourself about it.",
  "Okay, that one counts. Barely.",
  "Lucky guess. We both know it was a lucky guess.",
  "Wow, you actually knew that. I'm genuinely shocked.",
  "One right answer doesn't make you smart. Just so we're clear.",
  "Alright, I'll give you that one. Don't get used to it.",
  "Even a broken clock. You know the rest.",
  "Got it right. Good for you. Moving on.",
];

const IDLE_TAUNTS = [
  "You gonna stare at it all day or actually pick?",
  "Pick a damn answer. We don't have all night.",
  "My dead uncle could've answered faster.",
  "Bro it's multiple choice. Four options. Pick one.",
  "You're really sitting here like one of these is gonna get easier.",
  "At this rate I'm aging in real time.",
  "Just pick the wrong one and get it over with.",
  "The suspense would be more impressive if you weren't clearly stumped.",
];

const ROUND_END_JABS = [
  "Barely survived that one.",
  "You scraped through like toilet paper on a bad day.",
  "That round was embarrassing but somehow you're still breathing.",
  "Lucky. Don't confuse that with skill.",
  "Alright, you made it. Try not to humiliate yourself next round.",
  "You played like shit but you got away with it. This time.",
];

const WIN_ENDINGS = [
  "...I guess you're ok.",
  "Fine. You're not completely useless.",
  "You actually did it. I genuinely didn't think you had it in you.",
  "Alright, I'll admit it. That wasn't terrible.",
];

const BUY_BEER_MSGS = [
  "Buying your way out. Typical. At least you're consistent at quitting.",
  "Just spent 200 points on a beer because you can't answer trivia. Pathetic.",
  "Nice, now he's 20% less pissed. Still thinks you're an idiot though.",
];

const BEER_PONG_HIT_MSGS = [
  "Lucky. Don't get smug. You've thrown 40 air balls before.",
  "Holy shit, it went in. Even you can't believe that.",
  "Somehow that worked. You have no idea how.",
];

const BEER_PONG_MISS_MSGS = [
  "You couldn't sink that if the cup was the size of a kiddie pool. Go sit down.",
  "My mom throws better than that. Both arms.",
  "Missed it. Didn't even graze it. Embarrassing.",
  "Air ball. At beer pong. Are you kidding me?",
];

const BEER_PONG_RESET_MSGS = [
  "Don't choke again. Try to aim this time.",
  "Shot reset. Try not to embarrass yourself.",
  "One more shot. Make it count for once.",
];

const FALLBACK_TRIVIA = {
  hockey: [
    { question: 'What do you actually smack around in hockey?', correct: 'A puck', incorrect: ['A baseball', 'A golf ball', 'A tennis ball'] },
    { question: 'How many periods are in a normal hockey game?', correct: 'Three', incorrect: ['Two', 'Four', 'Five'] },
    { question: 'Who is the dude trying to stop every shot?', correct: 'The goalie', incorrect: ['The ref', 'The mascot', 'The equipment manager'] },
    { question: 'If somebody gets checked into the boards, what sport are you watching?', correct: 'Hockey', incorrect: ['Golf', 'Baseball', 'Tennis'] },
  ],
  football: [
    { question: 'How many points is a touchdown before the extra kick?', correct: 'Six', incorrect: ['Three', 'Five', 'Seven'] },
    { question: 'What does a QB throw to move the chains quick?', correct: 'A pass', incorrect: ['A curveball', 'A faceoff', 'A kickoff tee'] },
    { question: 'What do they call it on 4th down when you boot it away?', correct: 'A punt', incorrect: ['A free throw', 'A slapshot', 'A penalty shot'] },
    { question: 'What part of the field are you trying to reach to score?', correct: 'The end zone', incorrect: ['The bullpen', 'Center ice', 'The dugout'] },
  ],
  baseball: [
    { question: 'How many strikes and you gotta head back to the dugout?', correct: 'Three', incorrect: ['Two', 'Four', 'Five'] },
    { question: 'What do you call it when the batter smokes one out of the park?', correct: 'A home run', incorrect: ['A hole in one', 'A touchdown', 'A hat trick'] },
    { question: 'How many bases are there to run in a full trip around?', correct: 'Four', incorrect: ['Three', 'Five', 'Six'] },
    { question: 'What is the guy on the mound called?', correct: 'The pitcher', incorrect: ['The bowler', 'The caddie', 'The keeper'] },
  ],
  basketball: [
    { question: 'How many points is a normal shot inside the arc?', correct: 'Two', incorrect: ['One', 'Three', 'Four'] },
    { question: 'How many points is a made free throw?', correct: 'One', incorrect: ['Two', 'Three', 'Zero'] },
    { question: 'What do you call it when someone throws down hard at the rim?', correct: 'A dunk', incorrect: ['A bunt', 'A chip shot', 'A body check'] },
    { question: 'If your foot is on the line for a long shot, it counts for what?', correct: 'Two points', incorrect: ['Three points', 'One point', 'Four points'] },
  ],
  golf: [
    { question: 'What do you yell when your shot is flying toward random people?', correct: 'Fore!', incorrect: ['Heads up!', 'Timber!', 'Inbound!'] },
    { question: 'What do golfers use to tee off on most long holes?', correct: 'A driver', incorrect: ['A putter', 'A goalie stick', 'A cue stick'] },
    { question: 'What\'s it called when you finish a hole in one less than par?', correct: 'Birdie', incorrect: ['Bogey', 'Eagle eye', 'Hat trick'] },
    { question: 'What is the smooth area with the hole and flag called?', correct: 'The green', incorrect: ['The rink', 'The pit lane', 'The infield'] },
  ],
};

const ROUND_DATA = [
  {
    key: 'hockey',
    theme: '🏒 Hockey',
    label: 'Hockey',
    bgGradient: 'linear-gradient(135deg, #0d1b2a, #1b4f72)',
    triviaCategory: 21,
    triviaDifficulty: 'easy',
    insultContext: 'hockey',
    fallbackInsults: [
      "Are you fucking serious? My grandmother knows what a puck is.",
      "You've been to zero games, owned zero jerseys, and somehow know zero facts. Impressive commitment to ignorance.",
      "Hockey's played on ice, not in your head. Clearly.",
      "Even the Zamboni driver would've gotten that right.",
    ],
  },
  {
    key: 'football',
    theme: '🏈 Football',
    label: 'Football',
    bgGradient: 'linear-gradient(135deg, #1a2e10, #3b5e20)',
    triviaCategory: 21,
    triviaDifficulty: 'easy',
    insultContext: 'football',
    fallbackInsults: [
      "That was the mental equivalent of throwing a pick-six in your own end zone.",
      "You just fumbled the easiest trivia question known to man. Congratulations.",
      "Bro, you picked that answer like you've never seen a football in your life.",
      "Wide open field, nobody around, and you still tripped over yourself.",
    ],
  },
  {
    key: 'baseball',
    theme: '⚾ Baseball',
    label: 'Baseball',
    bgGradient: 'linear-gradient(135deg, #0a2040, #c8a96e)',
    triviaCategory: 21,
    triviaDifficulty: 'easy',
    insultContext: 'baseball',
    fallbackInsults: [
      "My guy couldn't hit that answer with a fucking boat oar.",
      "That swing was so late the at-bat ended last Tuesday.",
      "You struck out looking. At a tee-ball question. Go sit down.",
      "Even the bullpen is laughing at that guess.",
    ],
  },
  {
    key: 'basketball',
    theme: '🏀 Basketball',
    label: 'Basketball',
    bgGradient: 'linear-gradient(135deg, #2e1400, #b85c00)',
    triviaCategory: 21,
    triviaDifficulty: 'easy',
    insultContext: 'basketball',
    fallbackInsults: [
      "You bricked that so hard the backboard filed a restraining order.",
      "Wide open layup. No defender within five miles. Still missed. How?",
      "That answer was uglier than a Charles Barkley jumpshot.",
      "You just airballed trivia. That takes a special kind of talent.",
    ],
  },
  {
    key: 'golf',
    theme: '⛳ Golf',
    label: 'Golf',
    bgGradient: 'linear-gradient(135deg, #0f2010, #2e6b2e)',
    triviaCategory: 21,
    triviaDifficulty: 'easy',
    insultContext: 'golf',
    fallbackInsults: [
      "That answer sliced out of bounds into the fucking parking lot. 10-stroke penalty.",
      "You just four-putted from two feet in trivia form. Unbelievable.",
      "Even the cart girl stopped to watch that disaster unfold.",
      "Your caddie would've quit on the spot after that guess.",
    ],
  },
];

const state = {
  score: 0,
  angerPct: 0,
  roundIndex: 0,
  beerBongCount: 0,
  playerName: '???',
  triviaQuestions: [],
  currentQuestionIndex: 0,
  wrongAnswers: 0,
  roundBeerBongTriggered: false,
  roundBeerBongCount: 0,
  safeStreak: 0,
  answerLocked: false,
  isRoundLoading: false,
  insultToken: 0,
  beerPong: {
    phase: 'aiming',
    shot: 1,
    hits: 0,
    aimX: 0.5,
    aimY: 0.5,
    cupCount: 6,
    rafId: null,
    animationStart: 0,
    shotResults: [],
  },
};

let idleTauntTimer = null;

const audioState = {
  ctx: null,
};

const screens = {
  menu: document.getElementById('screen-menu'),
  game: document.getElementById('screen-game'),
  beerbong: document.getElementById('screen-beerbong'),
  gameover: document.getElementById('screen-gameover'),
  win: document.getElementById('screen-win'),
};

const roundLabel = document.getElementById('round-label');
const scoreDisplay = document.getElementById('score-display');
const angerBar = document.getElementById('anger-bar');
const speechBubble = document.getElementById('speech-bubble');
const faceImg = document.getElementById('face-img');
const faceEmoji = document.getElementById('face-emoji');
const faceContainer = document.getElementById('face-container');
const questionProgress = document.getElementById('question-progress');
const wrongCounter = document.getElementById('wrong-counter');
const comboCounter = document.getElementById('combo-counter');
const questionText = document.getElementById('question-text');
const answersGrid = document.getElementById('answers-grid');
const buyBeerBtn = document.getElementById('buy-beer-btn');
const cupRack = document.getElementById('cup-rack');
const beerBongInstructions = document.getElementById('beerbong-instructions');
const beerBongShotLabel = document.getElementById('beerbong-shot-label');
const beerBongResultLabel = document.getElementById('beerbong-result-label');
const beerBongTable = document.getElementById('beerbong-table');
const aimCursor = document.getElementById('aim-cursor');
const shotBall = document.getElementById('shot-ball');
const missFlash = document.getElementById('miss-flash');
const beerBongActionBtn = document.getElementById('beerbong-action-btn');

function showScreen(key) {
  Object.values(screens).forEach((screen) => screen.classList.remove('active'));
  screens[key].classList.add('active');
}

function sanitizeInitials(value) {
  const cleaned = (value || '').replace(/[^a-z]/gi, '').slice(0, 3).toUpperCase();
  return cleaned || 'BUD';
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function decodeHtml(value) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = value;
  return textarea.value;
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${state.score}`;
  buyBeerBtn.disabled = state.score < BUY_BEER_COST || state.answerLocked || state.isRoundLoading;
}

function updateAngerBar() {
  const pct = clamp(state.angerPct, 0, 100);
  angerBar.style.width = `${pct}%`;
}

function updateFace() {
  const stateFace = FACE_STATES.find((entry) => state.angerPct <= entry.max) || FACE_STATES[3];
  faceEmoji.textContent = stateFace.emoji;
  faceEmoji.style.display = 'none';
  faceImg.style.display = 'block';
  faceImg.alt = `${stateFace.label} face ${stateFace.emoji}`;
  faceImg.onerror = () => {
    faceImg.onerror = null;
    faceImg.src = getFacePlaceholder(stateFace);
  };
  faceImg.src = stateFace.img;
}

function renderLeaderboard(targetId) {
  const list = document.getElementById(targetId);
  const board = JSON.parse(localStorage.getItem('cheerUpBudLeaderboard') || '[]');
  list.innerHTML = '';
  board.forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = `${entry.name} — ${entry.score}`;
    list.appendChild(li);
  });
  if (!board.length) {
    const li = document.createElement('li');
    li.textContent = 'No scores yet';
    list.appendChild(li);
  }
}

function renderAllLeaderboards() {
  renderLeaderboard('leaderboard-menu');
  renderLeaderboard('leaderboard-gameover');
  renderLeaderboard('leaderboard-win');
}

function saveLeaderboard() {
  const current = JSON.parse(localStorage.getItem('cheerUpBudLeaderboard') || '[]');
  current.push({ name: state.playerName, score: state.score });
  current.sort((a, b) => b.score - a.score);
  localStorage.setItem('cheerUpBudLeaderboard', JSON.stringify(current.slice(0, 5)));
  renderAllLeaderboards();
}

function makeSvgDataUrl(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function getFacePlaceholder(faceState) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="${faceState.label} face">
      <defs>
        <radialGradient id="f" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#ffe9cc"/>
          <stop offset="100%" stop-color="${faceState.fallbackColor}"/>
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="94" fill="url(#f)" stroke="#1b1d2f" stroke-width="8"/>
      <circle cx="70" cy="82" r="10" fill="#1b1d2f"/>
      <circle cx="130" cy="82" r="10" fill="#1b1d2f"/>
      <path d="M55 138 Q100 112 145 138" fill="none" stroke="#1b1d2f" stroke-width="9" stroke-linecap="round"/>
      <path d="M50 58 Q70 44 88 58" fill="none" stroke="#1b1d2f" stroke-width="8" stroke-linecap="round"/>
      <path d="M112 58 Q130 44 150 58" fill="none" stroke="#1b1d2f" stroke-width="8" stroke-linecap="round"/>
    </svg>
  `;
  return makeSvgDataUrl(svg);
}

function playSound(kind) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioState.ctx) audioState.ctx = new AudioContextClass();
    const ctx = audioState.ctx;
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    const soundMap = {
      correct: { type: 'sine', start: 660, end: 880, duration: 0.16, volume: 0.09 },
      wrong: { type: 'square', start: 220, end: 140, duration: 0.22, volume: 0.08 },
      splash: { type: 'triangle', start: 520, end: 340, duration: 0.18, volume: 0.09 },
    };
    const config = soundMap[kind];
    if (!config) return;

    oscillator.type = config.type;
    oscillator.frequency.setValueAtTime(config.start, now);
    oscillator.frequency.exponentialRampToValueAtTime(config.end, now + config.duration);
    gain.gain.setValueAtTime(config.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + config.duration);
    oscillator.start(now);
    oscillator.stop(now + config.duration);
  } catch (error) {
    // Ignore optional audio errors.
  }
}

function updateComboCounter() {
  if (state.safeStreak >= 3) {
    comboCounter.classList.remove('hidden');
    comboCounter.textContent = `🔥 ${state.safeStreak} combo`;
  } else {
    comboCounter.classList.add('hidden');
  }
}

function triggerShake() {
  faceContainer.classList.remove('shake');
  void faceContainer.offsetWidth;
  faceContainer.classList.add('shake');
}

function getFallbackInsult(roundData) {
  const pool = roundData.fallbackInsults;
  return pool[Math.floor(Math.random() * pool.length)];
}

function buildRoundIntro(roundData) {
  return `Round ${state.roundIndex + 1}. Prove you know ${roundData.label.toLowerCase()}.`;
}

function normalizeTriviaQuestion(question) {
  const correct = decodeHtml(question.correct_answer || question.correct);
  const incorrectAnswers = (question.incorrect_answers || question.incorrect || []).map(decodeHtml);
  const choices = shuffle([
    { text: correct, correct: true },
    ...incorrectAnswers.map((text) => ({ text, correct: false })),
  ]);

  return {
    question: decodeHtml(question.question),
    correctAnswer: correct,
    choices,
  };
}

function buildFallbackQuestions(roundData) {
  const baseBank = shuffle(FALLBACK_TRIVIA[roundData.key] || []);
  return Array.from({ length: QUESTION_COUNT }, (_, index) => {
    const source = baseBank[index % baseBank.length];
    return normalizeTriviaQuestion(source);
  });
}

async function fetchRoundQuestions(roundData) {
  const categories = Array.isArray(roundData.triviaCategory)
    ? roundData.triviaCategory
    : [roundData.triviaCategory];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const url = `https://opentdb.com/api.php?amount=${QUESTION_COUNT}&category=${category}&difficulty=${roundData.triviaDifficulty}&type=multiple`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Trivia request failed with ${response.status}`);
  }

  const payload = await response.json();
  if (!Array.isArray(payload.results) || payload.results.length < QUESTION_COUNT) {
    throw new Error('Trivia API returned too few questions');
  }

  return payload.results.map(normalizeTriviaQuestion);
}

async function requestGroqInsult(roundData, difficulty, token) {
  if (!GROQ_API_KEY) return;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: 'user',
            content: `You are a brutally funny, crass best friend who loves to roast people. Not mean-spirited, just balls-to-the-wall funny. Think group chat energy. Profanity is encouraged. The player just got a ${difficulty} ${roundData.insultContext} trivia question wrong. Give ONE savage, specific, funny roast in one or two sentences. Make it specific to ${roundData.insultContext}. No softening, no asterisks.`,
          },
        ],
      }),
    });

    if (!response.ok) throw new Error(`Groq request failed with ${response.status}`);

    const payload = await response.json();
    const insult = payload.choices?.[0]?.message?.content?.trim();
    if (insult && token === state.insultToken) {
      speechBubble.textContent = insult.replace(/^"|"$/g, '');
    }
  } catch (error) {
    // Fallback insult is already shown synchronously.
  }
}

function clearIdleTimer() {
  if (idleTauntTimer) {
    window.clearInterval(idleTauntTimer);
    idleTauntTimer = null;
  }
}

function startIdleTimer() {
  clearIdleTimer();
  idleTauntTimer = window.setInterval(() => {
    if (!state.answerLocked && !state.isRoundLoading) {
      speechBubble.textContent = IDLE_TAUNTS[Math.floor(Math.random() * IDLE_TAUNTS.length)];
    }
  }, 5000);
}

function renderQuestion() {
  const totalQuestions = state.triviaQuestions.length || QUESTION_COUNT;
  const currentNumber = Math.min(state.currentQuestionIndex + 1, totalQuestions);
  questionProgress.textContent = `Question ${currentNumber}/${totalQuestions}`;
  wrongCounter.textContent = `⚠ ${state.wrongAnswers}/${WRONG_LIMIT}`;
  updateComboCounter();
  updateScore();

  if (state.isRoundLoading) {
    questionText.textContent = 'Loading questions...';
    answersGrid.innerHTML = '';
    const loadingBtn = document.createElement('button');
    loadingBtn.className = 'answer-btn loading';
    loadingBtn.type = 'button';
    loadingBtn.disabled = true;
    loadingBtn.textContent = 'Fetching trivia…';
    answersGrid.appendChild(loadingBtn);
    return;
  }

  const currentQuestion = state.triviaQuestions[state.currentQuestionIndex];
  if (!currentQuestion) return;

  questionText.textContent = currentQuestion.question;
  answersGrid.innerHTML = '';
  currentQuestion.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer-btn';
    button.textContent = choice.text;
    button.disabled = state.answerLocked;
    button.addEventListener('click', () => answerQuestion(index));
    answersGrid.appendChild(button);
  });
  startIdleTimer();
}

function applyAnswerState(buttonIndex, className, correctIndex = -1) {
  const buttons = [...answersGrid.querySelectorAll('.answer-btn')];
  buttons.forEach((button) => {
    button.disabled = true;
  });
  if (buttons[buttonIndex]) {
    buttons[buttonIndex].classList.add(className);
  }
  if (className === 'wrong' && correctIndex >= 0 && buttons[correctIndex]) {
    buttons[correctIndex].classList.add('correct');
  }
}

function answerQuestion(index) {
  if (state.answerLocked || state.isRoundLoading) return;

  clearIdleTimer();

  const roundData = ROUND_DATA[state.roundIndex];
  const question = state.triviaQuestions[state.currentQuestionIndex];
  const choice = question?.choices[index];
  if (!choice) return;

  state.answerLocked = true;
  state.score += 50;
  const effects = DIFFICULTY_EFFECTS[roundData.triviaDifficulty];

  if (choice.correct) {
    state.safeStreak += 1;
    state.angerPct = clamp(state.angerPct + effects.correct, 0, 100);
    applyAnswerState(index, 'correct');
    playSound('correct');
    const earnedComboBonus = state.safeStreak >= 3 && state.safeStreak % 3 === 0;
    if (earnedComboBonus) {
      state.score += 150;
      speechBubble.textContent = `${state.safeStreak} in a row? Don't cream yourself, it's trivia. +150 anyway.`;
    } else {
      speechBubble.textContent = CORRECT_RESPONSES[Math.floor(Math.random() * CORRECT_RESPONSES.length)];
    }
  } else {
    state.safeStreak = 0;
    state.wrongAnswers += 1;
    state.angerPct = clamp(state.angerPct + effects.wrong, 0, 100);
    const correctChoiceIndex = question.choices.findIndex((candidate) => candidate.correct);
    applyAnswerState(index, 'wrong', correctChoiceIndex);
    triggerShake();
    playSound('wrong');
    speechBubble.textContent = getFallbackInsult(roundData);
    const insultToken = state.insultToken + 1;
    state.insultToken = insultToken;
    requestGroqInsult(roundData, roundData.triviaDifficulty, insultToken);
  }

  updateScore();
  updateAngerBar();
  updateFace();
  updateComboCounter();

  window.setTimeout(() => {
    state.currentQuestionIndex += 1;
    state.answerLocked = false;

    if (state.wrongAnswers >= WRONG_LIMIT) {
      startBeerBong();
      return;
    }

    if (state.currentQuestionIndex >= state.triviaQuestions.length) {
      nextRound();
      return;
    }

    renderQuestion();
  }, choice.correct ? 550 : 700);
}

function getCupFormation(cupCount) {
  if (cupCount >= 6) return [[0, 1, 2], [3, 4], [5]];
  if (cupCount === 4) return [[0], [1, 2], [3]];
  if (cupCount === 2) return [[0, 1]];
  return [[0]];
}

function renderBeerPong() {
  cupRack.innerHTML = '';
  const formation = getCupFormation(state.beerPong.cupCount);
  formation.forEach((rowIndexes) => {
    const row = document.createElement('div');
    row.className = 'cup-row';
    rowIndexes.forEach((cupIndex) => {
      const cup = document.createElement('div');
      cup.className = 'cup';
      cup.dataset.cupIndex = String(cupIndex);
      if (state.beerPong.shotResults[cupIndex] === 'hit') {
        cup.classList.add('sunk');
      }
      row.appendChild(cup);
    });
    cupRack.appendChild(row);
  });

  beerBongShotLabel.textContent = `Shot ${state.beerPong.shot} of 2`;
  beerBongResultLabel.textContent = `Sinks: ${state.beerPong.hits}/2`;
  aimCursor.style.left = `${state.beerPong.aimX * 100}%`;
  aimCursor.style.top = `${state.beerPong.aimY * 100}%`;
}

function updateBeerPongAnimation(timestamp) {
  if (!state.beerPong.animationStart) state.beerPong.animationStart = timestamp;

  const elapsed = timestamp - state.beerPong.animationStart;
  const speedMultiplier = Math.pow(1.04, state.roundIndex);
  const xCycleMs = 2400 / speedMultiplier;
  const yCycleMs = 1900 / speedMultiplier;
  const xRaw = (elapsed % xCycleMs) / xCycleMs;
  const yRaw = ((elapsed + 400) % yCycleMs) / yCycleMs;

  state.beerPong.aimX = xRaw <= 0.5 ? xRaw * 2 : (1 - xRaw) * 2;
  state.beerPong.aimY = yRaw <= 0.5 ? yRaw * 2 : (1 - yRaw) * 2;

  aimCursor.style.left = `${state.beerPong.aimX * 100}%`;
  aimCursor.style.top = `${state.beerPong.aimY * 100}%`;

  state.beerPong.rafId = window.requestAnimationFrame(updateBeerPongAnimation);
}

function stopBeerPongAnimation() {
  if (state.beerPong.rafId) {
    window.cancelAnimationFrame(state.beerPong.rafId);
    state.beerPong.rafId = null;
  }
}

function resetBeerPongAnimation() {
  stopBeerPongAnimation();
  state.beerPong.animationStart = 0;
  state.beerPong.rafId = window.requestAnimationFrame(updateBeerPongAnimation);
}

function finishBeerPongChallenge() {
  stopBeerPongAnimation();
  state.wrongAnswers = 0;
  wrongCounter.textContent = `⚠ ${state.wrongAnswers}/${WRONG_LIMIT}`;

  if (state.beerPong.hits === 2) {
    state.score += 200;
    state.angerPct = 0;
    speechBubble.textContent = "Holy shit, two cups. He actually calmed down. Don't let it go to your head.";
  } else if (state.beerPong.hits === 1) {
    state.score += 100;
    state.angerPct = 40;
    speechBubble.textContent = "One cup barely saved your ass. He's still pissed, just less.";
  } else {
    document.getElementById('gameover-score').textContent = `Final Score: ${state.score}`;
    saveLeaderboard();
    showScreen('gameover');
    return;
  }

  updateScore();
  updateAngerBar();
  updateFace();
  showScreen('game');

  if (state.currentQuestionIndex >= state.triviaQuestions.length) {
    nextRound();
  } else {
    renderQuestion();
  }
}

function resolveBeerPongShot() {
  state.beerPong.phase = 'resolving';
  beerBongActionBtn.disabled = true;

  // Tolerance: tighter so aim must be accurate to sink a cup
  const tolerance = Math.max(0.08, 0.15 - state.roundIndex * 0.012);

  const tableRect = beerBongTable.getBoundingClientRect();
  const shotClientX = tableRect.left + tableRect.width * state.beerPong.aimX;
  const shotClientY = tableRect.top + tableRect.height * state.beerPong.aimY;

  const remainingCups = [...cupRack.querySelectorAll('.cup:not(.sunk)')];
  let hitCupIndex = -1;
  let bestNormDist = Number.POSITIVE_INFINITY;

  remainingCups.forEach((cup) => {
    const rect = cup.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normDist = Math.hypot(
      (centerX - shotClientX) / tableRect.width,
      (centerY - shotClientY) / tableRect.height
    );
    if (normDist < bestNormDist) {
      bestNormDist = normDist;
      hitCupIndex = Number(cup.dataset.cupIndex);
    }
  });

  const hit = bestNormDist <= tolerance && hitCupIndex >= 0;
  if (!hit) hitCupIndex = -1;

  beerBongTable.style.setProperty('--shot-x', `${state.beerPong.aimX * 100}%`);
  beerBongTable.style.setProperty('--shot-y', `${state.beerPong.aimY * 100}%`);
  missFlash.style.left = `${state.beerPong.aimX * 100}%`;
  missFlash.style.top = `${state.beerPong.aimY * 100}%`;
  shotBall.classList.remove('shooting');
  void shotBall.offsetWidth;
  shotBall.classList.add('shooting');

  window.setTimeout(() => {
    if (hit) {
      state.beerPong.shotResults[hitCupIndex] = 'hit';
      state.beerPong.hits += 1;
      beerBongInstructions.textContent = BEER_PONG_HIT_MSGS[Math.floor(Math.random() * BEER_PONG_HIT_MSGS.length)];
      playSound('splash');
    } else {
      beerBongInstructions.textContent = BEER_PONG_MISS_MSGS[Math.floor(Math.random() * BEER_PONG_MISS_MSGS.length)];
      missFlash.classList.remove('show');
      void missFlash.offsetWidth;
      missFlash.classList.add('show');
    }

    beerBongResultLabel.textContent = `Sinks: ${state.beerPong.hits}/2`;
    renderBeerPong();
    shotBall.classList.remove('shooting');

    if (hit) {
      const cup = cupRack.querySelector(`.cup[data-cup-index="${hitCupIndex}"]`);
      if (cup) {
        cup.classList.remove('hit-flash');
        void cup.offsetWidth;
        cup.classList.add('hit-flash');
      }
    }

    if (state.beerPong.shot >= 2) {
      window.setTimeout(() => {
        beerBongActionBtn.disabled = false;
        state.beerPong.phase = 'aiming';
        finishBeerPongChallenge();
      }, 350);
      return;
    }

    state.beerPong.shot += 1;
    state.beerPong.phase = 'aiming';
    beerBongInstructions.textContent = BEER_PONG_RESET_MSGS[Math.floor(Math.random() * BEER_PONG_RESET_MSGS.length)];
    beerBongActionBtn.disabled = false;
    resetBeerPongAnimation();
  }, 600);
}

function handleBeerPongAction() {
  if (state.beerPong.phase === 'resolving') return;
  stopBeerPongAnimation();
  resolveBeerPongShot();
}

function startBeerBong() {
  stopBeerPongAnimation();
  clearIdleTimer();
  state.beerBongCount += 1;
  state.roundBeerBongTriggered = true;
  const cupCount = Math.max(1, 6 - state.roundBeerBongCount * 2);
  state.roundBeerBongCount += 1;
  state.beerPong = {
    phase: 'aiming',
    shot: 1,
    hits: 0,
    aimX: 0.5,
    aimY: 0.5,
    cupCount,
    rafId: null,
    animationStart: 0,
    shotResults: Array.from({ length: cupCount }, () => null),
  };

  const roundData = ROUND_DATA[state.roundIndex];
  screens.beerbong.style.background = roundData?.bgGradient || 'linear-gradient(135deg, #1a1a2e, #1a1a2e)';
  beerBongInstructions.textContent = 'Aim and throw when the cursor lines up!';
  beerBongActionBtn.textContent = 'Throw! 🍺';
  showScreen('beerbong');
  renderBeerPong();
  resetBeerPongAnimation();
}

function nextRound() {
  stopBeerPongAnimation();
  clearIdleTimer();
  state.score += 100;
  if (!state.roundBeerBongTriggered) state.score += 500;
  state.angerPct = clamp(state.angerPct - 15, 0, 100);
  state.roundIndex += 1;

  if (state.roundIndex >= ROUND_DATA.length) {
    state.score += 1000;
    const winHeading = document.querySelector('#screen-win h2');
    if (winHeading) {
      winHeading.textContent = WIN_ENDINGS[Math.floor(Math.random() * WIN_ENDINGS.length)];
    }
    document.getElementById('win-score').textContent = `Final Score: ${state.score}`;
    saveLeaderboard();
    showScreen('win');
    return;
  }

  const jab = ROUND_END_JABS[Math.floor(Math.random() * ROUND_END_JABS.length)];
  const nextRoundData = ROUND_DATA[state.roundIndex];
  speechBubble.textContent = `${jab} Next up: ${nextRoundData.theme}`;
  updateScore();
  updateAngerBar();

  window.setTimeout(() => {
    loadRound();
  }, 1800);
}

async function loadRound() {
  stopBeerPongAnimation();
  state.safeStreak = 0;
  state.currentQuestionIndex = 0;
  state.wrongAnswers = 0;
  state.roundBeerBongTriggered = false;
  state.roundBeerBongCount = 0;
  state.answerLocked = false;
  state.isRoundLoading = true;
  state.triviaQuestions = [];
  const roundData = ROUND_DATA[state.roundIndex];

  roundLabel.textContent = `Round ${state.roundIndex + 1}: ${roundData.theme}`;
  const roundGradient = roundData.bgGradient || 'linear-gradient(135deg, #1a1a2e, #1a1a2e)';
  screens.game.style.background = roundGradient;
  screens.beerbong.style.background = roundGradient;
  speechBubble.textContent = buildRoundIntro(roundData);
  updateScore();
  updateAngerBar();
  updateFace();
  renderQuestion();

  try {
    state.triviaQuestions = await fetchRoundQuestions(roundData);
  } catch (error) {
    state.triviaQuestions = buildFallbackQuestions(roundData);
    speechBubble.textContent = `${buildRoundIntro(roundData)} Trivia service blinked, so the backup questions are in.`;
  } finally {
    state.isRoundLoading = false;
    renderQuestion();
  }
}

function startGame() {
  stopBeerPongAnimation();
  clearIdleTimer();
  state.score = 0;
  state.angerPct = 0;
  state.roundIndex = 0;
  state.beerBongCount = 0;
  state.safeStreak = 0;
  state.currentQuestionIndex = 0;
  state.wrongAnswers = 0;
  state.playerName = sanitizeInitials(document.getElementById('initials').value);
  showScreen('game');
  loadRound();
}

function buyBeer() {
  if (state.score < BUY_BEER_COST || state.answerLocked || state.isRoundLoading) return;
  state.score -= BUY_BEER_COST;
  state.angerPct = clamp(state.angerPct - BUY_BEER_ANGER_REDUCTION, 0, 100);
  speechBubble.textContent = BUY_BEER_MSGS[Math.floor(Math.random() * BUY_BEER_MSGS.length)];
  updateScore();
  updateAngerBar();
  updateFace();
}

beerBongActionBtn.addEventListener('click', handleBeerPongAction);
buyBeerBtn.addEventListener('click', buyBeer);
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('retry-btn').addEventListener('click', () => showScreen('menu'));
document.getElementById('play-again-btn').addEventListener('click', () => showScreen('menu'));
document.getElementById('initials').addEventListener('input', (event) => {
  event.target.value = sanitizeInitials(event.target.value);
});

renderAllLeaderboards();
updateScore();
updateAngerBar();
updateFace();
renderQuestion();
