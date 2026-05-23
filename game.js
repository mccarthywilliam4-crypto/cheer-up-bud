const FACE_STATES = [
  { max: 25, img: 'assets/face/annoyed.png', emoji: '😒', label: 'Annoyed', fallbackColor: '#f2c94c' },
  { max: 50, img: 'assets/face/angry.png', emoji: '😠', label: 'Angry', fallbackColor: '#f2994a' },
  { max: 75, img: 'assets/face/fuming.png', emoji: '😡', label: 'Fuming', fallbackColor: '#eb5757' },
  { max: 100, img: 'assets/face/volcanic.png', emoji: '🤬', label: 'Volcanic', fallbackColor: '#a33cf2' },
];

const ITEM_FALLBACKS = {
  HockeyStick: '🏒', GoalNet: '��', RollerSkates: '🛼', Trophy: '🏆', Jersey: '👕', AirHorn: '📣', IceBlock: '🧊', Beer: '🍺', FistBump: '👊', Handshake: '🤝',
  Deer: '🦌', Rifle: '🔫', BearTrap: '🪤', Squirrel: '🐿️', Boots: '🥾', Gloves: '🧤', Log: '🪵', Knife: '🔪', Duck: '🦆', Tree: '🌲',
  Tent: '⛺', Campfire: '🔥', HotDog: '🌭', Axe: '🪓', Bear: '🐻', Moon: '🌙', FishingRod: '🎣', Mosquito: '🦟', Whiskey: '🥃', Map: '🗺️',
  SportsCar: '🏎️', Wrench: '🔧', Tire: '🛞', DeadBattery: '🔋', GasCan: '⛽', CheckeredFlag: '🏁', Bolt: '🔩', PickupTruck: '🛻', Exhaust: '💨', CarKeys: '🔑',
  Joint: '🚬', Lighter: '🔥', Edible: '🍪', SmokeCloud: '☁️', VinylRecord: '💿', Couch: '🛋️', Swirl: '🌀', Pizza: '🍕', EyeDrops: '💧', Brain: '🧠',
  Fish: '🐟', Bucket: '🪣', Sun: '☀️', Shrimp: '🦐', Worm: '🪱', Boat: '🚤', Wave: '🌊', Sleeping: '😴',
  BeerPint: '🍺', PoolCue: '🎱', Mic: '🎤', Dancer: '💃', BoxingGlove: '🥊', Cheers: '🥂', SlotMachine: '🎰', Disco: '🪩', SaltShaker: '🧂', Medal: '🏅',
};

