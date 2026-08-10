import { COLORS } from "../constants.js";
import { Patterns } from "../logic/Patterns.js";

const ENEMY_IMAGES = {
    normal: "assets/enemy.png",
    fast: "assets/enemy_fast.png"
};

function loadImage(src) {
    const image = new Image();

    image.src = src;

    image.onerror = () => {
        console.error(`敵画像の読み込みに失敗: ${src}`);
    };

    return image;
}

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

        // 敵の見た目
        this.sprite = loadImage(
            ENEMY_IMAGES[type] ?? ENEMY_IMAGES.normal
        );
    }

    update(dt) {
        this.timer += dt;
        this.shotTimer += dt;

        this.y += this.speed * dt;

        if (this.y > 690) {
            this.isOut = true;
            return;
        }

        if (this.shotTimer >= 1.0) {
            this.shotTimer = 0;

            const player = this.game.entities.player;

            const bullets = Patterns.aimed(
                this,
                player,
                180,
                COLORS.BULLET_RED
            );

            this.game.entities.enemyBullets.push(...bullets);
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
