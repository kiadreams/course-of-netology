export { gameSettings, playing }


let deadCounter = 0,
  lostCounter = 0,
  playing = false,
  isTimeout = false,
  countdownTimer = null;


const gameSettings = {
  conditionToWin: 10,
  periodMinkChange: 700,
  maxTimeoutToWin: 8000,
  conditionToLose: 5,
  activeHole: 1,
};

const allHoles = document.querySelectorAll('.hole'),
  lost = document.querySelector('#lost'),
  dead = document.querySelector('#dead');


function settingInitialData() {
  lostCounter = 0;
  deadCounter = 0;
  isTimeout = false;
  playing = true;
  countdownTimer = setTimeout(() => {
    isTimeout = true;
    checkStatusGame();
  }, gameSettings.maxTimeoutToWin);
};

function updateReadings() {
  console.log(deadCounter, lostCounter);
  dead.textContent = deadCounter;
  lost.textContent = lostCounter;
}

function startGame(message) {
  if (confirm(message)) {
    settingInitialData();
  }
  updateReadings();
};

function stopGame() {
  clearTimeout(countdownTimer);
  playing = false;
  if (deadCounter === gameSettings.conditionToWin) {
    alert('Вы победили...');
  } else if (isTimeout) {
    alert('У Вас вышло время на поимку кротов - Вы проиграли...')
  } else {
    alert('Вы допустили слишком много промахов и проиграли...');
  }
}

allHoles.forEach((hole) => hole.addEventListener('click', () => {
  if (hole.classList.contains('hole_has-mole')) {
    deadCounter++;
    hole.classList.remove('hole_has-mole');
  } else {
    lostCounter++;
  }
  console.log(lostCounter, deadCounter);
  checkStatusGame();
}));

function checkStatusGame() {
  updateReadings();
  if (deadCounter === gameSettings.conditionToWin ||
      lostCounter === gameSettings.conditionToLose ||
      isTimeout) {
    stopGame();
    startGame('Хотите ещё раз сыграть?');
  }
}

alert('Перед Вами игра "Лови кротов!"');
startGame('Хотите сыграть в игру, нажмите "ОК" иначе "Cancel"');
