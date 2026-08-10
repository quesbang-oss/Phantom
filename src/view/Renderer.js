drawEnemies(game) {
    const ctx = this.ctx;

    for (const e of game.entities.enemies) {
        ctx.save();

        // ==============================
        // 敵画像が設定されている場合
        // ==============================
        if (e.sprite && e.sprite.complete && e.sprite.naturalWidth > 0) {

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

        // ==============================
        // 画像がまだない場合の仮描画
        // ==============================
        } else {

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

        // ==============================
        // ボスHPバー
        // ==============================
        if (e.isBoss) {

            const width = 240;
            const height = 5;
            const hpRate = Math.max(
                0,
                Math.min(1, e.hp / e.maxHp)
            );

            ctx.shadowBlur = 0;

            ctx.fillStyle = "rgba(255,255,255,.2)";

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
