import { Messages } from '/lab0/lang/en/User.js';
import { Game } from '/lab0/js/Game.js';

class IndexController {

    /**
     * Constructs an instance of the IndexController object.
     */
    constructor() {
        this.startGameForm = document.querySelector('#startGameForm');
        this.inputNumber = document.querySelector('#startGameInumber');
        this.startGameButton = document.querySelector('#startGame');
        this.defaultStateContainer = document.querySelector('#defaultState');
        this.gameStateContainer = document.querySelector('#gameState');

        this.game = new Game(this);

        this.startGameForm.addEventListener('submit', (e) => this.startGame(e));
    }

    /**
     * Shows the UI default state.
     */
    defaultState() {
        this.defaultStateContainer.hidden = false;
        this.gameStateContainer.hidden = true;
    }

    /**
     * Shows the UI game state.
     */
    gameState() {
        this.defaultStateContainer.hidden = true;
        this.gameStateContainer.hidden = false;
    }

    /**
     * Handles game failure.
     */
    gameFailed() {
        alert(Messages.gameFail);
        this.defaultState();
    }

    /**
     * Handles game winning.
     */
    gameWon() {
        alert(Messages.gameWon);
        this.defaultState();
    }

    /**
     * Event handler for the start game event.
     * 
     * @param {Event} e 
     */
    startGame(e) {
        e.preventDefault();

        console.log(this.inputNumber.value);

        this.gameState();
        this.game.startGame(this.inputNumber.value);
    }
}

export const controller = new IndexController();
