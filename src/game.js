const defaultSpriteSize = 44;
const bombTimer = 3000;
const computerMoveTimer = 700;
const characterPositionLimitY = 10;
const bombBlastRadius = 50;
const zombiesSpawnNumber = 1;
const dead = 0;
const destroyable = 1;
const unDestroyable = 2;
const alive = 1;
const planted = 1;
const countDown = 2;
const detonating = 3;

class Game {
    constructor(board, computerArr, player, canvas, ctx) {
        this.board = board;
        this.computerArr = computerArr;
        this.player = player;
        this.canvas = canvas;
        this.ctx = ctx;
        this.draw = this.draw.bind(this);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.board.drawBricks();
        this.computerArr.forEach(computer =>{
            if (computer.status === dead){this.computerArr.pop(computer);
            }else{computer.drawPlayer(computer.currentPosition.x, computer.currentPosition.y);}
        });
        this.player.drawPlayer();
        let collidedBricks = [];
        if (this.player.setBomb) { // TODO: remove bool flag
            let bomb = this.player.bomb;
            if (this.player.bomb.status === planted) {
                this.player.bomb.drawItem();
                window.setTimeout(this.player.bomb.explosion.bind(this.player.bomb), bombTimer);
                this.player.bomb.status = countDown;
            }
            if (this.player.bomb.status === countDown) {this.player.bomb.drawItem();}
            if (this.player.bomb.status === detonating) {
                collidedBricks = this.bombBoomDetection();
                this.player.setBomb = false;
                this.player.numBombs += 1;
            }
        }

        if (!this.gameOver()) {window.requestAnimationFrame(this.draw);
        } else {this.gameLostMessage();}
    }

    start(){
        this.started = true;
        const gameCover = document.getElementById('game-start-cover');
        if (gameCover.style.visibility === 'hidden') {gameCover.style.visibility = 'visible';
        } else {gameCover.style.visibility = 'hidden';}
        this.computerArr.forEach(computer => {window.setInterval(computer.move.bind(computer), computerMoveTimer);});
        window.requestAnimationFrame(this.draw);
    }

    gameOver() {return this.player.status === dead ;}

    bombBoomDetection() {
        let colidedBricks = [];
        if (this.player.bomb !== null) {
            this.player.isAvatarInBombRadius(this.player.bomb.position);
            colidedBricks = this.player.isBrickInBombRadius(this.player.bomb.position);
        }
        return colidedBricks;
    }

    gameLostMessage() {
        this.started = false;
        if (this.player.status === dead) {
            const modal = document.getElementById('lost');
            modal.classList.add("show");
        }
    }
}

