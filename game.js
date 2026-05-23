const GROQ_API_KEY = ''; // Add your Groq API key here to enable AI-generated insults.
const QUESTION_COUNT = 10;
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
  easy: { wrong: 25, correct: -3 },
  medium: { wrong: 18, correct: -6 },
  hard: { wrong: 10, correct: -10 },
};

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
  camping: [
    { question: 'You pull up to camp first thing — what do you set up before anything else?', correct: 'The tent', incorrect: ['The karaoke speaker', 'The hammock over rocks', 'A card table bar'] },
    { question: 'What should stay zipped up unless you want raccoons throwing a party?', correct: 'Your food', incorrect: ['Your socks', 'Your flashlight', 'Your camp chair'] },
    { question: 'What actually gets a fire going quick without drama?', correct: 'Matches or a lighter', incorrect: ['A leaf blower', 'A phone flashlight', 'A can opener'] },
    { question: 'When it gets dark on a trail, what are you happy you packed?', correct: 'A flashlight', incorrect: ['A mirror ball', 'A laptop stand', 'A waffle iron'] },
  ],
  cars: [
    { question: 'If the check engine light pops on, what is your car telling you?', correct: 'Something needs attention', incorrect: ['Bass is too loud', 'You unlocked sport mode', 'You won a free wash'] },
    { question: 'Which pedal actually slows the car down?', correct: 'Brake', incorrect: ['Gas', 'Floor pedal', 'Horn pedal'] },
    { question: 'What fluid do you check so your engine doesn\'t cook itself?', correct: 'Oil', incorrect: ['Soda', 'Coolant cologne', 'Window tint fluid'] },
    { question: 'What tool are you grabbing to loosen a stubborn bolt?', correct: 'A wrench', incorrect: ['A spatula', 'A paintbrush', 'A tape measure'] },
  ],
  weed: [
    { question: 'What do most people use to light up a joint?', correct: 'A lighter', incorrect: ['A wrench', 'A stapler', 'A TV remote'] },
    { question: 'What snack shows up first when the munchies hit?', correct: 'Pizza', incorrect: ['Plain celery', 'Unseasoned tofu', 'Ice cubes'] },
    { question: 'If your eyes get red, what helps fast?', correct: 'Eye drops', incorrect: ['Motor oil', 'Sunscreen', 'Brake cleaner'] },
    { question: 'An edible is basically what?', correct: 'Cannabis in food', incorrect: ['A new grinder brand', 'A rolling paper size', 'A strain of grass seed'] },
  ],
  barCrawl: [
    { question: 'Starting a tab means what?', correct: 'You open a running bill', incorrect: ['You call an Uber', 'You reserve the jukebox', 'You pre-order tacos'] },
    { question: 'Before you leave, what do you need to do with that tab?', correct: 'Close it out', incorrect: ['Hide from the bartender', 'Switch bars and hope', 'Pay next week'] },
    { question: 'What game are you probably playing if someone yells "bank shot!"?', correct: 'Pool', incorrect: ['Bowling', 'Foosball golf', 'Table shuffle tennis'] },
    { question: 'Who actually pours the drinks all night?', correct: 'The bartender', incorrect: ['The bouncer', 'The DJ', 'The karaoke host'] },
  ],
  movies: [
    { question: 'Explosions, car chases, and fistfights usually means what genre?', correct: 'Action', incorrect: ['Documentary', 'Rom-com', 'Cooking show'] },
    { question: 'If the whole theater is laughing, you probably picked what?', correct: 'Comedy', incorrect: ['Horror', 'War drama', 'Silent thriller'] },
    { question: 'A trailer is there to do what?', correct: 'Preview the movie', incorrect: ['Show bloopers only', 'Spoil the ending', 'List actor salaries'] },
    { question: 'If your buddy says "that ending messed me up," what genre is likely?', correct: 'Thriller', incorrect: ['Sports recap', 'Game show', 'Nature tour'] },
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
      'You handle a stick like it personally offended you and you\'re losing the argument.',
      'Peewee players skate backwards faster than you move forward in life.',
      'The only thing you\'ve ever scored is a pity invite to the game.',
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
      'You read that play like a guy watching football through a keyhole.',
      'You had one job and still got tackled by the question.',
      'You just fumbled trivia in open field with nobody around.',
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
      'That answer swung so late it missed yesterday.',
      'You just struck out looking at a tee-ball question.',
      'Even the bullpen is laughing at that guess.',
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
      'That answer hit backboard, rim, and somehow your own ego.',
      'You bricked that one so hard the whole gym heard it.',
      'Wide open layup and you still missed.',
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
      'That answer sliced straight into the parking lot.',
      'You just four-putted from two feet in trivia form.',
      'Even your caddie would tell you to put the pencil down.',
    ],
  },
  {
    key: 'camping',
    theme: '🏕️ Camping',
    label: 'Camping',
    bgGradient: 'linear-gradient(135deg, #0f1f0f, #2c3e1a)',
    triviaCategory: 9,
    triviaDifficulty: 'medium',
    insultContext: 'camping',
    fallbackInsults: [
      'You packed vibes and forgot common sense. Again.',
      'A squirrel has better survival instincts than that answer.',
      'You couldn\'t find camp if it was pinned on your map app.',
    ],
  },
  {
    key: 'cars',
    theme: '🚗 Cars',
    label: 'Cars',
    bgGradient: 'linear-gradient(135deg, #1a1a1a, #2e2e2e)',
    triviaCategory: 28,
    triviaDifficulty: 'medium',
    insultContext: 'cars',
    fallbackInsults: [
      'You put premium in a 2003 Civic and felt good about yourself. Sit down.',
      'The check engine light isn\'t a suggestion, genius. It\'s been on for two years.',
      'You rev it at a red light like anyone is impressed. Nobody is impressed.',
    ],
  },
  {
    key: 'weed',
    theme: '🌿 Weed',
    label: 'Weed',
    bgGradient: 'linear-gradient(135deg, #1a0d2e, #0d2e1a)',
    triviaCategory: 9,
    triviaDifficulty: 'medium',
    insultContext: 'weed',
    fallbackInsults: [
      'You greened out on two hits and told everyone you were \"just tired.\" We know.',
      'You called it a \"vibe\" three times in one sentence. The vibe is you\'re an idiot.',
      'You\'ve been \"about to clean your piece\" for four months. It\'s basically a biohazard.',
    ],
  },
  {
    key: 'barCrawl',
    theme: '🍺 Bar Crawl',
    label: 'Bar Crawl',
    bgGradient: 'linear-gradient(135deg, #1a0a00, #3a1f00)',
    triviaCategory: 9,
    triviaDifficulty: 'hard',
    insultContext: 'bar crawl',
    fallbackInsults: [
      'You ordered a vodka soda at a dive bar and wondered why everyone looked at you.',
      'You lost at pool to someone who was using the wrong hand. Both hands.',
      'You started a tab and disappeared. The bar still talks about you. Not fondly.',
    ],
  },
  {
    key: 'movies',
    theme: '🎬 Movies',
    label: 'Movies',
    bgGradient: 'linear-gradient(135deg, #1a0a0a, #2e1a00)',
    triviaCategory: 11,
    triviaDifficulty: 'hard',
    insultContext: 'mainstream Hollywood movies',
    fallbackInsults: [
      'You didn\'t know that? It was in the trailer. The first trailer.',
      'My dog has seen that movie. My dog would have gotten that right.',
      'That\'s not even close. That\'s not in the same zip code as close.',
      'You absolute disappointment. Even your guess was lazy.',
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
    phase: 'width',
    shot: 1,
    hits: 0,
    widthValue: 0.5,
    powerValue: 0.5,
    lockedWidth: 0.5,
    lockedPower: 0.5,
    cupCount: 6,
    rafId: null,
    animationStart: 0,
    shotResults: [],
  },
};

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
  const url = `https://opentdb.com/api.php?amount=${QUESTION_COUNT}&category=${roundData.triviaCategory}&difficulty=${roundData.triviaDifficulty}&type=multiple`;
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
            content: `You are a drill sergeant who is brutally mean but funny like Full Metal Jacket. The player just got a ${difficulty} ${roundData.insultContext} trivia question wrong. Give ONE savage, specific, funny insult in one sentence. No generic insults — make it specific to ${roundData.insultContext}. No profanity filters.`,
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
      speechBubble.textContent = `Smooth move. ${state.safeStreak} straight and +150.`;
    } else {
      speechBubble.textContent = 'Fine. You got one right.';
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
  aimCursor.style.left = `${state.beerPong.widthValue * 100}%`;
  aimCursor.style.top = `${state.beerPong.powerValue * 100}%`;
}

