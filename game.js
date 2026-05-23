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
    { question: 'In hockey, what do players try to shoot into the net?', correct: 'A puck', incorrect: ['A baseball', 'A tennis ball', 'A shuttlecock'] },
    { question: 'How many periods are played in a standard hockey game?', correct: 'Three', incorrect: ['Two', 'Four', 'Five'] },
    { question: 'What piece of equipment protects a hockey player\'s head?', correct: 'A helmet', incorrect: ['A visor cap', 'A mouthguard', 'A shoulder pad'] },
    { question: 'Which position usually guards the net in hockey?', correct: 'Goalie', incorrect: ['Center', 'Winger', 'Defenseman'] },
  ],
  hunting: [
    { question: 'What kind of tracks help hunters spot where an animal walked?', correct: 'Footprints', incorrect: ['Clouds', 'Shadows', 'Campfires'] },
    { question: 'Why do hunters often wear camouflage?', correct: 'To blend into their surroundings', incorrect: ['To stay warmer than everyone else', 'To signal airplanes', 'To attract animals'] },
    { question: 'What is a common safety rule when carrying a rifle?', correct: 'Keep the muzzle pointed in a safe direction', incorrect: ['Swing it freely while hiking', 'Always rest it on your shoulder with the trigger pressed', 'Carry it with the safety off'] },
    { question: 'What time of day are deer often most active?', correct: 'Dawn and dusk', incorrect: ['Only at noon', 'Only after midnight', 'Only in heavy rain'] },
  ],
  camping: [
    { question: 'What should you pack if you want to start a campfire safely?', correct: 'Matches or a lighter', incorrect: ['A hair dryer', 'A blender', 'A TV remote'] },
    { question: 'What does a map help you do while camping?', correct: 'Navigate trails', incorrect: ['Cook food faster', 'Keep bugs away', 'Pitch a tent'] },
    { question: 'What should you store away from your tent to avoid attracting animals?', correct: 'Food', incorrect: ['Sleeping bags', 'Flashlights', 'Boots'] },
    { question: 'What is usually the first thing you should set up at camp?', correct: 'Your shelter', incorrect: ['A karaoke machine', 'A hammock over a river', 'A cooler in the sun'] },
  ],
  cars: [
    { question: 'What does a check engine light usually mean?', correct: 'The car needs attention', incorrect: ['The radio is too loud', 'Your tires are overinflated with joy', 'The gas cap turned into a trophy'] },
    { question: 'What do you use a wrench for?', correct: 'Tightening or loosening bolts', incorrect: ['Checking tire pressure', 'Waxing the hood', 'Refilling windshield washer fluid'] },
    { question: 'Which pedal makes a car slow down?', correct: 'Brake', incorrect: ['Clutch', 'Gas', 'Parking sensor'] },
    { question: 'What should you regularly check to keep a car running well?', correct: 'Oil level', incorrect: ['Cup holder depth', 'Speaker color', 'Seatbelt stitching pattern'] },
  ],
  weed: [
    { question: 'Which device is commonly used to light a joint?', correct: 'A lighter', incorrect: ['A can opener', 'A key fob', 'A stapler'] },
    { question: 'What food is often jokingly linked to the munchies?', correct: 'Pizza', incorrect: ['Raw onions', 'Plain rice cakes', 'Canned spinach'] },
    { question: 'What is an edible?', correct: 'A cannabis-infused food item', incorrect: ['A strain of lawn grass', 'A type of ashtray', 'A rolling tray brand only'] },
    { question: 'What might someone use after smoking to reduce red eyes?', correct: 'Eye drops', incorrect: ['Brake fluid', 'Sunscreen', 'Engine oil'] },
  ],
  fishing: [
    { question: 'What do anglers usually put on a hook to attract fish?', correct: 'Bait', incorrect: ['A flashlight', 'A whistle', 'A car key'] },
    { question: 'What should you keep tight to avoid losing a fish once it bites?', correct: 'Your fishing line', incorrect: ['Your backpack straps', 'The boat stereo cord', 'Your jacket zipper'] },
    { question: 'Which piece of gear helps you reel a fish in?', correct: 'A rod and reel', incorrect: ['A tire iron', 'A compass', 'A lantern'] },
    { question: 'Where do fish usually live?', correct: 'In water', incorrect: ['Inside hollow trees', 'On mountain ridges', 'Buried in sand dunes'] },
  ],
  barCrawl: [
    { question: 'What does it mean to start a tab at a bar?', correct: 'Open a running bill', incorrect: ['Order a taxi', 'Reserve the jukebox', 'Challenge the bartender to trivia'] },
    { question: 'What game is commonly played with a cue stick in bars?', correct: 'Pool', incorrect: ['Darts hockey', 'Table tennis bowling', 'Foam fencing'] },
    { question: 'What should you do before leaving a bar if you opened a tab?', correct: 'Close it out', incorrect: ['Hide the receipt', 'Order water for the pool table', 'Take the glassware home'] },
    { question: 'What is the bartender mainly responsible for?', correct: 'Serving drinks', incorrect: ['Judging karaoke finals', 'Running the parking lot', 'Managing hotel check-ins'] },
  ],
  movies: [
    { question: 'Which kind of movie usually features explosions, chases, and fights?', correct: 'Action', incorrect: ['Nature documentary', 'Silent art film', 'Cooking special'] },
    { question: 'What genre is meant to make the audience laugh?', correct: 'Comedy', incorrect: ['Thriller', 'Horror', 'Western'] },
    { question: 'What genre usually builds suspense and tension around danger?', correct: 'Thriller', incorrect: ['Musical', 'Romantic comedy', 'Sports documentary'] },
    { question: 'What is a trailer supposed to do?', correct: 'Preview a movie before release', incorrect: ['Replace the ending', 'List every actor\'s salary', 'Explain how projectors work'] },
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
    key: 'hunting',
    theme: '🦌 Hunting',
    label: 'Hunting',
    bgGradient: 'linear-gradient(135deg, #1a2e1a, #4a3728)',
    triviaCategory: 27,
    triviaDifficulty: 'easy',
    insultContext: 'hunting',
    fallbackInsults: [
      'The deer walked up to get a closer look at whatever the hell you\'re doing.',
      'You\'ve been outside for three hours and the only thing you\'ve killed is my patience.',
      'You couldn\'t track a bleeding elephant through fresh snow.',
    ],
  },
  {
    key: 'camping',
    theme: '🏕️ Camping',
    label: 'Camping',
    bgGradient: 'linear-gradient(135deg, #0f1f0f, #2c3e1a)',
    triviaCategory: 22,
    triviaDifficulty: 'medium',
    insultContext: 'camping',
    fallbackInsults: [
      'You packed four hoodies and forgot matches. You deserve to be cold and stupid.',
      'The bear spray is for bears. Stop pointing it at yourself, that tracks though.',
      'You called it \"glamping\" once. I haven\'t forgotten.',
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
    bgGradient: 'linear-gradient(135deg, #1a0d2e, #2e1a0d)',
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
    key: 'fishing',
    theme: '🎣 Fishing',
    label: 'Fishing',
    bgGradient: 'linear-gradient(135deg, #0d1f2e, #1a3a2a)',
    triviaCategory: 27,
    triviaDifficulty: 'hard',
    insultContext: 'fishing',
    fallbackInsults: [
      'You tangled your line in a tree, on a boat, in open water. How.',
      'The fish aren\'t biting because they can hear you talking about your podcast idea.',
      'You bought $400 in gear and got outsmarted by something with no brain and no spine.',
    ],
  },
  {
    key: 'barCrawl',
    theme: '🍺 Bar Crawl',
    label: 'Bar Crawl',
    bgGradient: 'linear-gradient(135deg, #1a0a2e, #2e0a1a)',
    triviaCategory: 14,
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
const widthIndicator = document.getElementById('width-indicator');
const powerIndicator = document.getElementById('power-indicator');
const widthLane = document.getElementById('width-lane');
const powerLane = document.getElementById('power-lane');
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

function applyAnswerState(buttonIndex, className) {
  const buttons = [...answersGrid.querySelectorAll('.answer-btn')];
  buttons.forEach((button) => {
    button.disabled = true;
  });
  if (buttons[buttonIndex]) {
    buttons[buttonIndex].classList.add(className);
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
    applyAnswerState(index, 'wrong');
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

function renderBeerPong() {
  cupRack.innerHTML = '';
  for (let i = 0; i < state.beerPong.cupCount; i += 1) {
    const cup = document.createElement('div');
    cup.className = 'cup';
    cup.textContent = '🥤';
    const shotResult = state.beerPong.shotResults[i];
    if (shotResult === 'hit') cup.classList.add('sunk');
    if (shotResult === 'miss') cup.classList.add('missed');
    cupRack.appendChild(cup);
  }

  beerBongShotLabel.textContent = `Shot ${state.beerPong.shot} of 2`;
  beerBongResultLabel.textContent = `Sinks: ${state.beerPong.hits}/2`;
  widthLane.className = `aim-lane ${state.beerPong.phase === 'width' ? 'active-lane' : 'idle-lane'}`;
  powerLane.className = `aim-lane ${state.beerPong.phase === 'power' ? 'active-lane' : 'idle-lane'}`;
  widthIndicator.style.left = `${state.beerPong.widthValue * 100}%`;
  powerIndicator.style.top = `${state.beerPong.powerValue * 100}%`;
}

function updateBeerPongAnimation(timestamp) {
  if (!state.beerPong.animationStart) state.beerPong.animationStart = timestamp;

  const elapsed = timestamp - state.beerPong.animationStart;
  const speedMultiplier = Math.pow(1.15, state.roundIndex);
  const cycleMs = (state.beerPong.phase === 'width' ? 1500 : 1200) / speedMultiplier;
  const raw = (elapsed % cycleMs) / cycleMs;
  const oscillatingValue = raw <= 0.5 ? raw * 2 : (1 - raw) * 2;

  if (state.beerPong.phase === 'width') {
    state.beerPong.widthValue = oscillatingValue;
  } else {
    state.beerPong.powerValue = oscillatingValue;
  }

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

function resolveBeerPongShot() {
  const widthTolerance = Math.max(0.1, 0.18 - state.roundIndex * 0.01 - (6 - state.beerPong.cupCount) * 0.0125);
  const powerTolerance = Math.max(0.1, 0.16 - state.roundIndex * 0.008);
  const widthHit = Math.abs(state.beerPong.lockedWidth - 0.5) <= widthTolerance;
  const powerHit = Math.abs(state.beerPong.lockedPower - 0.5) <= powerTolerance;
  const hit = widthHit && powerHit;

  state.beerPong.shotResults[state.beerPong.shot - 1] = hit ? 'hit' : 'miss';
  if (hit) {
    state.beerPong.hits += 1;
    beerBongInstructions.textContent = 'Splash. That one dropped clean.';
    playSound('splash');
  } else {
    const widthCall = state.beerPong.lockedWidth < 0.5 ? 'wide left' : 'wide right';
    const powerCall = state.beerPong.lockedPower < 0.5 ? 'short' : 'long';
    beerBongInstructions.textContent = `Missed it — ${widthCall} and ${powerCall}.`;
  }

  beerBongResultLabel.textContent = `Sinks: ${state.beerPong.hits}/2`;
  renderBeerPong();

  if (state.beerPong.shot >= 2) {
    beerBongActionBtn.disabled = true;
    window.setTimeout(() => {
      beerBongActionBtn.disabled = false;
      beerBongActionBtn.textContent = 'Lock Width';
      finishBeerPongChallenge();
    }, 650);
    return;
  }

  state.beerPong.shot += 1;
  state.beerPong.phase = 'width';
  beerBongInstructions.textContent = 'Shot reset. Lock the width.';
  beerBongActionBtn.textContent = 'Lock Width';
  resetBeerPongAnimation();
}

function handleBeerPongAction() {
  if (state.beerPong.phase === 'width') {
    state.beerPong.lockedWidth = state.beerPong.widthValue;
    state.beerPong.phase = 'power';
    beerBongInstructions.textContent = 'Width locked. Now lock the depth.';
    beerBongActionBtn.textContent = 'Lock Power';
    resetBeerPongAnimation();
    return;
  }

  state.beerPong.lockedPower = state.beerPong.powerValue;
  stopBeerPongAnimation();
  resolveBeerPongShot();
}

function startBeerBong() {
  stopBeerPongAnimation();
  state.beerBongCount += 1;
  state.roundBeerBongTriggered = true;
  const cupCount = Math.max(2, 6 - state.roundBeerBongCount * 2);
  state.roundBeerBongCount += 1;
  state.beerPong = {
    phase: 'width',
    shot: 1,
    hits: 0,
    widthValue: 0.5,
    powerValue: 0.5,
    lockedWidth: 0.5,
    lockedPower: 0.5,
    cupCount,
    rafId: null,
    animationStart: 0,
    shotResults: [],
  };

  beerBongInstructions.textContent = 'Lock in the width first.';
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
  screens.game.style.background = roundData.bgGradient || 'linear-gradient(135deg, #1a1a2e, #1a1a2e)';
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
