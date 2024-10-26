class Phrase {

  constructor(gameCard, mode) {
    this.gameCard = gameCard;
    this.mode = mode
    this.startTime = 0;
    this.numOfSymbols = 0;
    this.typedSymbols = 0;
    this.mistakes = 0;
    this.isPhraseOver = false;
  }

  showPrase() {
    this.phraseElement = this.createPhraseElement();
    this.gameCard.prepend(this.phraseElement);
    this.isPhraseOver = false;
  }

  createPhraseElement() {
    const phraseElement = document.createElement('div');
    phraseElement.setAttribute('tabindex', '-1');
    phraseElement.classList.add('phrase');
    this.renderPhrase(phraseElement, this.generatePhrase());
    return phraseElement
  }

  checkCurrentSymbol(key) {
    this.typedSymbols++;
    if (this.currentSymbol.classList.contains('start')) {
      this.startTime = new Date().getTime();
    }
    if (this.currentSymbol.textContent === key) {
      this.currentSymbol.classList.add('symbol_correct');
    } else {
      this.currentSymbol.classList.add('symbol_wrong');
      this.mistakes++;
    }
    this.nextCurrentSymbol();
  }

  nextCurrentSymbol() {
    this.currentSymbol.classList.remove('current');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol === null) {
      this.isPhraseOver = true;
    } else {
      this.currentSymbol.classList.add('current');
    }
  }

  generatePhrase() {
    const phrase = [];
    if (this.mode === 3) {
      phrase.push(this.getEngWord());
      phrase.push(this.getRusWord());
    } else {
      for (let i = 0; i < 2; i++) {
        phrase.push(this.mode === 1 ? this.getEngWord() : this.getRusWord());
      }
    }
    return phrase.join(' ');
  }

  renderPhrase(element, phrase) {
    let htmlPhrase = [];
    [...phrase].forEach((symbol, i) => {
      const extraClass = i === 0 ? ' current start' : '';
      htmlPhrase.push(`<span class="symbol${extraClass}">${symbol}</span>`);
    });
    htmlPhrase = htmlPhrase.join('');
    element.innerHTML = htmlPhrase;

    this.numOfSymbols = phrase.length;
    this.currentSymbol = element.querySelector('.current');
  }


  getEngWord(numOfWords) {
    const words = [
      'bob in',
      'awesome man',
      'course of netology',
      'hello word',
      'kitty',
      'rock and',
      'youtube is alive',
      'popcorn is tasty',
      'cinema',
      'love',
      'javascript is cool'
    ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  getRusWord(numOfWords) {
    const words = [
      'собака',
      'кот',
      'поговорили',
      'надо сходить',
      'сделали',
      'не знаю',
      'в это время',
      'мы пойдём домой',
      'это было всегда',
      'всё заканчивается',
      'не скажу'
    ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }
}


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
      if (!(event.shiftKey|| event.metaKey || event.altKey)) {
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

class Game {

  constructor(gameCard) {
    this.gameMenu = gameCard.querySelector('#game');
    this.titleMenu = gameCard.querySelector('.game_title');
    this.modesMenu = gameCard.querySelector('.modes');
    this.resultMenu = gameCard.querySelector('.results')

    this.addListeners();
  }

  startGame(mode) {
    this.showGameMenu();
    this.gameEngine = new GameEngine(this.gameMenu, mode);
    this.gameEngine.run();
    const gameplay = setInterval(() => {
      if (this.gameEngine.isGameOver) {
        clearInterval(gameplay);
        this.endGame();
      }
    }, 10);
  }

  endGame() {
    this.showResultMenu();
    this.renderResults(this.gameEngine.getResults());
  }

  renderResults(results) {
    const { typedSymbols, mistakes, time, speed, grade } = results
    this.resultMenu.querySelectorAll('span').forEach((elem, i) => {
      elem.textContent = [typedSymbols, mistakes, time.toFixed(2), speed][i]
    });
    this.resultMenu.querySelector('i').textContent = grade;
  }

  addListeners() {
    this.modesMenu.querySelectorAll('.butt').forEach((btn, i) => {
      btn.onclick = () => {
        this.startGame(i + 1);
      }
    });

    this.resultMenu.querySelector('.butt').onclick = () => {
      this.showTitleMemu();
    };

    this.titleMenu.querySelector('.butt').onclick = () => {
      this.showModesMenu();
    };

  }

  showTitleMemu() {
    this.resultMenu.classList.add('hide_block')
    this.gameMenu.classList.add('hide_block');
    this.modesMenu.classList.add('hide_block');
    this.titleMenu.classList.remove('hide_block');
  }

  showModesMenu() {
    this.resultMenu.classList.add('hide_block')
    this.gameMenu.classList.add('hide_block');
    this.titleMenu.classList.add('hide_block');
    this.modesMenu.classList.remove('hide_block');
  }

  showResultMenu() {
    this.modesMenu.classList.add('hide_block');
    this.titleMenu.classList.add('hide_block');
    this.gameMenu.classList.add('hide_block');
    this.resultMenu.classList.remove('hide_block')
  }

  showGameMenu() {
    this.resultMenu.classList.add('hide_block')
    this.modesMenu.classList.add('hide_block');
    this.titleMenu.classList.add('hide_block');
    this.gameMenu.classList.remove('hide_block');
  }

}


const game = new Game(document.querySelector('.card'));
