import { Position, RGBColor } from '/lab0/js/utils.js';

export class RandomButton {

    /**
     * Initializes a RandomButton instance.
     * 
     * @param {Number} order The assigned order of this butto
     * @param {RGBColor} color Style string of this button (random colour)
     */
    constructor(order, color) {
        const button = document.createElement('button');

        this.order = order
        this.button = button;
        this.button.textContent = order.toString();
        this.button.id = `button${order}`;
        this.button.style.width = '10em';
        this.button.style.height = '5em';
        this.button.style.backgroundColor = color.toStyleString();
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
        this.button.textContent = this.order.toString();
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
}