function updateBeerPongAnimation(timestamp) {
  if (!state.beerPong.animationStart) state.beerPong.animationStart = timestamp;

  const elapsed = timestamp - state.beerPong.animationStart;
  const speedMultiplier = Math.pow(1.12, state.roundIndex);
  const widthCycleMs = 1500 / speedMultiplier;
  const powerCycleMs = 1300 / speedMultiplier;
  const widthRaw = (elapsed % widthCycleMs) / widthCycleMs;
  const powerRaw = ((elapsed + 300) % powerCycleMs) / powerCycleMs;
  const oscillatingWidth = widthRaw <= 0.5 ? widthRaw * 2 : (1 - widthRaw) * 2;
  const oscillatingPower = powerRaw <= 0.5 ? powerRaw * 2 : (1 - powerRaw) * 2;

  if (state.beerPong.phase === 'width') {
    state.beerPong.widthValue = oscillatingWidth;
  } else if (state.beerPong.phase === 'power') {
    state.beerPong.widthValue = state.beerPong.lockedWidth;
  }
  state.beerPong.powerValue = oscillatingPower;

  renderBeerPong();
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
    speechBubble.textContent = 'Beer pong clinic. He cooled all the way off.';
  } else if (state.beerPong.hits === 1) {
    state.score += 100;
    state.angerPct = 40;
    speechBubble.textContent = 'One cup saved you. He is still irritated.';
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

function getNearestCupIndex(targetX, targetY) {
  const tableRect = beerBongTable.getBoundingClientRect();
  const targetClientX = tableRect.left + tableRect.width * targetX;
  const targetClientY = tableRect.top + tableRect.height * targetY;
  const remainingCups = [...cupRack.querySelectorAll('.cup:not(.sunk)')];

  if (!remainingCups.length) return -1;

  let nearestIndex = Number(remainingCups[0].dataset.cupIndex);
  let nearestDistance = Number.POSITIVE_INFINITY;

  remainingCups.forEach((cup) => {
    const rect = cup.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(centerX - targetClientX, centerY - targetClientY);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = Number(cup.dataset.cupIndex);
    }
  });

  return Number.isFinite(nearestIndex) ? nearestIndex : -1;
}

