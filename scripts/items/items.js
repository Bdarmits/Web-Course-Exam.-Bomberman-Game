class Items {
    constructor(ctx, player, img, position) {
        this.ctx = ctx;
        this.player = player;
        this.status = 1;
        this.img = img;
        this.position = {x: position.x, y: position.y};
    }
    drawItem() {}
}
