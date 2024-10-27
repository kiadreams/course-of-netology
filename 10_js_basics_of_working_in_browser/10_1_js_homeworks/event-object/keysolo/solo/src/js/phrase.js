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
