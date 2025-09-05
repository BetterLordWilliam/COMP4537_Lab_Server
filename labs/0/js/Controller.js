import { messages } from '/lab0/lang/en/user.js';
import { Game } from '/lab0/js/Game.js';

class IndexController {

    constructor() {
        this.startGameForm = document.querySelector('#startGameForm');
        this.inputNumber = document.querySelector('#startGameInumber');
        this.startGameButton = document.querySelector('#startGame');
        this.gameContainer = document.querySelector('#gameContainer');

        this.startGameForm.addEventListener('submit', (e) => this.startGame(e));
    }

    defaultState() {
        console.log('Do something');
    }

    gameState() {
        console.log('Do something');
    }

    gameFailed() {
        delete this.game;
        alert(messages.wrongOrder);
        this.defaultState();
    }

    gameWon() {
        delete this.game;
        alert(messages.allMessagesSameOrder);
        this.defaultState();
    }

    startGame(e) {
        e.preventDefault();

        console.log(this.inputNumber.value);

        this.gameState();
        this.game = new Game(this, this.inputNumber.value);
        this.game.startGame();
    }
}

export const controller = new IndexController();
