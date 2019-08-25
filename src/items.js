class Items {
    constructor(ctx, player, color, position) {
        this.ctx = ctx;
        this.player = player;
        this.status = planted;
        this.color = color;
        this.position = {x: position.x, y: position.y};

    }

    drawItem() {}

    explosion() {
        this.status = detonating;
    }

}
