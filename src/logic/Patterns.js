import { Bullet } from "../entities/Bullet.js";

export const Patterns = {
    circle(owner, count, speed, color, angleOffset = 0) {
        const bullets = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.PI * 2 * i / count + angleOffset;
            bullets.push(new Bullet(
                owner.x,
                owner.y,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                color
            ));
        }
        return bullets;
    },

    aimed(owner, target, speed, color) {
        const angle = Math.atan2(target.y - owner.y, target.x - owner.x);
        return [new Bullet(
            owner.x,
            owner.y,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
            color
        )];
    },

    spiral(owner, count, speed, color, step) {
        return this.circle(owner, count, speed, color, step * 0.2);
    }
};
