import { CANVAS_W, COLORS } from "../constants.js";
import { Patterns } from "../logic/Patterns.js";

function loadImage(src) {
    const image = new Image();

    image.onload = () => {
        console.log(`ボス画像読み込み成功: ${src}`);
    };

    image.onerror = () => {
        console.error(`ボス画像読み込み失敗: ${src}`);
    };

    image.src = src;

    return image;
}

export class Boss {
    constructor(game) {
        this.game = game;

        this.x = CANVAS_W / 2;
        this.y = 100;

        this.radius = 28;

        this.maxHp = 900;
        this.hp = this.maxHp;

        this.timer = 0;
        this.shotTimer = 0;

        this.isBoss = true;
        this.isDead = false;
        this.isOut = false;

        // ボス画像
        this.sprite = loadImage("assets/boss.png");
    }

    update(dt) {
        this.timer += dt;

        this.x =
            CANVAS_W / 2 +
            Math.sin(this.timer * 1.1) * 130;

        this.shotTimer += dt;

        if (this.shotTimer >= 0.22) {
            this.shotTimer = 0;

            const phase = Math.floor(
                this.game.audio.getBGMTime() / 10
            );

            const count =
                phase >= 8
                    ? 22
                    : phase >= 7
                        ? 18
                        : 14;

            const speed =
                phase >= 8
                    ? 165
                    : 135;

            const offset =
                this.timer *
                (phase >= 8 ? 1.5 : 0.8);

            this.game.entities.enemyBullets.push(
                ...Patterns.circle(
                    this,
                    count,
                    speed,
                    COLORS.BULLET_PURPLE,
                    offset
                )
            );
        }

        if (this.hp <= 0) {
            this.hp = 0;
            this.isDead = true;
            this.game.score += 100000;
        }
    }

    damage(amount) {
        this.hp -= amount;

        this.game.score += amount * 20;

        if (this.hp <= 0) {
            this.hp = 0;
            this.isDead = true;
            this.game.score += 100000;
        }
    }
}
