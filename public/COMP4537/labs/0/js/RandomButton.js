import RGBColor from './RGBColor.js';
import Position from './Position.js';

export default class RandomButton {

    /**
     * Initializes a RandomButton instance.
     * 
     * @param {Number} order The assigned order of this butto
     * @param {RGBColor} color Style string of this button (random colour)
     */
    constructor(game, order, color) {
        const button = document.createElement('button');

        this.game = game;
        this.order = order;
        this.vorder = order + 1;
        this.button = button;
        this.button.textContent = this.vorder.toString();
        this.button.id = `button${order}`;
        this.button.style.width = '10em';
        this.button.style.height = '5em';
        this.button.style.backgroundColor = color.toStyleString();
        this.handleClickedb = this.handleClicked.bind(this);
    }

    /**
     * Shows the order of the button in the text content of the button.
     */
    hideOrder() {
        this.button.textContent = '';
    }

    /**
     * Hides the order of the button in the text content of the button.
     */
    showOrder() {
        this.button.textContent = this.vorder.toString();
    }

    /**
     * Sets the position of the button to be absolute.
     */
    positionAbsolute() {
        this.button.style.position = 'absolute';
    }

    /**
     * Sets the position of the button to be relative.
     */
    positionRelative() {
        this.button.style.position = 'relative';
    }

    /**
     * Assigns the position of the button the given Position object.
     * 
     * @param {Position} position randomized position.
     */
    setPosition(position) {
        this.button.style.left = `${position.x}px`;
        this.button.style.top = `${position.y}px`;
    }

    /**
     * Attaches event listener for the clicked event.
     */
    attachEventListener() {
        this.button.addEventListener('click', this.handleClickedb);
    }

    /**
     * Removes event listener for the cliced event.
     */
    removeEventListener() {
        this.button.removeEventListener('click', this.handleClickedb);
    }

    /**
     * Handles the button being clicked.
     */
    handleClicked() {
        this.showOrder();
        this.removeEventListener();
        this.game.checkOrder(this);
    }
}
