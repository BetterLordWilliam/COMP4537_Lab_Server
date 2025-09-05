
export class Position {

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

export class RGBColor {

    /**
     * Object to represent an RGBColor.
     * 
     * @param {Number} r Red channel value
     * @param {Number} g Green channel value
     * @param {Number} b Blue channel value
     */
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    /**
     * Returns a stirng in the format of CSS styling for the RGBColor object instance. 
     * 
     * @returns String in the format of CSS styling for this color
     */
    toStyleString() {
        return `rgb(${this.r},${this.g},${this.b})`;
    }

    /**
     * Returns a string representation of the RGBColor object.
     * 
     * @returns String for development purposes
     */
    toString() {
        return `${this.r}, ${this.g}, ${this.b}`;
    }
}

export class Utils {

    static colorMax = 256;
    static minPx = 0;
    static safetyPx = 100;

    /**
     * Returns a randomized color rgb style string.
     * 
     * @returns randomized RGBColor object 
     */
    static randomColor() {
        const rrand = Math.floor(Math.random() * Utils.colorMax);
        const grand = Math.floor(Math.random() * Utils.colorMax);
        const brand = Math.floor(Math.random() * Utils.colorMax);

        const color = new RGBColor(rrand, grand, brand);

        console.log(color);

        return color;
    }

    /**
     * Returns a random position within the browser window for an element.
     * 
     * @param {Number} buttonWidth Width of the element
     * @param {Number} buttonHeight Height of the element
     * @returns Position object containing randomized position within the browser window
     */
    static randomPosition(buttonWidth, buttonHeight) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const maxXPx = windowWidth - parseInt(buttonWidth) - Utils.safetyPx;
        const maxYPx = windowHeight - parseInt(buttonHeight) - Utils.safetyPx;
        const rx = Math.floor(
            Math.random() * ((maxXPx - Utils.minPx + 1) + Utils.minPx)
        );
        const ry = Math.floor(
            Math.random() * ((maxYPx - Utils.minPx + 1) + Utils.minPx)
        );

        const rpos = new Position(rx, ry);

        console.log(rpos.toString());

        return rpos;
    }
}
