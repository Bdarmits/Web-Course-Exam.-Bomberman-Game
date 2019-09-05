class Doors extends Items{
    constructor(ctx, player, img, position){
        super(ctx, player, img, position);
        this.status = 3;
}
    drawItem(x, y) {
        const doorSprite = new Image();
        doorSprite.src = this.img;
        this.ctx.drawImage(doorSprite, x, y, defaultSpriteSize , defaultSpriteSize );
    }

}