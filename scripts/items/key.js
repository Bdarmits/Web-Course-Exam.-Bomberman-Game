class Key extends Items{
    constructor(ctx, player, img, position){
        super(ctx, player, img, position);
        this.status = 4;
    }
    drawItem(x, y) {
        const keySprite = new Image();
        keySprite.src = this.img;
        this.ctx.drawImage(keySprite, x, y, defaultSpriteSize , defaultSpriteSize );
    }
}