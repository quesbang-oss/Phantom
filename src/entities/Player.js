import { CANVAS_W, CANVAS_H, PLAYER, COLORS } from "../constants.js";
import { Bullet } from "./Bullet.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.reset();
    }

    reset() {
        this.x = PLAYER.START_X;
        this.y = PLAYER.START_Y;
        this.radius = PLAYER.RADIUS;
        this.grazeRadius = PLAYER.GRAZE_RADIUS;
        this.speed = PLAYER.SPEED;
        this.focusSpeed = PLAYER.FOCUS_SPEED;
        this.isFocus = false;
        this.lives = PLAYER.LIVES;
        this.bombs = PLAYER.BOMBS;
        this.invincibility = 0;
        this.shotTimer = 0;
    }

    // Player.js
update(input, dt) {
    this.isFocus = input.isKeyDown("Shift");

    const speed = this.isFocus
        ? this.focusSpeed     // 120
        : this.speed;         // 300

    let x = 0;
    let y = 0;

    if (input.isKeyDown("ArrowLeft") || input.isKeyDown("a")) x--;
    if (input.isKeyDown("ArrowRight") || input.isKeyDown("d")) x++;
    if (input.isKeyDown("ArrowUp") || input.isKeyDown("w")) y--;
    if (input.isKeyDown("ArrowDown") || input.isKeyDown("s")) y++;

    const len = Math.hypot(x, y) || 1;

    this.x += (x / len) * speed * dt;
    this.y += (y / len) * speed * dt;

    this.x = Math.max(8, Math.min(472, this.x));
    this.y = Math.max(8, Math.min(632, this.y));
}

    shoot() {
        const list = this.game.entities.bullets;
        list.push(new Bullet(this.x - 7, this.y - 10, 0, -620, COLORS.PLAYER, 3));
        list.push(new Bullet(this.x + 7, this.y - 10, 0, -620, COLORS.PLAYER, 3));
    }

    hit() {
        if (this.invincibility > 0) return;
        this.lives--;
        this.invincibility = PLAYER.INVINCIBLE_SEC;
        this.game.entities.enemyBullets.length = 0;

        if (this.lives <= 0) {
            this.game.gameOver();
        }
    }
}
