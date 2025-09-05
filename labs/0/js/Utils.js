const colorMax = 256;
const minPx = 0;
const safetyPx = 100;

export class Position {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `${this.x}, ${this.y}`;
    }
}

export class Utils {

    static randomColor() {
        const rrand = Math.floor(Math.random() * colorMax);
        const grand = Math.floor(Math.random() * colorMax);
        const brang = Math.floor(Math.random() * colorMax);

        const color = `rgb(${rrand}, ${grand}, ${brang})`;

        return color;
    }

    static randomOrder(min, max, exclude) {
        while (true) {
            const order = Math.floor(Math.random() * (max - min + 1) + min);
            if (!exclude.includes(order))
                return order;
        }
    }

    static randomPosition(buttonWidth, buttonHeight) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const maxXPx = windowWidth - parseInt(buttonWidth) - safetyPx;
        const maxYPx = windowHeight - parseInt(buttonHeight) - safetyPx;
        const rx = Math.floor(Math.random() * ((maxXPx - minPx + 1) + minPx));
        const ry = Math.floor(Math.random() * ((maxYPx - minPx + 1) + minPx));
        const rpos = new Position(rx, ry);

        console.log(rpos.toString());

        return rpos;
    }
}