function resolveBeerPongShot() {
  state.beerPong.phase = 'resolving';
  beerBongActionBtn.disabled = true;

  const widthTolerance = Math.max(0.1, 0.2 - state.roundIndex * 0.01 - (6 - state.beerPong.cupCount) * 0.0125);
  const powerTolerance = Math.max(0.08, 0.17 - state.roundIndex * 0.008);
  const widthHit = Math.abs(state.beerPong.lockedWidth - 0.5) <= widthTolerance;
  const powerHit = Math.abs(state.beerPong.lockedPower - 0.24) <= powerTolerance;
  const hit = widthHit && powerHit;
  const cupIndex = hit ? getNearestCupIndex(state.beerPong.lockedWidth, state.beerPong.lockedPower) : -1;

  beerBongTable.style.setProperty('--shot-x', `${state.beerPong.lockedWidth * 100}%`);
  beerBongTable.style.setProperty('--shot-y', `${state.beerPong.lockedPower * 100}%`);
  missFlash.style.left = `${state.beerPong.lockedWidth * 100}%`;
  missFlash.style.top = `${state.beerPong.lockedPower * 100}%`;
  shotBall.classList.remove('shooting');
  void shotBall.offsetWidth;
  shotBall.classList.add('shooting');

  window.setTimeout(() => {
    if (hit && cupIndex >= 0) {
      state.beerPong.shotResults[cupIndex] = 'hit';
      state.beerPong.hits += 1;
      beerBongInstructions.textContent = 'Splash. Right in the cup.';
      playSound('splash');
    } else {
      const widthCall = state.beerPong.lockedWidth < 0.5 ? 'left' : 'right';
      const powerCall = state.beerPong.lockedPower < 0.24 ? 'long' : 'short';
      beerBongInstructions.textContent = `Missed it — drifted ${widthCall} and ${powerCall}.`;
      missFlash.classList.remove('show');
      void missFlash.offsetWidth;
      missFlash.classList.add('show');
    }

    beerBongResultLabel.textContent = `Sinks: ${state.beerPong.hits}/2`;
    renderBeerPong();
    shotBall.classList.remove('shooting');

    if (hit && cupIndex >= 0) {
      const cup = cupRack.querySelector(`.cup[data-cup-index="${cupIndex}"]`);
      if (cup) {
        cup.classList.remove('hit-flash');
        void cup.offsetWidth;
        cup.classList.add('hit-flash');
      }
    }

    if (state.beerPong.shot >= 2) {
      window.setTimeout(() => {
        beerBongActionBtn.textContent = 'Lock Width';
        beerBongActionBtn.disabled = false;
        state.beerPong.phase = 'width';
        finishBeerPongChallenge();
      }, 350);
      return;
    }

    state.beerPong.shot += 1;
    state.beerPong.phase = 'width';
    beerBongInstructions.textContent = 'Shot reset. Lock left-right aim.';
    beerBongActionBtn.textContent = 'Lock Width';
    beerBongActionBtn.disabled = false;
    resetBeerPongAnimation();
  }, 600);
}

