import Position from './Position.js';
import RGBColor from './RGBColor.js';

export default class Utils {

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
