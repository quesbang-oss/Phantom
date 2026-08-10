export const CANVAS_W = 480;
export const CANVAS_H = 640;

export const BPM = 144;
export const BEAT_SEC = 60 / BPM;

export const TIMELINE = Object.freeze({
    INTRO: 0,
    ZAKO_START: 10,
    ZAKO_HEAVY: 25,
    MID_BOSS: 40,
    BOSS_APPEAR: 55,
    BOSS_SPELL1: 70,
    BOSS_FINAL: 85,
    CLEAR: 95
});

export const PLAYER = Object.freeze({
    START_X: CANVAS_W / 2,
    START_Y: CANVAS_H * 0.82,
    RADIUS: 4,
    GRAZE_RADIUS: 18,
    SPEED: 300,
    FOCUS_SPEED: 120,
    LIVES: 3,
    BOMBS: 3,
    SHOT_INTERVAL: 0.08,
    INVINCIBLE_SEC: 2
});

export const COLORS = Object.freeze({
    PLAYER: "#00ffff",
    BULLET_RED: "#ff3366",
    BULLET_BLUE: "#33ccff",
    BULLET_PURPLE: "#cc33ff",
    GRAZE: "#ffffff",
    BOSS: "#e020ff",
    ENEMY: "#ffb347"
});

export const GAME = Object.freeze({
    FIXED_DT: 1 / 60,
    BULLET_OUT_MARGIN: 40,
    MAX_PARTICLES: 250
});
