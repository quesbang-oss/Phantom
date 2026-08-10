export class Input {
    constructor(canvas) {
        this.canvas = canvas;
        this.keys = new Set();
        this.touchActive = false;
        this.touchX = 0;
        this.touchY = 0;

        window.addEventListener("keydown", (e) => {
            this.keys.add(e.key);
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
                e.preventDefault();
            }
        });

        window.addEventListener("keyup", (e) => this.keys.delete(e.key));

        const updateTouch = (e) => {
            const touch = e.touches[0];
            if (!touch) return;
            const rect = canvas.getBoundingClientRect();
            this.touchX = (touch.clientX - rect.left) * canvas.width / rect.width;
            this.touchY = (touch.clientY - rect.top) * canvas.height / rect.height;
        };

        canvas.addEventListener("touchstart", (e) => {
            this.touchActive = true;
            updateTouch(e);
            e.preventDefault();
        }, { passive: false });

        canvas.addEventListener("touchmove", (e) => {
            updateTouch(e);
            e.preventDefault();
        }, { passive: false });

        canvas.addEventListener("touchend", (e) => {
            this.touchActive = false;
            e.preventDefault();
        }, { passive: false });
    }

    isKeyDown(key) {
        return this.keys.has(key) || this.keys.has(key.toLowerCase());
    }

    isShotDown() {
        return this.isKeyDown("z") || this.isKeyDown("Z");
    }

    isBombDown() {
        return this.isKeyDown("x") || this.isKeyDown("X");
    }
}
