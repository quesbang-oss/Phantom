export class UI {
    constructor(game) {
        this.game = game;
        this.overlay = document.getElementById("overlay");
        this.title = document.getElementById("title-screen");
        this.result = document.getElementById("result-screen");
        this.resultTitle = document.getElementById("result-title");
    }

    bind() {
        document.getElementById("start-btn").addEventListener("click", () => this.game.start());
        document.getElementById("retry-btn").addEventListener("click", () => this.game.start());

        document.getElementById("pause-btn").addEventListener("click", () => this.game.togglePause());
        document.getElementById("bomb-btn").addEventListener("click", () => this.game.useBomb());

        document.getElementById("bgm-vol").addEventListener("input", (e) => {
            this.game.audio.setBGMVolume(Number(e.target.value) / 100);
        });

        document.getElementById("se-vol").addEventListener("input", (e) => {
            this.game.audio.setSEVolume(Number(e.target.value) / 100);
        });

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" || e.key === "p" || e.key === "P") {
                this.game.togglePause();
            }
        });
    }

    showGame() {
        this.overlay.classList.add("hidden");
        document.getElementById("mobile-ui").classList.remove("hidden");
    }

    showPause() {
        this.overlay.classList.remove("hidden");
        this.title.classList.remove("hidden");
        this.result.classList.add("hidden");
    }

    hidePause() {
        this.overlay.classList.add("hidden");
    }

    showResult(title) {
        this.overlay.classList.remove("hidden");
        this.title.classList.add("hidden");
        this.result.classList.remove("hidden");
        this.resultTitle.textContent = title;
        document.getElementById("res-score").textContent = this.game.score;
        document.getElementById("res-graze").textContent = this.game.graze;
        document.getElementById("res-hi-score").textContent = this.game.hiScore;
        document.getElementById("mobile-ui").classList.add("hidden");
    }
}
