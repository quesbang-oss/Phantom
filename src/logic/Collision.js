export class Collision {
    constructor(game) {
        this.game = game;
        this.grazed = new WeakSet();
    }

    check() {
        const { player, bullets, enemyBullets, enemies } = this.game.entities;

        // 自機弾 → 敵
        for (const bullet of bullets) {
            if (bullet.isDead) continue;

            for (const enemy of enemies) {
                if (enemy.isDead) continue;
                if (this.distance(bullet, enemy) <= bullet.r + enemy.radius) {
                    bullet.isDead = true;
                    enemy.damage(enemy.isBoss ? 5 : 4);
                    break;
                }
            }
        }

        // 敵弾 → グレイズ / 被弾
        for (const bullet of enemyBullets) {
            if (bullet.isDead) continue;

            const d = this.distance(player, bullet);

            if (d <= player.radius + bullet.r) {
                bullet.isDead = true;
                player.hit();
                continue;
            }

            if (d <= player.grazeRadius + bullet.r && !this.grazed.has(bullet)) {
                this.grazed.add(bullet);
                this.game.graze++;
                this.game.score += 50;
            }
        }

        // 自機 → 敵本体
        for (const enemy of enemies) {
            if (!enemy.isDead && this.distance(player, enemy) <= player.radius + enemy.radius) {
                player.hit();
            }
        }
    }

    distance(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y);
    }
}
