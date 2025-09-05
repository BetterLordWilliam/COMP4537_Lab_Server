import { Utils, Position } from '/lab0/js/Utils.js';
import { RandomButton } from '/lab0/js/RandomButton.js';

const oneMS = 1000;
const twoMS = 2000;

export class Game {

    constructor() {
        this.buttons = [];
        this.buttonContainer = document.querySelector('#gameArea');
        console.log(this.buttonContainer);
    }

    clearButtons() {
        while (this.buttonContainer.firstChild) {
            this.buttonContainer.removeChild(this.buttonContainer.firstChild);
        }
        delete this.buttons;
        this.buttons = [];
    }

    startListening() {
        console.log('We will add event listeners to the buttons, they will return the order of button, we will check if it is correct');
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
            setTimeout(() => this.scramble(--numberOfButtons), twoMS);
        } else {
            console.log('Scrambling over...');
            return this.startListening();
        }
    }
    
    startGame(numberOfButtons) {
        this.clearButtons();

        const order = [];

        // Create buttons for the game
        for (let i = 0; i < numberOfButtons; i++) {
            const randomColor = Utils.randomColor();
            const randomOrder = Utils.randomOrder(1, numberOfButtons, order);
            const button = new RandomButton(randomOrder, randomColor);

            order.push(randomOrder);
            this.buttons[randomOrder - 1] = button;
        }

        // Add the buttons to the container in order
        for (const button of this.buttons) {
            this.buttonContainer.appendChild(button.button);
        }

        console.log(this.buttons);

        setTimeout(
            () => {
                for (const button of this.buttons) {
                    button.hideOrder();
                    button.positionAbsolute();
                }
                this.scramble(--numberOfButtons)
            },
            numberOfButtons * oneMS
        );
    }
}
