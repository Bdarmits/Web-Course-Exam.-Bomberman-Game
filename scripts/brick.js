const brickColumnAmount = 25;
const brickRowAmount = 13;

class Brick {
    constructor(canvasEl, ctx, width, height, treeImg, wallImg, levelNum) {
        this.levelNum = levelNum;
        this.door = new Doors(ctx, null, 'images/door.png', {});
        this.key = new Key(ctx, null, 'images/key.png',{});
        this.appleTreasure = new Treasure(ctx,5, 'images/apple.png', 0.1/8);
        this.bombTreasure = new Treasure(ctx,6, 'images/bomb.png', 0.3/8);
        this.roseTreasure = new Treasure(ctx,8, 'images/rose.png', 0.1/8);
        this.ctx = ctx;
        this.x = width;
        this.y = height;
        this.treeImg = treeImg;
        this.wallImg = wallImg;
        this.brickColumnAmount = brickColumnAmount;
        this.brickRowAmount = brickRowAmount;
        this.mapConfigs = {
            numberOfPaths: 110 - levelNum * 10,
            minPathLength: 5,
            maxPathLength: 21 - levelNum,
            maxWidth: brickColumnAmount,
            maxHeight: brickRowAmount,
            startPosition: {x: 0, y: 0}
        };
        console.log(this.levelNum);
        this.mapArray = generateMap(this.mapConfigs);
        console.log(this.mapConfigs.numberOfPaths);
    }

    unDestroyableBricksCreation( c, r){
        return (c === 0 || r === 0 || c === this.brickColumnAmount - 1 || r === this.brickRowAmount - 1) ;
    }

    static onlyAliveBlocksFilter(bricks, c, r){return bricks[c][r].status === unDestroyable ||
        bricks[c][r].status === destroyable || bricks[c][r].status === 3 || bricks[c][r].status === 4
        || bricks[c][r].status === 5 || bricks[c][r].status === 6 || bricks[c][r].status === 8}

    createBricks(bricks, c, r, statusToUse){
        if (this.unDestroyableBricksCreation( c, r) && statusToUse !== 3) {bricks[c][r] = { x: 0, y: 0, status: unDestroyable };
        } else {bricks[c][r] = { x: 0, y: 0, status: statusToUse};}
        if (Brick.onlyAliveBlocksFilter(bricks, c, r)) {
            let brickLocationX = (c * (defaultSpriteSize )) ;
            let brickLocationY = (r * (defaultSpriteSize )) ;
            bricks[c][r].x = brickLocationX;
            bricks[c][r].y = brickLocationY;
            if (bricks[c][r].status === 1){ this.ctx.drawImage(this.treeImg,brickLocationX, brickLocationY, defaultSpriteSize, defaultSpriteSize);
            }else if (bricks[c][r].status === 2){this.ctx.drawImage(this.wallImg,brickLocationX, brickLocationY, defaultSpriteSize, defaultSpriteSize)
            }else if (bricks[c][r].status === 3){this.door.drawItem(bricks[c][r].x, bricks[c][r].y)
            }else if (bricks[c][r].status === 4){this.key.drawItem(bricks[c][r].x, bricks[c][r].y)
            }else if (bricks[c][r].status === 5){this.appleTreasure.draw(bricks[c][r].x, bricks[c][r].y)
            }else if (bricks[c][r].status === 6){this.bombTreasure.draw(bricks[c][r].x, bricks[c][r].y)
            }else if (bricks[c][r].status === 8){this.roseTreasure.draw(bricks[c][r].x, bricks[c][r].y)}
        }
    }

    initializeBricks() {
        const bricks = [];
        for (let c = 0; c < this.brickColumnAmount; c++) {
            bricks[c] = [];
            for (let r = 0; r < this.brickRowAmount; r++) {this.createBricks(bricks, c, r, this.mapArray[r][c]);}
        }
        this.bricks = bricks;
    }

    drawBricks() {
        const bricks = [];
        for (let c = 0; c < this.brickColumnAmount; c++) {
            bricks[c] = [];
            for (let r = 0; r < this.brickRowAmount; r++) {this.createBricks(bricks, c, r, this.bricks[c][r].status);}
        }
    }

    destrBricksLeftOnBoard() {
        const destrBricksLeftOnBoard = [];
        this.bricks.forEach( column => column.forEach( brick => {
            if (brick.status === destroyable || brick.status === 5 || brick.status === 6 || brick.status === 8) {destrBricksLeftOnBoard.push(brick);}
        }));
        return destrBricksLeftOnBoard;
    }

    allBricksOnBoard() {
        const allVisibleBricks = [];
        this.bricks.forEach( column => column.forEach( brick => {
            if (brick.status === destroyable || brick.status === unDestroyable ||
                brick.status === 3 || brick.status === 4 || brick.status === 5 || brick.status === 6 || brick.status === 8) {allVisibleBricks.push(brick);}
        }));
        return allVisibleBricks;
    }
}