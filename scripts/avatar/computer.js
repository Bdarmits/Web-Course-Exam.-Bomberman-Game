class Computer extends Avatar {
    constructor(ctx, canvas, img, game) {
        super(ctx, canvas, img, game);
        this.currentPosition = Computer.computerPositionDefiner(this.game);
        this.moveKeys = ['left', 'up', 'right', 'down'];
    }

    static computerPositionDefiner(game){
        let position = {x: 0, y: 0};
        let checker = 0;
        for (let i = Math.floor(brickRowAmount/1.5) -2 ; i > 0  ; i--){
            for (let j = Math.floor(brickColumnAmount/1.5) - 2; j > 0; j--){
                if (game.mapArray[i][j] === 0){
                    position.x = j * defaultSpriteSize;
                    position.y = i * defaultSpriteSize;
                    game.mapArray[i][j+1] = 0;
                    game.mapArray[i][j-1] = 0;
                    game.mapArray[i][j-2] = 0;
                    game.mapArray[i][j+2] = 0;
                    game.mapArray[i+1][j] = 0;
                    game.mapArray[i-1][j] = 0;
                    game.mapArray[i-2][j] = 0;
                    checker = 1;
                    break;
                }
            }
            if(checker === 1){break;}
        }
        return position
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

    moveKeysChecker(moveKey, newMove, StepX, StepY){
        if (moveKey === 'left') {
            localStorage.setItem("prevMove", "left");
            StepX = -defaultSpriteSize / 2;
            StepY = 0;
            newMove = this.moveChecker(StepX, StepY);
        } else if (moveKey === 'up') {
            localStorage.setItem("prevMove", "up");
            StepX = 0;
            StepY = -defaultSpriteSize / 2;
            newMove = this.moveChecker(StepX, StepY);
        } else if (moveKey === 'right') {
            localStorage.setItem("prevMove", "right");
            StepX = defaultSpriteSize / 2;
            StepY = 0;
            newMove = this.moveChecker(StepX, StepY);
        } else if (moveKey === 'down') {
            localStorage.setItem("prevMove", "down");
            StepX = 0;
            StepY = defaultSpriteSize / 2;
            newMove = this.moveChecker(StepX, StepY);
        }
        return newMove;
    }

    move() {
        if (!this.game.started) {return;}
        let StepX ;
        let StepY ;
        let newMove = {stepX: 0, stepY: 0};

        let moveKey = this.moveKeys[Math.floor(Math.random() * 4)];
        newMove = this.moveKeysChecker(moveKey, newMove, StepX, StepY);
        StepX = newMove.stepX;
        StepY = newMove.stepY;
        return this.moveAvatar(StepX, StepY);
    }
}