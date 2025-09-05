import { messages } from '/lab0/lang/en/user.js';
import { Game } from '/lab0/js/Game.js';

class IndexController {

    constructor() {
        this.startGameForm = document.querySelector('#startGameForm');
        this.inputNumber = document.querySelector('#startGameInumber');
        this.startGameButton = document.querySelector('#startGame');

        this.startGameForm.addEventListener('submit', (e) => this.startGame(e));
    }

    startGame(e) {
        e.preventDefault();

        console.log(this.inputNumber.value);
        // Annoying
        // alert(messages.test);

        this.game = new Game();
        this.game.startGame(this.inputNumber.value);
    }
}

export const controller = new IndexController();
