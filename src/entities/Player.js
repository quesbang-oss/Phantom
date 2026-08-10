import {
    CANVAS_W,
    CANVAS_H,
    PLAYER,
    COLORS
} from "../constants.js";

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

        // ショットタイマー
        this.shotTimer = 0;
    }

    update(input, dt) {
        // =========================
        // 無敵時間
        // =========================
        if (this.invincibility > 0) {
            this.invincibility -= dt;
        }

        // =========================
        // 低速移動
        // =========================
        this.isFocus = input.isKeyDown("Shift");

        const speed = this.isFocus
            ? this.focusSpeed
            : this.speed;

        let moveX = 0;
        let moveY = 0;

        if (
            input.isKeyDown("ArrowLeft") ||
            input.isKeyDown("a")
        ) {
            moveX -= 1;
        }

        if (
            input.isKeyDown("ArrowRight") ||
            input.isKeyDown("d")
        ) {
            moveX += 1;
        }

        if (
            input.isKeyDown("ArrowUp") ||
            input.isKeyDown("w")
        ) {
            moveY -= 1;
        }

        if (
            input.isKeyDown("ArrowDown") ||
            input.isKeyDown("s")
        ) {
            moveY += 1;
        }

        // =========================
        // 斜め移動の速度補正
        // =========================
        const length = Math.hypot(moveX, moveY);

        if (length > 0) {
            moveX /= length;
            moveY /= length;

            this.x += moveX * speed * dt;
            this.y += moveY * speed * dt;
        }

        // =========================
        // スマホ操作
        // =========================
        if (input.touchActive) {
            const dx = input.touchX - this.x;
            const dy = input.touchY - this.y;

            this.x += dx * Math.min(1, dt * 12);
            this.y += dy * Math.min(1, dt * 12);

            // スマホは常時低速扱い
            this.isFocus = true;
        }

        // =========================
        // 画面外防止
        // =========================
        this.x = Math.max(
            8,
            Math.min(CANVAS_W - 8, this.x)
        );

        this.y = Math.max(
            8,
            Math.min(CANVAS_H - 8, this.y)
        );

        // =========================
        // 自動ショット
        // =========================
        this.shotTimer += dt;

        while (
            this.shotTimer >= PLAYER.SHOT_INTERVAL
        ) {
            this.shotTimer -= PLAYER.SHOT_INTERVAL;
            this.shoot();
        }
    }

    shoot() {
    const bulletLeft = new Bullet(
        this.x - 6,
        this.y - 12,
        0,
        -620,
        COLORS.PLAYER,
        4
    );

    const bulletRight = new Bullet(
        this.x + 6,
        this.y - 12,
        0,
        -620,
        COLORS.PLAYER,
        4
    );

    this.game.entities.bullets.push(
        bulletLeft,
        bulletRight
    );
}

    hit() {
        if (this.invincibility > 0) {
            return;
        }

        this.lives--;

        this.invincibility =
            PLAYER.INVINCIBLE_SEC;

        // 被弾時に敵弾を消す
        this.game.entities.enemyBullets.length = 0;

        if (this.lives <= 0) {
            this.game.gameOver();
        }
    }
}
