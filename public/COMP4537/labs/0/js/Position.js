export default class Position {

    /**
     * Class to represent x,y cartesian style coordinate.
     * 
     * @param {Number} x X position
     * @param {Number} y Y position
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `${this.x}, ${this.y}`;
    }
}
