// Player.js
update(input, dt) {
    this.isFocus = input.isKeyDown("Shift");

    const speed = this.isFocus
        ? this.focusSpeed     // 120
        : this.speed;         // 300

    let x = 0;
    let y = 0;

    if (input.isKeyDown("ArrowLeft") || input.isKeyDown("a")) x--;
    if (input.isKeyDown("ArrowRight") || input.isKeyDown("d")) x++;
    if (input.isKeyDown("ArrowUp") || input.isKeyDown("w")) y--;
    if (input.isKeyDown("ArrowDown") || input.isKeyDown("s")) y++;

    const len = Math.hypot(x, y) || 1;

    this.x += (x / len) * speed * dt;
    this.y += (y / len) * speed * dt;

    this.x = Math.max(8, Math.min(472, this.x));
    this.y = Math.max(8, Math.min(632, this.y));
}
