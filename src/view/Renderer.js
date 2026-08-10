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
        ctx.strokeStyle = "rgba(100,100,255,.16)";
        ctx.lineWidth = 1;

        for (let i = 0; i < 7; i++) {
            const x = (i * 80 + 20) % CANVAS_W;
            ctx.beginPath();
            ctx.moveTo(x, this.bgY);
            ctx.lineTo(x, this.bgY + 130);
            ctx.stroke();
        }
    }

    drawBullets(game) {
        for (const b of game.entities.enemyBullets) this.drawBullet(b);
        for (const b of game.entities.bullets) this.drawBullet(b);
    }

    drawBullet(b) {
        const ctx = this.ctx;
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = b.color;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = b.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
    }

    drawEnemies(game) {
        const ctx = this.ctx;

        for (const e of game.entities.enemies) {
            ctx.save();
            ctx.shadowBlur = e.isBoss ? 22 : 10;
            ctx.shadowColor = e.isBoss ? COLORS.BOSS : COLORS.ENEMY;
            ctx.fillStyle = e.isBoss ? COLORS.BOSS : COLORS.ENEMY;
            ctx.beginPath();
            ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
            ctx.fill();

            if (e.isBoss) {
                const width = 240;
                ctx.fillStyle = "rgba(255,255,255,.2)";
                ctx.fillRect(e.x - width / 2, e.y - 50, width, 5);
                ctx.fillStyle = COLORS.BOSS;
                ctx.fillRect(e.x - width / 2, e.y - 50, width * Math.max(0, e.hp / e.maxHp), 5);
            }
            ctx.restore();
        }
    }

    drawPlayer(player) {
        const ctx = this.ctx;
        if (player.invincibility > 0 && Math.floor(player.invincibility * 12) % 2 === 0) return;

        ctx.save();
        ctx.shadowBlur = 14;
        ctx.shadowColor = COLORS.PLAYER;
        ctx.fillStyle = COLORS.PLAYER;
        ctx.beginPath();
        ctx.arc(player.x, player.y, 8, 0, Math.PI * 2);
        ctx.fill();

        if (player.isFocus) {
            ctx.shadowBlur = 0;
            ctx.fillStyle = "#fff";
            ctx.beginPath();
            ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }

    drawUI(game) {
        const ctx = this.ctx;
        const p = game.entities.player;

        ctx.save();
        ctx.font = "bold 14px monospace";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "left";
        ctx.fillText(`SCORE ${String(game.score).padStart(8, "0")}`, 12, 22);
        ctx.fillText(`GRAZE ${game.graze}`, 12, 42);
        ctx.fillText(`LIFE ${p.lives}  BOMB ${p.bombs}`, 12, 62);
        ctx.restore();
    }
}
