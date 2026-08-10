import { COLORS } from "../constants.js";
import { Patterns } from "../logic/Patterns.js";

export class Enemy {
    constructor(game, x, y, type = "normal") {
        this.game = game;

        this.x = x;
        this.y = y;

        this.type = type;

        this.hp = type === "fast" ? 8 : 15;
        this.maxHp = this.hp;

        this.radius = 14;

        this.speed = type === "fast"
            ? 110
            : 55;

        this.timer = 0;
        this.shotTimer = 0;

        this.isDead = false;
        this.isOut = false;
        this.isBoss = false;

        // 敵画像
        this.sprite = null;
    }

    update(dt) {
        this.timer += dt;
        this.shotTimer += dt;

        // 下方向へ移動
        this.y += this.speed * dt;

        // 画面外へ出たら削除
        if (this.y > 690) {
            this.isOut = true;
            return;
        }

        // =========================
        // 1秒ごとに自機狙い弾
        // =========================
        if (this.shotTimer >= 1.0) {
            this.shotTimer = 0;

            const player = this.game.entities.player;

            const bullets = Patterns.aimed(
                this,
                player,
                180,
                COLORS.BULLET_RED
            );

            this.game.entities.enemyBullets.push(
                ...bullets
            );
        }
    }

    damage(amount) {
        this.hp -= amount;

        this.game.score += amount * 10;

        if (this.hp <= 0) {
            this.hp = 0;
            this.isDead = true;

            this.game.score += 250;
        }
    }
}