const ROUND_DATA = [
  {
    theme: '🏒 Hockey',
    bgGradient: 'linear-gradient(135deg, #0d1b2a, #1b4f72)',
    responses: ['Get that out of my face.', 'Seriously?', 'You call that a gift?', "I've seen better in peewee.", 'Go home.'],
    items: [
      { name: 'Hockey Stick', img: 'assets/items/hockey_stick.png', angry: true },
      { name: 'Goal Net', img: 'assets/items/goal_net.png', angry: false },
      { name: 'Roller Skates', img: 'assets/items/roller_skates.png', angry: true },
      { name: 'Trophy', img: 'assets/items/trophy.png', angry: false },
      { name: 'Jersey', img: 'assets/items/jersey.png', angry: true },
      { name: 'Air Horn', img: 'assets/items/air_horn.png', angry: true },
      { name: 'Ice Block', img: 'assets/items/ice_block.png', angry: false },
      { name: 'Beer', img: 'assets/items/beer.png', angry: true },
      { name: 'Fist Bump', img: 'assets/items/fist_bump.png', angry: true },
      { name: 'Handshake', img: 'assets/items/handshake.png', angry: false },
    ],
  },
  {
    theme: '🦌 Hunting',
    bgGradient: 'linear-gradient(135deg, #1a2e1a, #4a3728)',
    responses: ["That's pathetic.", 'My gran hunts better than you.', 'Put that away.', "You're embarrassing yourself.", 'Leave.'],
    items: [
      { name: 'Deer', img: 'assets/items/deer.png', angry: true },
      { name: 'Rifle', img: 'assets/items/rifle.png', angry: false },
      { name: 'Bear Trap', img: 'assets/items/bear_trap.png', angry: true },
      { name: 'Squirrel', img: 'assets/items/squirrel.png', angry: true },
      { name: 'Boots', img: 'assets/items/boots.png', angry: false },
      { name: 'Gloves', img: 'assets/items/gloves.png', angry: false },
      { name: 'Log', img: 'assets/items/log.png', angry: true },
      { name: 'Knife', img: 'assets/items/knife.png', angry: true },
      { name: 'Duck', img: 'assets/items/duck.png', angry: true },
      { name: 'Tree', img: 'assets/items/tree.png', angry: false },
    ],
  },
  {
    theme: '🏕️ Camping',
    bgGradient: 'linear-gradient(135deg, #0f1f0f, #2c3e1a)',
    responses: ['I hate the outdoors. And you.', 'Is this a joke?', "You're useless.", 'Go back to your tent.', 'No.'],
    items: [
      { name: 'Tent', img: 'assets/items/tent.png', angry: false },
      { name: 'Campfire', img: 'assets/items/campfire.png', angry: false },
      { name: 'Hot Dog', img: 'assets/items/hot_dog.png', angry: true },
      { name: 'Axe', img: 'assets/items/axe.png', angry: true },
      { name: 'Bear', img: 'assets/items/bear.png', angry: true },
      { name: 'Moon', img: 'assets/items/moon.png', angry: true },
      { name: 'Fishing Rod', img: 'assets/items/fishing_rod.png', angry: false },
      { name: 'Mosquito', img: 'assets/items/mosquito.png', angry: true },
      { name: 'Whiskey', img: 'assets/items/whiskey.png', angry: false },
      { name: 'Map', img: 'assets/items/map.png', angry: true },
    ],
  },
  {
    theme: '🚗 Cars',
    bgGradient: 'linear-gradient(135deg, #1a1a1a, #2e2e2e)',
    responses: ['You know nothing about cars.', "Don't touch my garage.", 'Unbelievable.', 'Get out.', 'Amateur.'],
    items: [
      { name: 'Sports Car', img: 'assets/items/sports_car.png', angry: true },
      { name: 'Wrench', img: 'assets/items/wrench.png', angry: false },
      { name: 'Tire', img: 'assets/items/tire.png', angry: true },
      { name: 'Dead Battery', img: 'assets/items/dead_battery.png', angry: true },
      { name: 'Gas Can', img: 'assets/items/gas_can.png', angry: false },
      { name: 'Checkered Flag', img: 'assets/items/checkered_flag.png', angry: false },
      { name: 'Bolt', img: 'assets/items/bolt.png', angry: true },
      { name: 'Pickup Truck', img: 'assets/items/pickup_truck.png', angry: false },
      { name: 'Exhaust', img: 'assets/items/exhaust.png', angry: true },
      { name: 'Car Keys', img: 'assets/items/car_keys.png', angry: true },
    ],
  },
  {
    theme: '🌿 Weed',
    bgGradient: 'linear-gradient(135deg, #1a0d2e, #2e1a0d)',
    responses: ["You're an idiot.", "This isn't helping.", 'Put that away.', "I'm not laughing.", 'Go away.'],
    items: [
      { name: 'Joint', img: 'assets/items/joint.png', angry: false },
      { name: 'Lighter', img: 'assets/items/lighter.png', angry: true },
      { name: 'Edible', img: 'assets/items/edible.png', angry: true },
      { name: 'Smoke Cloud', img: 'assets/items/smoke_cloud.png', angry: true },
      { name: 'Vinyl Record', img: 'assets/items/vinyl_record.png', angry: true },
      { name: 'Couch', img: 'assets/items/couch.png', angry: false },
      { name: 'Swirl', img: 'assets/items/swirl.png', angry: true },
      { name: 'Pizza', img: 'assets/items/pizza.png', angry: false },
      { name: 'Eye Drops', img: 'assets/items/eye_drops.png', angry: true },
      { name: 'Brain', img: 'assets/items/brain.png', angry: true },
    ],
  },
  {
    theme: '🎣 Fishing',
    bgGradient: 'linear-gradient(135deg, #0d1f2e, #1a3a2a)',
    responses: ["That's the worst cast I've ever seen.", 'You scared the fish.', 'Useless.', "I'm done.", 'Go home.'],
    items: [
      { name: 'Fishing Rod', img: 'assets/items/fishing_rod.png', angry: false },
      { name: 'Fish', img: 'assets/items/fish.png', angry: true },
      { name: 'Bucket', img: 'assets/items/bucket.png', angry: true },
      { name: 'Sun', img: 'assets/items/sun.png', angry: true },
      { name: 'Shrimp', img: 'assets/items/shrimp.png', angry: true },
      { name: 'Worm', img: 'assets/items/worm.png', angry: false },
      { name: 'Boat', img: 'assets/items/boat.png', angry: false },
      { name: 'Wave', img: 'assets/items/wave.png', angry: true },
      { name: 'Beer', img: 'assets/items/beer.png', angry: false },
      { name: 'Sleeping', img: 'assets/items/sleeping.png', angry: true },
    ],
  },
  {
    theme: '🍺 Bar Crawl',
    bgGradient: 'linear-gradient(135deg, #1a0a2e, #2e0a1a)',
    responses: ['You ruined my night.', 'I was having a perfectly bad time.', 'Get away from me.', 'Bartender, remove this person.', 'Nope.'],
    items: [
      { name: 'Beer Pint', img: 'assets/items/beer_pint.png', angry: true },
      { name: 'Pool Cue', img: 'assets/items/pool_cue.png', angry: true },
      { name: 'Mic', img: 'assets/items/mic.png', angry: true },
      { name: 'Dancer', img: 'assets/items/dancer.png', angry: true },
      { name: 'Boxing Glove', img: 'assets/items/boxing_glove.png', angry: false },
      { name: 'Cheers', img: 'assets/items/cheers.png', angry: false },
      { name: 'Slot Machine', img: 'assets/items/slot_machine.png', angry: true },
      { name: 'Disco', img: 'assets/items/disco.png', angry: true },
      { name: 'Salt Shaker', img: 'assets/items/salt_shaker.png', angry: false },
      { name: 'Medal', img: 'assets/items/medal.png', angry: true },
    ],
  },
];

