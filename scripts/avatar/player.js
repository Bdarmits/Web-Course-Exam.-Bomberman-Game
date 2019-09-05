class Player extends Avatar {
    constructor(ctx, canvas, img, game) {
        super(ctx, canvas, img, game);
        this.currentPosition = Player.playerPositionDefiner(this.game);
        this.numBombs = 1;
        this.bomb = null;
        this.hasKey = false;
        this.movesMadeCounter = 0;
    }

    static playerPositionDefiner(game){
        let position = {x: 0, y: 0};
        let checker = 0;
        for (let i = 1; i < brickRowAmount -1  ; i++){
            for (let j = 1; j <  brickColumnAmount - 1; j++){
                if (game.mapArray[i][j] === 0 ){
                    position.x = j * defaultSpriteSize;
                    position.y = i * defaultSpriteSize;
                    game.mapArray[i][j+1] = 0;
                    game.mapArray[i][j-1] = 0;
                    game.mapArray[i][j-2] = 0;
                    game.mapArray[i][j+2] = 0;

                    checker = 1;
                    break;
                }
            }
            if(checker === 1){break;}
        }
        return position
    }

    static changeBlastRadius(){bombBlastRadius = 50;}

    moveChecker(stepX, stepY) {
        const bricks = this.game.board.allBricksOnBoard();
        for (let i = 0; i < bricks.length; i++) {
            if (bricks[i].status === 4 && this.bricksOnWayChecker(stepX,stepY, bricks[i])){
                keyTheme.play();
                this.game.player.hasKey = true;
                bricks[i].status = 0;
            }
            if (bricks[i].status === 3 && this.bricksOnWayChecker(stepX,stepY, bricks[i]) && this.game.player.hasKey && this.game.computerArr.length === 0)
            {this.game.player.status = won;}
            if (bricks[i].status === 5 && this.bricksOnWayChecker(stepX,stepY, bricks[i])) {
                keyTheme.play();
                bricks[i].status = 0;
                for (let i = 1; i < brickRowAmount -1  ; i++){
                    for (let j = 1; j <  brickColumnAmount - 1; j++){
                        if (this.game.board.bricks[j][i].status === 1 ){this.game.board.bricks[j][i].status = 0;}
                    }
                }
            }
            if (bricks[i].status === 6 && this.bricksOnWayChecker(stepX,stepY, bricks[i])) {
                keyTheme.play();
                bricks[i].status = 0;
                bombBlastRadius = 100;
                window.setTimeout(Player.changeBlastRadius, 5000);
            }
            if (bricks[i].status === 8 && this.bricksOnWayChecker(stepX,stepY, bricks[i])) {
                keyTheme.play();
                bricks[i].status = 0;
                this.game.computerArr.pop();
            }
            if (this.bricksOnWayChecker(stepX, stepY, bricks[i])) {return {stepX: 0, stepY: 0};}
        }
        this.game.computerArr.forEach(computer => {
            if (this.avatarOnWayChecker(stepX, stepY, computer)) {
                this.game.player.status = dead;
                return { stepX: 0, stepY: 0};
            }
        }) ;
        this.movesMadeCounterFunc();
        return { stepX, stepY };
    }

    movesMadeCounterFunc(){
        this.movesMadeCounter++;
        document.getElementById("moves").innerHTML = this.movesMadeCounter;
    }

    move(e) {
        if (!this.game.started) {return;}
        let stepX;
        let stepY;
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
            if (this.numBombs === 1) {
                this.numBombs --;
                this.setBomb = true;
                this.placeBomb();
            }
        }
        stepX = newMove.stepX;
        stepY = newMove.stepY;
        return this.moveAvatar(stepX, stepY);
    }

    placeBomb() {
        this.bomb = new Bomb(this.ctx, this, 'images/bomb.png', {x: this.currentPosition.x+11 , y: this.currentPosition.y + 11});
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

