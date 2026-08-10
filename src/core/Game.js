import { CANVAS_W, CANVAS_H, TIMELINE, GAME } from "../constants.js";
import { Input } from "./Input.js";
import { Audio } from "./Audio.js";
import { Player } from "../entities/Player.js";
import { Stage } from "../logic/Stage.js";
import { Collision } from "../logic/Collision.js";
import { Renderer } from "../view/Renderer.js";
import { UI } from "../view/UI.js";

export class Game {
    constructor() {
        this.canvas = document.getElementById("game-canvas");
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_H;

        this.state = "TITLE";
        this.score = 0;
        this.graze = 0;
        this.hiScore = Number(localStorage.getItem("phantom-resonance-hi-score") || 0);

        this.entities = {
            player: new Player(this),
            enemies: [],
            bullets: [],
            enemyBullets: [],
            particles: []
        };

        this.input = new Input(this.canvas);
        this.audio = new Audio();
        this.renderer = new Renderer(this.ctx);
        this.ui = new UI(this);
        this.stage = new Stage(this);
        this.collision = new Collision(this);

        this.lastTimestamp = 0;
        this.accumulator = 0;
        this.lastBombKey = false;
    }

    init() {
        this.ui.bind();
        this.loop(0);
    }

    start() {
        this.resetStage();
        this.state = "PLAYING";
        this.ui.showGame();
        this.audio.playBGM();
    }

    resetStage() {
        this.score = 0;
        this.graze = 0;
        this.entities.player.reset();
        this.entities.enemies.length = 0;
        this.entities.bullets.length = 0;
        this.entities.enemyBullets.length = 0;
        this.entities.particles.length = 0;
        this.stage.reset();
    }

    togglePause() {
        if (this.state === "PLAYING") {
            this.state = "PAUSED";
            this.audio.pauseBGM();
            this.ui.showPause();
        } else if (this.state === "PAUSED") {
            this.state = "PLAYING";
            this.audio.resumeBGM();
            this.ui.hidePause();
        }
    }

    useBomb() {
        if (this.state !== "PLAYING" || this.entities.player.bombs <= 0) return;
        this.entities.player.bombs--;
        this.entities.enemyBullets.length = 0;
        this.entities.enemies.forEach(e => {
            if (e.isBoss) e.hp -= 25;
            else e.isDead = true;
        });
        this.score += 5000;
    }

    gameOver() {
        this.state = "GAMEOVER";
        this.audio.stopBGM();
        this.updateHiScore();
        this.ui.showResult("GAME OVER");
    }

    clear() {
        this.state = "CLEAR";
        this.audio.stopBGM();
        this.updateHiScore();
        this.ui.showResult("STAGE CLEAR");
    }

    updateHiScore() {
        if (this.score > this.hiScore) {
            this.hiScore = this.score;
            localStorage.setItem("phantom-resonance-hi-score", String(this.hiScore));
        }
    }

    loop(timestamp) {
        if (!this.lastTimestamp) this.lastTimestamp = timestamp;
        const frameDt = Math.min((timestamp - this.lastTimestamp) / 1000, 0.1);
        this.lastTimestamp = timestamp;
        this.accumulator += frameDt;

        while (this.accumulator >= GAME.FIXED_DT) {
            this.update(GAME.FIXED_DT);
            this.accumulator -= GAME.FIXED_DT;
        }

        this.draw();
        requestAnimationFrame((t) => this.loop(t));
    }

    update(dt) {
        if (this.state !== "PLAYING") return;

        const time = this.audio.getBGMTime();
        const player = this.entities.player;

        player.update(this.input, dt);

        const bombDown = this.input.isBombDown();
        if (bombDown && !this.lastBombKey) this.useBomb();
        this.lastBombKey = bombDown;

        this.stage.update(time);

        this.updateList(this.entities.enemies, dt);
        this.updateList(this.entities.enemyBullets, dt);
        this.updateList(this.entities.bullets, dt);

        this.collision.check();

        if (time >= TIMELINE.CLEAR) {
            this.clear();
        }
    }

    updateList(list, dt) {
        for (let i = list.length - 1; i >= 0; i--) {
            list[i].update(dt);
            if (list[i].isDead || list[i].isOut) list.splice(i, 1);
        }
    }

    draw() {
        this.renderer.render(this);
    }
}