function handleBeerPongAction() {
  if (state.beerPong.phase === 'resolving') return;

  stopBeerPongAnimation();

  const domWidth = Number.parseFloat(aimCursor.style.left) / 100;
  const domPower = Number.parseFloat(aimCursor.style.top) / 100;
  const currentWidth = Number.isFinite(domWidth) ? clamp(domWidth, 0, 1) : state.beerPong.widthValue;
  const currentPower = Number.isFinite(domPower) ? clamp(domPower, 0, 1) : state.beerPong.powerValue;

  state.beerPong.widthValue = currentWidth;
  state.beerPong.powerValue = currentPower;

  if (state.beerPong.phase === 'width') {
    state.beerPong.lockedWidth = currentWidth;
    state.beerPong.phase = 'power';
    beerBongInstructions.textContent = 'Left-right locked. Now lock depth.';
    beerBongActionBtn.textContent = 'Lock Depth';
    renderBeerPong();
    resetBeerPongAnimation();
    return;
  }

  state.beerPong.lockedPower = currentPower;
  renderBeerPong();
  resolveBeerPongShot();
}

function startBeerBong() {
  stopBeerPongAnimation();
  state.beerBongCount += 1;
  state.roundBeerBongTriggered = true;
  const cupCount = Math.max(1, 6 - state.roundBeerBongCount * 2);
  state.roundBeerBongCount += 1;
  state.beerPong = {
    phase: 'width',
    shot: 1,
    hits: 0,
    widthValue: 0.5,
    powerValue: 0.75,
    lockedWidth: 0.5,
    lockedPower: 0.24,
    cupCount,
    rafId: null,
    animationStart: 0,
    shotResults: Array.from({ length: cupCount }, () => null),
  };

  const roundData = ROUND_DATA[state.roundIndex];
  screens.beerbong.style.background = roundData?.bgGradient || 'linear-gradient(135deg, #1a1a2e, #1a1a2e)';
  beerBongInstructions.textContent = 'Lock left-right aim first.';
  beerBongActionBtn.textContent = 'Lock Width';
  showScreen('beerbong');
  renderBeerPong();
  resetBeerPongAnimation();
}

function nextRound() {
  stopBeerPongAnimation();
  state.score += 100;
  if (!state.roundBeerBongTriggered) state.score += 500;
  state.angerPct = clamp(state.angerPct - 15, 0, 100);
  state.roundIndex += 1;

  if (state.roundIndex >= ROUND_DATA.length) {
    state.score += 1000;
    document.getElementById('win-score').textContent = `Final Score: ${state.score}`;
    saveLeaderboard();
    showScreen('win');
    return;
  }

  loadRound();
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
  speechBubble.textContent = 'You bought him a beer. He is 20% less furious.';
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
