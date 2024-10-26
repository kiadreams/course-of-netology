class GameEngine {

  constructor(gameMenu, mode) {
    this.gameMenu = gameMenu;
    this.mode = mode;
    this.rounds = 1;
    this.allSymbols = 0;
    this.allTypedSymbols = 0;
    this.allMistakes = 0;
    this.allTime = 0;
    this.isGameOver = true;
    this.currRound = 0;
  }

  run() {
    this.isGameOver = false;
    this.currRound = 0;
    this.createPhrase();
  }

  createPhrase() {
    const timerStatus = document.querySelector('.timer_status');
    this.currRound++;
    this.phrase = new Phrase(this.gameMenu, this.mode);
    this.phrase.showPrase();
    this.addPhraseListener();
    timerStatus.textContent = this.phrase.numOfSymbols;

    this.timeout = setTimeout(() => {
      this.nextRound();
    }, this.phrase.numOfSymbols * 1000);

    this.timer = setInterval(() => {
      --timerStatus.textContent;
    }, 1000);
  }

  stop() {
    this.updateStatistics();
    this.isGameOver = true;
  }

  addPhraseListener() {
    this.phrase.phraseElement.focus();
    this.phrase.phraseElement.addEventListener('keydown', (event) => {
      if (!(event.shiftKey || event.metaKey || event.altKey)) {
        this.checkKey(event.key);
      }
    });
  }

  checkKey(key) {
    this.phrase.checkCurrentSymbol(key);
    if (this.phrase.isPhraseOver) {
      this.nextRound();
    }
  }

  nextRound() {
    if (this.currRound < this.rounds) {
      this.updateStatistics();
      this.createPhrase();
    } else {
      this.stop()
    }
  }

  updateStatistics() {
    clearTimeout(this.timeout);
    clearInterval(this.timer);
    this.allSymbols += this.phrase.numOfSymbols;
    this.allTypedSymbols += this.phrase.typedSymbols;
    if (this.phrase.startTime) {
      this.allTime += (new Date().getTime() - this.phrase.startTime) / 1000;
    }
    this.allMistakes += this.phrase.mistakes;
    this.phrase.phraseElement.remove();
  }

  getResults() {
    const correctSymbols = this.allTypedSymbols - this.allMistakes;
    let speed = 0;
    if (this.allTime) {
      speed = Math.round(60 / this.allTime * this.allTypedSymbols);
    }
    let errorRate = 1 - this.allMistakes / correctSymbols;
    errorRate = errorRate < 0 ? 0 : errorRate;
    const results = {
      typedSymbols: this.allTypedSymbols,
      mistakes: this.allMistakes,
      speed: speed,
      time: this.allTime,
      grade: this.getGrade(speed * errorRate),
    };
    return results;
  }

  getGrade(score) {
    if (score < 50) {
      return 'ОЧЕНЬ ПЛОХО';
    } else if (score < 80) {
      return 'ПЛОХОВАСТЕНЬКО';
    } else if (score < 100) {
      return 'МОЖНО И ЛУЧШЕ';
    } else if (score < 130) {
      return 'ХОРОШО';
    } else if (score < 150) {
      return 'ОЧЕНЬ ХОРОШО';
    } else if (score < 170) {
      return 'ОТЛИЧНО';
    } else if (score < 200) {
      return 'ВЕЛИКОЛЕПНО';
    } else {
      return 'ВАМ НЕТ РАВНЫХ';
    }
  }

}
