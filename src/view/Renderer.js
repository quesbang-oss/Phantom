import { COLORS, CANVAS_W, CANVAS_H } from "../constants.js";

export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.bgY = 0;
    }

    render(game) {
        this.drawBackground();
        this.drawEnemies(game);
        this.drawBullets(game);
        this.drawPlayer(game.entities.player);
        this.drawUI(game);
    }

    drawBackground() {
        const ctx = this.ctx;

        ctx.fillStyle = "#050510";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

        this.bgY = (this.bgY + 2) % CANVAS_H;

        ctx.strokeStyle = "rgba(100, 100, 255, 0.16)";
        ctx.lineWidth = 1;

        for (let i = 0; i < 7; i++) {
            const x = (i * 80 + 20) % CANVAS_W;

            ctx.beginPath();
            ctx.moveTo(x, this.bgY);
            ctx.lineTo(x, this.bgY + 130);
            ctx.stroke();
        }
    }

    drawEnemies(game) {
        const ctx = this.ctx;

        for (const e of game.entities.enemies) {
            ctx.save();

            // 敵画像が設定されている場合
            if (
                e.sprite &&
                e.sprite.complete &&
                e.sprite.naturalWidth > 0
            ) {
                const size = e.isBoss ? 96 : 48;

                ctx.shadowBlur = e.isBoss ? 22 : 10;
                ctx.shadowColor = e.isBoss
                    ? COLORS.BOSS
                    : COLORS.ENEMY;

                ctx.drawImage(
                    e.sprite,
                    e.x - size / 2,
                    e.y - size / 2,
                    size,
                    size
                );
            }

            // 画像がない場合は仮の円
            else {
                ctx.shadowBlur = e.isBoss ? 22 : 10;
                ctx.shadowColor = e.isBoss
                    ? COLORS.BOSS
                    : COLORS.ENEMY;

                ctx.fillStyle = e.isBoss
                    ? COLORS.BOSS
                    : COLORS.ENEMY;

                ctx.beginPath();
                ctx.arc(
                    e.x,
                    e.y,
                    e.radius,
                    0,
                    Math.PI * 2
                );

                ctx.fill();
            }

            // ボスHPバー
            if (e.isBoss) {
                const width = 240;
                const height = 5;

                const hpRate = Math.max(
                    0,
                    Math.min(1, e.hp / e.maxHp)
                );

                ctx.shadowBlur = 0;

                ctx.fillStyle = "rgba(255,255,255,0.2)";

                ctx.fillRect(
                    e.x - width / 2,
                    e.y - 60,
                    width,
                    height
                );

                ctx.fillStyle = COLORS.BOSS;

                ctx.fillRect(
                    e.x - width / 2,
                    e.y - 60,
                    width * hpRate,
                    height
                );
            }

            ctx.restore();
        }
    }

    drawBullets(game) {
        for (const bullet of game.entities.enemyBullets) {
            this.drawBullet(bullet);
        }

        for (const bullet of game.entities.bullets) {
            this.drawBullet(bullet);
        }
    }

    drawBullet(bullet) {
        const ctx = this.ctx;

        ctx.save();

        ctx.shadowBlur = 10;
        ctx.shadowColor = bullet.color;

        ctx.fillStyle = "#ffffff";

        ctx.beginPath();
        ctx.arc(
            bullet.x,
            bullet.y,
            bullet.r,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.strokeStyle = bullet.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
    }

    drawPlayer(player) {
        const ctx = this.ctx;

        if (
            player.invincibility > 0 &&
            Math.floor(player.invincibility * 12) % 2 === 0
        ) {
            return;
        }

        ctx.save();

        ctx.shadowBlur = 14;
        ctx.shadowColor = COLORS.PLAYER;
        ctx.fillStyle = COLORS.PLAYER;

        ctx.beginPath();
        ctx.arc(
            player.x,
            player.y,
            8,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // 低速時の当たり判定
        if (player.isFocus) {
            ctx.shadowBlur = 0;

            ctx.fillStyle = "#ffffff";

            ctx.beginPath();
            ctx.arc(
                player.x,
                player.y,
                player.radius,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }

        ctx.restore();
    }

    drawUI(game) {
        const ctx = this.ctx;
        const player = game.entities.player;

        ctx.save();

        ctx.font = "bold 14px monospace";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "left";

        ctx.fillText(
            `SCORE ${String(game.score).padStart(8, "0")}`,
            12,
            22
        );

        ctx.fillText(
            `GRAZE ${game.graze}`,
            12,
            42
        );

        ctx.fillText(
            `LIFE ${player.lives}  BOMB ${player.bombs}`,
            12,
            62
        );

        ctx.restore();
    }
}
