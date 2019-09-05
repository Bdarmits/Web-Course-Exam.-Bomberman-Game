class Bomb extends Items {
    drawItem() {
        const bombSprite = new Image();
        bombSprite.src = this.img;
        this.ctx.drawImage(bombSprite, this.position.x, this.position.y, defaultSpriteSize / 2, defaultSpriteSize / 2);
    }

    explosion() {this.status = detonating;}

}
