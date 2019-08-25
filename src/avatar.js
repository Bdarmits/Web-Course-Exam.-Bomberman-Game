class Avatar {
    constructor(ctx, canvas, img, game ) {
        this.currentPosition = {x: 0, y: 0};
        this.ctx = ctx;
        this.canvas = canvas;
        this.img = img;
        this.status = alive;
        this.game = game;
    }
    drawPlayer() {this.ctx.drawImage(this.img, this.currentPosition.x, this.currentPosition.y, defaultSpriteSize, defaultSpriteSize);}

    bricksOnWayChecker(stepX, stepY, i){
        return (this.currentPosition.x + defaultSpriteSize / 2) + stepX >= i.x &&
            (this.currentPosition.x + defaultSpriteSize / 2) + stepX <= i.x + defaultSpriteSize &&
            (this.currentPosition.y + defaultSpriteSize / 2) + stepY >= i.y &&
            (this.currentPosition.y + defaultSpriteSize / 2) + stepY <= i.y + defaultSpriteSize;
    }

    avatarOnWayChecker(stepX, stepY, avatar){
        return (this.currentPosition.x + defaultSpriteSize / 2) + stepX >= avatar.x
            && (this.currentPosition.x + defaultSpriteSize / 2) + stepX <= avatar.x + defaultSpriteSize / 2
            && (this.currentPosition.y + defaultSpriteSize / 2) + stepY >= avatar.y
            && (this.currentPosition.y + defaultSpriteSize / 2) + stepY <= avatar.y + defaultSpriteSize / 2;
    }

    playerMoveAbilityCheckerX(stepX){return this.currentPosition.x + stepX < 0 || this.currentPosition.x + stepX + defaultSpriteSize / 2 >= this.canvas.width;}

    playerMoveAbilityCheckerY(stepY){return this.currentPosition.y + stepY < characterPositionLimitY || this.currentPosition.y + stepY + defaultSpriteSize / 2 >= this.canvas.height;}

    moveAvatar(stepX, stepY) {
        if (this.playerMoveAbilityCheckerX(stepX)) {stepX = 0;}
        else if (this.playerMoveAbilityCheckerY(stepY)) {stepY = 0;}
        this.currentPosition.x += stepX;
        this.currentPosition.y += stepY;
        return this.drawPlayer();
    }
}