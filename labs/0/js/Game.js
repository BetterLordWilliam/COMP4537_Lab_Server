import { Utils, Position } from '/lab0/js/Utils.js';
import { RandomButton } from '/lab0/js/RandomButton.js';

export class Game {

    /**
     * Initializes a Game object instance.
     * 
     * @param {IndexController} uiController the controller of the index page
     * @param {Number} numberOfButtons the number of buttons that the game will have
     */
    constructor(uiController) {
        this.oneS = 1000;
        this.twoS = 2000;

        this.uiController = uiController;
        this.buttons = [];
        this.cButton = 0;
        this.buttonContainer = uiController.gameStateContainer;

        console.log(this.buttonContainer);
    }

    /**
     * Resets the cButton counter variable.
     */
    resetButtonCount() {
        this.cButton = 0;
    }

    /**
     * Removes buttons from gameStateContainer and deletes the array storing them.
     */
    clearButtons() {
        while (this.buttonContainer.firstChild) {
            this.buttonContainer.removeChild(this.buttonContainer.firstChild);
        }
        this.buttons = [];
    }
    
    /**
     * Creates the RandomButton objects for the game instance.
     */
    createGameButtons() {
        // Create buttons for the game
        for (let i = 0; i < this.numberOfButtons; i++) {
            const randomColor = Utils.randomColor();
            const button = new RandomButton(i, randomColor);

            this.buttons.push(button);
            this.buttonContainer.appendChild(button.button);
        }

        console.log(this.buttons);
    }

    /**
     * Starts the scrambling of button positions (recursive because of `setTimout` implementation).
     */
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
            this.numberOfButtons * this.oneS
        );
    }

    /**
     * Scramles the buttons positions in the game container.
     * 
     * @param {Number} numberOfButtons number of times to scramble = number of buttons
     * @returns 
     */
    scramble(numberOfButtons) {
        for (const button of this.buttons) {
            const rpos = Utils.randomPosition(
                button.button.style.width,
                button.button.style.height
            );

            button.setPosition(rpos);
        }

        if (numberOfButtons > 0) {
            setTimeout(() => this.scramble(numberOfButtons - 1), this.twoS);
        } else {
            return this.startListening();
        }
    }

    /**
     * Attaches event listeners to the game buttons that check the order of the buttons.
     */
    startListening() {
        for (const button of this.buttons) {
            button.button.addEventListener('click', (e) => {
                this.checkOrder(button);
            });
        }
    }

    /**
     * Handles the button clicked event and checks the order.
     * 
     * @param {RandomButton} button RandomButton instance that was clicked
     */
    checkOrder(button) {
        if (button.order === this.cButton) {
            button.showOrder();
            // button.positionRelative();
            // button.setPosition(new Position(0, 0));

            if (this.cButton === this.numberOfButtons - 1) {
                this.clearButtons();
                this.uiController.gameWon();
            }

            this.cButton++;

        } else {
            this.clearButtons();
            this.uiController.gameFailed();
        }
    }

    /**
     * Creates game objects.
     * 
     * @param {Number} numberOfButtons the number of buttons to start the game with
     */
    startGame(numberOfButtons) {
        this.numberOfButtons = numberOfButtons;

        this.clearButtons();
        this.resetButtonCount();
        this.createGameButtons();
        this.startScrambling();
    }
}
