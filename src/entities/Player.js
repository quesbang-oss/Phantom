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

    update(input, dt) {
        if (this.invincibility > 0) this.invincibility -= dt;

        this.isFocus = input.isKeyDown("Shift");
        const speed = this.isFocus ? this.focusSpeed : this.speed;

        let vx = 0;
        let vy = 0;

        if (input.isKeyDown("ArrowLeft") || input.isKeyDown("a")) vx -= 1;
        if (input.isKeyDown("ArrowRight") || input.isKeyDown("d")) vx += 1;
        if (input.isKeyDown("ArrowUp") || input.isKeyDown("w")) vy -= 1;
        if (input.isKeyDown("ArrowDown") || input.isKeyDown("s")) vy += 1;

        if (input.touchActive) {
            const dx = input.touchX - this.x;
            const dy = (input.touchY - 55) - this.y;
            this.x += dx * Math.min(1, dt * 12);
            this.y += dy * Math.min(1, dt * 12);
            this.isFocus = true;
        } else {
            const length = Math.hypot(vx, vy) || 1;
            this.x += (vx / length) * speed * dt;
            this.y += (vy / length) * speed * dt;
        }

        this.x = Math.max(10, Math.min(CANVAS_W - 10, this.x));
        this.y = Math.max(10, Math.min(CANVAS_H - 10, this.y));

        this.shotTimer += dt;
        if (this.shotTimer >= PLAYER.SHOT_INTERVAL) {
            this.shotTimer -= PLAYER.SHOT_INTERVAL;
            this.shoot();
        }
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
