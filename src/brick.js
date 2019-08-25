class Brick {
    constructor(canvasEl, ctx, width, height) {
        this.ctx = ctx;
        this.x = width;
        this.y = height;
        this.brickColumnAmount = 20;
        this.brickRowAmount = 12;
    }



    static unDestroyableBricksCreation(c, r){return (c % 4 === 0 || r % 4 === 0   ) ;}

    static onlyAliveBlocksFilter(bricks, c, r){return bricks[c][r].status === unDestroyable || bricks[c][r].status === destroyable}

    createBricks(bricks, c, r, statusToUse){
        if (Brick.unDestroyableBricksCreation(c, r)) {
            bricks[c][r] = { x: 0, y: 0, status: unDestroyable };
            this.ctx.fillStyle = "#501a36";
        } else {
            bricks[c][r] = { x: 0, y: 0, status: statusToUse};
            this.ctx.fillStyle = "#A4243B";
        }
        if (Brick.onlyAliveBlocksFilter(bricks, c, r)) {
            let brickLocationX = (c * (defaultSpriteSize * 2)) + defaultSpriteSize;
            let brickLocationY = (r * (defaultSpriteSize *2)) + characterPositionLimitY;
            bricks[c][r].x = brickLocationX;
            bricks[c][r].y = brickLocationY;
            this.ctx.beginPath();
            this.ctx.rect(brickLocationX, brickLocationY, defaultSpriteSize, defaultSpriteSize);
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    initializeBricks() {
        const bricks = [];
        for (let c = 0; c < this.brickColumnAmount; c++) {
            bricks[c] = [];
            for (let r = 0; r < this.brickRowAmount; r++) {
               this.createBricks(bricks, c, r, Math.floor(Math.random() * 2));
            }
        }
        this.bricks = bricks;
    }

    drawBricks() {
        const bricks = [];
        for (let c = 0; c < this.brickColumnAmount; c++) {
            bricks[c] = [];
            for (let r = 0; r < this.brickRowAmount; r++) {
                this.createBricks(bricks, c, r, this.bricks[c][r].status);
            }
        }
    }

    destrBricksLeftOnBoard() {
        const bricksStillStanding = [];
        this.bricks.forEach( column => column.forEach( brick => {
            if (brick.status === destroyable) {bricksStillStanding.push(brick);}

        }));
        return bricksStillStanding;
    }

    allBricksOnBoard() {
        const allVisibleBricks = [];
        this.bricks.forEach( column => column.forEach( brick => {
            if (brick.status === destroyable || brick.status === unDestroyable) {allVisibleBricks.push(brick);}
        }));
        return allVisibleBricks;
    }
}