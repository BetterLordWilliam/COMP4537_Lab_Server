import { Position } from '/lab0/js/utils.js';

export class RandomButton {

    constructor(order, color) {
        const button = document.createElement('button');

        this.order = order
        this.button = button;
        this.button.textContent = order.toString();
        this.button.id = `button${order}`;
        this.button.style.width = '10em';
        this.button.style.height = '5em';
        this.button.style.backgroundColor = '';
        this.button.style.backgroundColor = color;
    }

    hideOrder() {
        this.button.textContent = '';
    }

    showOrder() {
        this.button.textContent = this.order.toString();
    }

    positionAbsolute() {
        this.button.style.position = 'absolute';
    }

    positionRelative() {
        this.button.style.position = 'relative';
    }

    /**
     * @param {Position} position randomized position.
     */
    setPosition(position) {
        this.button.style.left = `${position.x}px`;
        this.button.style.top = `${position.y}px`;
    }

    move() {

    }
}
