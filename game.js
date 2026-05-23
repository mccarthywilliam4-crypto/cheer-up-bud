const FACE_STATES = [
  { max: 25, img: 'assets/face/annoyed.png', emoji: '😒' },
  { max: 50, img: 'assets/face/angry.png', emoji: '😠' },
  { max: 75, img: 'assets/face/fuming.png', emoji: '😡' },
  { max: 100, img: 'assets/face/volcanic.png', emoji: '🤬' },
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
  faceImg.onerror = () => {
    faceImg.style.display = 'none';
    faceEmoji.style.display = 'block';
  };
  faceImg.onload = () => {
    faceImg.style.display = 'block';
    faceEmoji.style.display = 'none';
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

function renderItems() {
  itemsGrid.innerHTML = '';
  state.roundItems.forEach((item, index) => {
    const btn = document.createElement('button');
    btn.className = `item-btn${state.itemsUsed.has(index) ? ' used' : ''}`;
    btn.type = 'button';
    btn.onclick = () => useItem(index);

    const img = document.createElement('img');
    img.src = item.img;
    img.alt = item.name;

    const fallback = document.createElement('span');
    fallback.className = 'item-fallback';
    fallback.textContent = ITEM_FALLBACKS[normalizeItemName(item.name)] || '🎁';

    img.onerror = () => {
      img.style.display = 'none';
      fallback.style.display = 'block';
    };

    const label = document.createElement('span');
    label.textContent = item.name;

    btn.appendChild(img);
    btn.appendChild(fallback);
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
  state.roundItems = shuffle(ROUND_DATA[state.roundIndex].items);
  state.roundBeerBongTriggered = false;
  roundLabel.textContent = `Round ${state.roundIndex + 1}: ${ROUND_DATA[state.roundIndex].theme}`;
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
  state.beerBongTimeLimit = Math.max(2.5, 5 - (state.beerBongCount - 1) * 0.5);
  tapsNeeded = 10 + (state.beerBongCount - 1) * 5;
  chugProgress = 0;
  chugBar.style.width = '0%';
  beerBongTimer.textContent = `${state.beerBongTimeLimit.toFixed(1)}s`;
  beerBongStart = Date.now();
  showScreen('beerbong');

  const chugBtn = document.getElementById('chug-btn');
  chugBtn.onclick = () => {
    chugProgress += 1;
    const pct = Math.min(100, (chugProgress / tapsNeeded) * 100);
    chugBar.style.width = `${pct}%`;
    if (chugProgress >= tapsNeeded) endBeerBong(true);
  };

  beerBongDrain = setInterval(() => {
    chugProgress = Math.max(0, chugProgress - 0.12);
    chugBar.style.width = `${Math.min(100, (chugProgress / tapsNeeded) * 100)}%`;
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
  state.itemsUsed.add(index);
  state.score += 50;

  if (item.angry) {
    state.angerPct += 18 + (state.roundIndex * 2) + Math.floor(Math.random() * 9);
    faceContainer.classList.remove('shake');
    void faceContainer.offsetWidth;
    faceContainer.classList.add('shake');
  } else {
    state.angerPct += 4 + Math.floor(Math.random() * 5);
  }

  state.angerPct = Math.min(100, state.angerPct);
  speechBubble.textContent = getResponse();

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