const state = {
  score: 0,
  angerPct: 0,
  roundIndex: 0,
  beerBongCount: 0,
  playerName: '???',
  itemsUsed: new Set(),
  roundItems: [],
  roundBeerBongTriggered: false,
  beerBongTimeLimit: 5,
  safeStreak: 0,
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
const itemsGrid = document.getElementById('items-grid');
const faceImg = document.getElementById('face-img');
const faceEmoji = document.getElementById('face-emoji');
const faceContainer = document.getElementById('face-container');

const chugBar = document.getElementById('chug-bar');
const beerBongTimer = document.getElementById('beerbong-timer');
const beerFill = document.getElementById('beer-fill');
const beerFoam = document.getElementById('beer-foam');

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

function updateScore() {
  scoreDisplay.textContent = `Score: ${state.score}`;
}

function updateAngerBar() {
  const pct = Math.max(0, Math.min(100, state.angerPct));
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

function normalizeItemName(name) {
  return name.replace(/\s+/g, '').replace(/[^a-z0-9]/gi, '');
}

function getShortLabel(name) {
  const words = name.split(/\s+/).filter(Boolean);
  const initials = words.map((word) => word[0]).join('').slice(0, 3).toUpperCase();
  return initials || name.slice(0, 3).toUpperCase();
}

function makeSvgDataUrl(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function getItemPlaceholder(item) {
  const isRisky = Boolean(item.angry);
  const gradientStart = isRisky ? '#7b1f1f' : '#0f4c3a';
  const gradientEnd = isRisky ? '#d94848' : '#33a06f';
  const label = item.name.slice(0, 14);
  const badge = getShortLabel(item.name);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="${item.name}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${gradientStart}"/>
          <stop offset="100%" stop-color="${gradientEnd}"/>
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="114" height="114" rx="18" fill="url(#g)" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>
      <rect x="35" y="24" width="50" height="34" rx="12" fill="rgba(0,0,0,0.25)"/>
      <text x="60" y="46" text-anchor="middle" fill="#fff" font-size="18" font-weight="700" font-family="Arial, sans-serif">${badge}</text>
      <rect x="10" y="78" width="100" height="28" rx="10" fill="rgba(0,0,0,0.22)"/>
      <text x="60" y="96" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="Arial, sans-serif">${label}</text>
    </svg>
  `;
  return makeSvgDataUrl(svg);
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

function renderItems() {
  itemsGrid.innerHTML = '';
  const showHints = state.roundIndex === 0;
  state.roundItems.forEach((item, index) => {
    const btn = document.createElement('button');
    btn.className = `item-btn${state.itemsUsed.has(index) ? ' used' : ''}`;
    btn.type = 'button';
    btn.onclick = () => useItem(index);
    btn.title = item.tooltip || (item.angry ? 'Risky!' : 'Safe bet');

    if (showHints) {
      const hint = document.createElement('span');
      hint.className = `item-hint ${item.angry ? 'risky' : 'safe'}`;
      hint.textContent = item.angry ? '⚠' : '✓';
      hint.setAttribute('aria-hidden', 'true');
      btn.appendChild(hint);
    }

    const img = document.createElement('img');
    img.src = item.img;
    img.className = 'item-art';
    img.alt = `${item.name} ${ITEM_FALLBACKS[normalizeItemName(item.name)] || ''}`.trim();

    img.onerror = () => {
      img.onerror = null;
      img.src = getItemPlaceholder(item);
    };

    const label = document.createElement('span');
    label.textContent = item.name;

    btn.appendChild(img);
    btn.appendChild(label);
    itemsGrid.appendChild(btn);
  });
}

function getResponse() {
  const responses = ROUND_DATA[state.roundIndex].responses;
  return responses[Math.floor(Math.random() * responses.length)];
}

function loadRound() {
  state.itemsUsed = new Set();
  state.safeStreak = 0;
  state.roundItems = shuffle(ROUND_DATA[state.roundIndex].items);
  state.roundBeerBongTriggered = false;
  const roundData = ROUND_DATA[state.roundIndex];
  roundLabel.textContent = `Round ${state.roundIndex + 1}: ${roundData.theme}`;
  screens.game.style.background = roundData.bgGradient || 'linear-gradient(135deg, #1a1a2e, #1a1a2e)';
  speechBubble.textContent = getResponse();
  renderItems();
  updateScore();
  updateAngerBar();
  updateFace();
}

function nextRound() {
  state.score += 100;
  if (!state.roundBeerBongTriggered) state.score += 500;
  state.angerPct = Math.max(0, state.angerPct - 15);
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

function startGame() {
  state.score = 0;
  state.angerPct = 0;
  state.roundIndex = 0;
  state.beerBongCount = 0;
  state.safeStreak = 0;
  state.itemsUsed = new Set();
  state.roundItems = [];
  state.playerName = sanitizeInitials(document.getElementById('initials').value);
  showScreen('game');
  loadRound();
}

let beerBongDrain = null;
let beerBongTick = null;
let beerBongStart = 0;
let chugProgress = 0;
let tapsNeeded = 10;

function updateBeerFill() {
  const minY = 11;
  const maxY = 149;
  const glassHeight = maxY - minY;
  const ratio = Math.max(0, Math.min(1, chugProgress / tapsNeeded));
  const fillHeight = Math.round(glassHeight * ratio);
  const fillY = maxY - fillHeight;
  const foamHeight = ratio > 0.8 ? Math.max(2, Math.round((ratio - 0.8) * 50)) : 0;
  const foamY = fillY - foamHeight;
  beerFill.setAttribute('y', `${fillY}`);
  beerFill.setAttribute('height', `${fillHeight}`);
  beerFoam.setAttribute('y', `${foamY}`);
  beerFoam.setAttribute('height', `${foamHeight}`);
}

function endBeerBong(win) {
  clearInterval(beerBongDrain);
  clearInterval(beerBongTick);
  if (win) {
    const elapsed = (Date.now() - beerBongStart) / 1000;
    const bonus = Math.max(0, Math.min(100, Math.round((state.beerBongTimeLimit - elapsed) * (100 / state.beerBongTimeLimit))));
    state.score += 200 + bonus;
    state.angerPct = 0;
    updateScore();
    updateAngerBar();
    updateFace();
    showScreen('game');
    if (state.itemsUsed.size === state.roundItems.length) nextRound();
  } else {
    document.getElementById('gameover-score').textContent = `Final Score: ${state.score}`;
    saveLeaderboard();
    showScreen('gameover');
  }
}

function startBeerBong() {
  state.beerBongCount += 1;
  state.roundBeerBongTriggered = true;
  state.beerBongTimeLimit = Math.max(2.5, 5 - (state.beerBongCount - 1) * 0.25);
  tapsNeeded = 10 + (state.beerBongCount - 1) * 2;
  chugProgress = 0;
  chugBar.style.width = '0%';
  updateBeerFill();
  beerBongTimer.textContent = `${state.beerBongTimeLimit.toFixed(1)}s`;
  beerBongStart = Date.now();
  showScreen('beerbong');

  const chugBtn = document.getElementById('chug-btn');
  chugBtn.onclick = () => {
    chugProgress += 1;
    const pct = Math.min(100, (chugProgress / tapsNeeded) * 100);
    chugBar.style.width = `${pct}%`;
    updateBeerFill();
    if (chugProgress >= tapsNeeded) endBeerBong(true);
  };

  beerBongDrain = setInterval(() => {
    chugProgress = Math.max(0, chugProgress - 0.07);
    chugBar.style.width = `${Math.min(100, (chugProgress / tapsNeeded) * 100)}%`;
    updateBeerFill();
  }, 100);

  beerBongTick = setInterval(() => {
    const elapsed = (Date.now() - beerBongStart) / 1000;
    const left = Math.max(0, state.beerBongTimeLimit - elapsed);
    beerBongTimer.textContent = `${left.toFixed(1)}s`;
    if (left <= 0) endBeerBong(false);
  }, 100);
}

function useItem(index) {
  if (state.itemsUsed.has(index)) return;

  const item = state.roundItems[index];
  let smoothMove = false;
  state.itemsUsed.add(index);
  state.score += 50;

  if (item.angry) {
    state.safeStreak = 0;
    state.angerPct += 12 + state.roundIndex + Math.floor(Math.random() * 7);
    faceContainer.classList.remove('shake');
    void faceContainer.offsetWidth;
    faceContainer.classList.add('shake');
  } else {
    state.safeStreak += 1;
    if (state.safeStreak % 3 === 0) {
      state.score += 150;
      smoothMove = true;
    }
    state.angerPct += 4 + Math.floor(Math.random() * 5);
  }

  state.angerPct = Math.min(100, state.angerPct);
  speechBubble.textContent = smoothMove ? 'SMOOTH MOVE! +150' : getResponse();

  renderItems();
  updateScore();
  updateAngerBar();
  updateFace();

  if (state.angerPct >= 100) {
    startBeerBong();
    return;
  }

  if (state.itemsUsed.size === state.roundItems.length) {
    nextRound();
  }
}

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('retry-btn').addEventListener('click', () => showScreen('menu'));
document.getElementById('play-again-btn').addEventListener('click', () => showScreen('menu'));
document.getElementById('initials').addEventListener('input', (e) => {
  e.target.value = sanitizeInitials(e.target.value);
});

renderAllLeaderboards();
