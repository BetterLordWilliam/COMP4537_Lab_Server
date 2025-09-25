export class Math {
    static PI = 3.14159;

    /**
     * I think you can infer what this is doing. 
     * 
     * @param {Number} width 
     * @param {Number} height 
     * @returns 
     */
    static recArea(width, height) {
        return width * height;
    }

    /**
     * I think you can infer what this is doing.
     * @param {Number} radius 
     * @returns 
     */
    static circArea(radius) {
        return Math.PI * radius * radius;
    }
}
