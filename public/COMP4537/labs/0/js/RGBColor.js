export default class RGBColor {

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
