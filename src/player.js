class Player extends Avatar {
    constructor(ctx, canvas, img, game) {
        super(ctx, canvas, img, game);
        this.currentPosition = {x: 0, y: characterPositionLimitY };
        this.numBombs = 1;
        this.bomb = null;
    }

    moveChecker(stepX, stepY) {
        const bricks = this.game.board.allBricksOnBoard();
        for (let i = 0; i < bricks.length; i++) {
            if (this.bricksOnWayChecker(stepX, stepY, bricks[i])) {return {stepX: 0, stepY: 0};}
        }
        this.game.computerArr.forEach(computer => {
            if (this.avatarOnWayChecker(stepX, stepY, computer)) {
                this.game.player.status = dead;
                return { stepX: 0, stepY: 0};
            }
        }) ;
        return { stepX, stepY };
    }


    move(e) {
        if (!this.game.started) {return;}
        let stepX = 0;
        let stepY = 0;
        let newMove = {stepX: 0, stepY: 0};
        if (e.key === "ArrowLeft") {
            stepX = 0 - (defaultSpriteSize / 2);
            stepY = 0;
            newMove = this.moveChecker(stepX, stepY);
        } else if (e.key === "ArrowDown") {
            stepX = 0;
            stepY = defaultSpriteSize / 2;
            newMove = this.moveChecker(stepX, stepY);
        } else if (e.key === "ArrowUp") {
            stepX = 0;
            stepY = 0 - (defaultSpriteSize / 2);
            newMove = this.moveChecker(stepX, stepY);
        } else if (e.key === "ArrowRight") {
            stepX = defaultSpriteSize / 2;
            stepY = 0;
            newMove = this.moveChecker(stepX, stepY);
        } else if (e.key === "b") {
            if (this.numBombs > 0) {
                this.setBomb = true;
                this.placeBomb();
            }
        }
        stepX = newMove.stepX;
        stepY = newMove.stepY;
        return this.moveAvatar(stepX, stepY);
    }

    placeBomb() {
        this.bomb = new Bomb(this.ctx, this, "#233D4D", {x: this.currentPosition.x + 15, y: this.currentPosition.y});
    }

    static avatarInBombBlastRadiusChecker(avatar, leftBlastRadius, rightBlastRadius, topBlastRadius, bottomBlastRadius){
        return avatar.x > leftBlastRadius && avatar.x < rightBlastRadius
            && avatar.y > topBlastRadius && avatar.y < bottomBlastRadius;
    }

    isAvatarInBombRadius(bombPosition) {
        if (Player.avatarInBombBlastRadiusChecker(this.currentPosition,
            bombPosition.x - bombBlastRadius,
            bombPosition.x + bombBlastRadius,
            bombPosition.y - bombBlastRadius,
            bombPosition.y + bombBlastRadius)) {this.status = dead;}
        this.game.computerArr.forEach( computer => {
            if (Player.avatarInBombBlastRadiusChecker(computer.currentPosition,
                bombPosition.x - bombBlastRadius,
                bombPosition.x + bombBlastRadius,
                bombPosition.y - bombBlastRadius,
                bombPosition.y + bombBlastRadius)) {
                computer.status = dead;
            }
        });
    }

    isBrickInBombRadius(bombPosition) {
        const collidedBricks = this.game.board.destrBricksLeftOnBoard().filter(
            brick => brick.x > bombPosition.x - bombBlastRadius && brick.x < bombPosition.x +bombBlastRadius
                && brick.y > bombPosition.y - bombBlastRadius && brick.y <  bombPosition.y + bombBlastRadius);
        collidedBricks.forEach( brick => {brick.status = dead;});
        return collidedBricks;
    }
}

