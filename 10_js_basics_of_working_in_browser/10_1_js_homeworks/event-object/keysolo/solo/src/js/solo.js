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
