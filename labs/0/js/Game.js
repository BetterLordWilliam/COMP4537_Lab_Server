import { Utils, Position } from '/lab0/js/Utils.js';
import { RandomButton } from '/lab0/js/RandomButton.js';

const oneMS = 1000;
const twoMS = 2000;

export class Game {

    constructor(uiController, numberOfButtons) {
        this.uiController = uiController;
        this.numberOfButtons = numberOfButtons;
        this.buttons = [];
        this.cButton = 0;
        this.buttonContainer = document.querySelector('#gameArea');
        console.log(this.buttonContainer);
    }

    resetButtonCount() {
        this.cButton = 0;
    }

    clearButtons() {
        while (this.buttonContainer.firstChild) {
            this.buttonContainer.removeChild(this.buttonContainer.firstChild);
        }
        delete this.buttons;
        this.buttons = [];
    }
    
    createGameButtons() {
        // Create buttons for the game
        for (let i = 0; i < this.numberOfButtons; i++) {
            const randomColor = Utils.randomColor();
            const button = new RandomButton(i, randomColor);

            this.buttons.push(button);
            this.buttonContainer.appendChild(button.button);
        }

        // Add the buttons to the container in order
        for (const button of this.buttons) {
            this.buttonContainer.appendChild(button.button);
        }

        console.log(this.buttons);
    }

    startScrambling() {
        // Start scrambling the buttons
        setTimeout(
            () => {
                for (const button of this.buttons) {
                    button.hideOrder();
                    button.positionAbsolute();
                }
                this.scramble(this.numberOfButtons - 1)
            },
            this.numberOfButtons * oneMS
        );
    }

    scramble(numberOfButtons) {
        console.log('Scrambling...');

        for (const button of this.buttons) {
            const rpos = Utils.randomPosition(
                button.button.style.width,
                button.button.style.height
            );

            button.setPosition(rpos);
        }

        if (numberOfButtons > 0) {
            setTimeout(() => this.scramble(numberOfButtons - 1), twoMS);
        } else {
            console.log('Scrambling over...');
            return this.startListening();
        }
    }

    startListening() {
        for (const button of this.buttons) {
            button.button.addEventListener('click', (e) => {
                this.checkOrder(button, button.order);
            });
        }
    }

    stopListening() {
        console.log('We are DONE listening now!! SO angy. 😡.');
    }

    checkOrder(button, buttonOrder) {
        console.log(buttonOrder);
        console.log(this.cButton);
        console.log(this.numberOfButtons);

        if (buttonOrder === this.cButton) {
            button.showOrder();
            button.positionRelative();
            button.setPosition(new Position(0, 0));

            if (this.cButton === this.numberOfButtons - 1) {
                this.endGame();
                this.stopListening();
                this.uiController.gameWon();
            }

            this.cButton++;

        } else {
            this.endGame();
            this.stopListening();
            this.uiController.gameFailed();
        }
    }

    endGame() {
        this.stopListening();
        this.clearButtons();
    }

    startGame() {
        this.uiController.gameState();
        this.clearButtons();
        this.resetButtonCount();
        this.createGameButtons();
        this.startScrambling();
    }
}
