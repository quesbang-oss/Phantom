export class Audio {
    constructor() {
        this.bgm = new window.Audio();
        this.bgm.preload = "auto";
        this.bgm.loop = false;
        this.bgm.src = "assets/Acid Tunnel of Love.mp3";

        this.bgmVolume = 0.5;
        this.seVolume = 0.5;
        this.started = false;

        this.bgm.addEventListener("ended", () => {
            this.started = false;
        });
    }

    playBGM() {
        this.bgm.currentTime = 0;
        this.bgm.volume = this.bgmVolume;
        this.started = true;
        const promise = this.bgm.play();
        if (promise) promise.catch(() => {});
    }

    stopBGM() {
        this.bgm.pause();
        this.bgm.currentTime = 0;
        this.started = false;
    }

    pauseBGM() {
        this.bgm.pause();
    }

    resumeBGM() {
        const promise = this.bgm.play();
        if (promise) promise.catch(() => {});
    }

    getBGMTime() {
        return this.bgm.currentTime || 0;
    }

    setBGMVolume(value) {
        this.bgmVolume = Math.max(0, Math.min(1, value));
        this.bgm.volume = this.bgmVolume;
    }

    setSEVolume(value) {
        this.seVolume = Math.max(0, Math.min(1, value));
    }
}
