import { CANVAS_W, CANVAS_H, GAME } from "../constants.js";

export class Bullet {
    constructor(x, y, vx, vy, color, radius = 5) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.r = radius;
        this.isOut = false;
        this.isDead = false;
    }

    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;

        const margin = GAME.BULLET_OUT_MARGIN;
        if (
            this.x < -margin || this.x > CANVAS_W + margin ||
            this.y < -margin || this.y > CANVAS_H + margin
        ) {
            this.isOut = true;
        }
    }
}
