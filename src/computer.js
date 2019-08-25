class Computer extends Avatar {
    constructor(ctx, canvas, img, game) {
        super(ctx, canvas, img, game);
        this.currentPosition = { x: canvas.width - defaultSpriteSize, y: canvas.height - defaultSpriteSize };
        this.moveKeys = ['left', 'up', 'right', 'down'];
    }


    moveChecker(stepX, stepY) {
        const bricks = this.game.board.allBricksOnBoard();
        for (let i = 0; i < bricks.length; i++) {
            if (this.bricksOnWayChecker(stepX, stepY, bricks[i])) {return {stepX: 0, stepY: 0};}
        }
        if (this.avatarOnWayChecker(stepX, stepY, this.game.player.currentPosition)) {
            this.game.player.status = dead;
            return { stepX: 0, stepY: 0};
        }
        return { stepX, stepY };
    }

    move() {
        if (!this.game.started) {return;}
        let StepX = 0;
        let StepY = 0;
        let newMove = { stepX: 0, stepY: 0 };
        let moveKey = this.moveKeys[Math.floor(Math.random() * 4)];
        if (moveKey === 'left') {
            StepX = -defaultSpriteSize / 2;
            StepY = 0;
            newMove = this.moveChecker(StepX, StepY);
        } else if (moveKey === 'up') {
            StepX = 0;
            StepY = -defaultSpriteSize / 2;
            newMove = this.moveChecker(StepX, StepY);
        } else if (moveKey === 'right') {
            StepX = defaultSpriteSize / 2;
            StepY = 0;
            newMove = this.moveChecker(StepX, StepY);
        } else if (moveKey === 'down') {
            StepX = 0;
            StepY = defaultSpriteSize / 2;
            newMove = this.moveChecker(StepX, StepY);
        }
        StepX = newMove.stepX;
        StepY = newMove.stepY;
        return this.moveAvatar(StepX, StepY);
    }
}