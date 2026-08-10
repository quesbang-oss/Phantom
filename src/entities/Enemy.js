import { CANVAS_W, COLORS } from "../constants.js";
import { Bullet } from "./Bullet.js";
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
        this.speed = type === "fast" ? 110 : 55;
        this.timer = 0;
        this.shotTimer = 0;
        this.isDead = false;
        this.isBoss = false;
    }

    update(dt) {
        this.timer += dt;
        this.shotTimer += dt;
        this.y += this.speed * dt;

        if (this.shotTimer >= (this.type === "fast" ? 0.9 : 1.4)) {
            this.shotTimer = 0;
            const target = this.game.entities.player;
            const bullets = Patterns.aimed(this, target, this.type === "fast" ? 180 : 145, COLORS.BULLET_RED);
            this.game.entities.enemyBullets.push(...bullets);
        }

        if (this.y > 690) this.isOut = true;
    }

    damage(amount) {
        this.hp -= amount;
        this.game.score += amount * 10;
        if (this.hp <= 0) {
            this.isDead = true;
            this.game.score += 250;
        }
    }
}
