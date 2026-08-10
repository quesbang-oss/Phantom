import { TIMELINE, BEAT_SEC, COLORS } from "../constants.js";
import { Enemy } from "../entities/Enemy.js";
import { Boss } from "../entities/Boss.js";
import { Patterns } from "./Patterns.js";

export class Stage {
    constructor(game) {
        this.game = game;
        this.reset();
    }

    reset() {
        this.lastBeat = -1;
        this.bossSpawned = false;
        this.phase = "INTRO";
    }

    update(time) {
        const currentBeat = Math.floor(time / BEAT_SEC);

        if (currentBeat > this.lastBeat) {
            for (let beat = this.lastBeat + 1; beat <= currentBeat; beat++) {
                this.onBeat(beat, time);
            }
            this.lastBeat = currentBeat;
        }

        if (time >= TIMELINE.BOSS_APPEAR && !this.bossSpawned) {
            this.spawnBoss();
        }

        if (time >= TIMELINE.BOSS_FINAL) {
            this.phase = "FINAL";
        } else if (time >= TIMELINE.BOSS_SPELL1) {
            this.phase = "SPELL1";
        } else if (time >= TIMELINE.BOSS_APPEAR) {
            this.phase = "BOSS";
        } else if (time >= TIMELINE.ZAKO_HEAVY) {
            this.phase = "HEAVY";
        } else if (time >= TIMELINE.ZAKO_START) {
            this.phase = "ZAKO";
        }
    }

    onBeat(beat, time) {
        const subBeat = beat % 4;

        if (time >= TIMELINE.ZAKO_START && time < TIMELINE.ZAKO_HEAVY) {
            if (subBeat === 0) this.spawnEnemyGroup();
        }

        if (time >= TIMELINE.ZAKO_HEAVY && time < TIMELINE.MID_BOSS) {
            if (subBeat % 2 === 0) this.spawnFastEnemy();
        }

        if (time >= TIMELINE.MID_BOSS && time < TIMELINE.BOSS_APPEAR) {
            if (subBeat === 0) this.spawnAimedWave();
        }
    }

    spawnEnemyGroup() {
        for (let i = 0; i < 5; i++) {
            const x = 60 + i * 90;
            this.game.entities.enemies.push(new Enemy(this.game, x, -20));
        }
    }

    spawnFastEnemy() {
        const x = 40 + Math.random() * 400;
        this.game.entities.enemies.push(new Enemy(this.game, x, -20, "fast"));
    }

    spawnAimedWave() {
        const enemy = new Enemy(this.game, 240, 40);
        enemy.speed = 0;
        this.game.entities.enemies.push(enemy);

        this.game.entities.enemyBullets.push(
            ...Patterns.circle(enemy, 10, 125, COLORS.BULLET_BLUE, performance.now() * 0.001)
        );
    }

    spawnBoss() {
        this.game.entities.enemies.push(new Boss(this.game));
        this.bossSpawned = true;
    }
}
