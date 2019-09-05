class Treasure{
    constructor(ctx, status, img, spawnChance, isSpawned ){
        this.ctx = ctx;
        this.duration = 0;
        this.img = img;
        this.spawnChance = spawnChance;
        this.status = status;
        this.isSpawned = isSpawned;
    }

    draw(x, y){
        const treasureSprite = new Image();
        treasureSprite.src = this.img;
        this.ctx.drawImage(treasureSprite, x, y, defaultSpriteSize , defaultSpriteSize);
    }

}