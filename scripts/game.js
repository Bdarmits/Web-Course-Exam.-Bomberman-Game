var defaultSpriteSize = 44;
const bombTimer = 3000;
var computerMoveTimer = 100;
const characterPositionLimitY = 44;
var bombBlastRadius = 60;
const dead = 0;
const destroyable = 1;
const unDestroyable = 2;
const alive = 1;
const planted = 1;
const countDown = 2;
const detonating = 3;
const won = 2;
const bgTheme = new Sound("music/bgtheme.mp3", 0.1);
const bombTheme = new Sound("music/bomb.mp3", 0.2);
const keyTheme  = new Sound("music/coin.wav", 0.2);
const victoryTheme = new Sound("music/victory.wav", 0.2);
const failureTheme = new Sound("music/failure.mp3", 0.2);

class Game {
    constructor(board, computerArr, player, canvas, ctx) {
        this.board = board;
        this.computerArr = computerArr;
        this.player = player;
        this.canvas = canvas;
        this.ctx = ctx;
        this.draw = this.draw.bind(this);
        this.mapArray = this.board.mapArray;
        this.bombsUsedCounter = 0;
        this.collidedBricksCounter = 0;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.player.hasKey){document.getElementById("key").style.visibility = "visible";}
        this.board.drawBricks();
        this.computerArr.forEach(computer =>{
            if (computer.status === dead){
                let ind = this.computerArr.indexOf(computer);
                this.computerArr.splice(ind, 1);
            }else{computer.drawPlayer(computer.currentPosition.x, computer.currentPosition.y);}
        });
        this.player.drawPlayer();
        let collidedBricks = [];
        if (this.player.setBomb ) {
            if (this.player.bomb.status === planted) {
                this.bombsUsedCounter++;
                document.getElementById("bombs").innerHTML = this.bombsUsedCounter;
                this.player.bomb.drawItem();
                window.setTimeout(this.player.bomb.explosion.bind(this.player.bomb), bombTimer);
                this.player.bomb.status = countDown;
            }
            if (this.player.bomb.status === countDown) {this.player.bomb.drawItem();}
            if (this.player.bomb.status === detonating) {
                bombTheme.play();
                collidedBricks = this.bombBoomDetection();
                this.player.setBomb = false;
                this.player.numBombs++;
                document.getElementById("bricks").innerHTML = this.collidedBricksCounter;
            }
        }

        collidedBricks.forEach(brick => {
            let treasureDropped = Math.floor(Math.random() * 8); //4
            if (treasureDropped === 1){
                if ( 0.65 > Game.decideTreasure() >= 0.6){
                    brick.status = 8;
                }else if(0.1 <= Game.decideTreasure() < 0.4){
                    brick.status = 6
                }else if (0.5 <= Game.decideTreasure() < 0.6){
                    brick.status = 5
                }
            }
        });

        if (!this.gameOver()) {window.requestAnimationFrame(this.draw);
        } else {this.gameLostWonMessage();}
    }

    static decideTreasure(){return  Math.random();}

    static totalWonDetection(){return Number(localStorage.getItem("levelNum")) === 10;}

    start(){
        bgTheme.play();
        this.started = true;
        const gameCover = document.getElementById('game-start-cover');
        hiddenChecker(gameCover);
        this.computerArr.forEach(computer => {window.setInterval(computer.move.bind(computer), computerMoveTimer);});
        window.requestAnimationFrame(this.draw);
    }

    gameOver() {return this.player.status === dead  || this.player.status === won;}

    bombBoomDetection() {
        let colidedBricks = [];
        if (this.player.bomb !== null) {
            this.player.isAvatarInBombRadius(this.player.bomb.position);
            colidedBricks = this.player.isBrickInBombRadius(this.player.bomb.position);
        }
        this.collidedBricksCounter += colidedBricks.length;
        return colidedBricks;
    }

    gameLostWonMessage() {
        this.started = false;
        if (this.player.status === dead) {
            bgTheme.pause();
            failureTheme.play();
            const modal = document.getElementById('lost');
            modal.classList.add("show");
        }
        if (this.player.status === won){
            if( Game.totalWonDetection()){
                bgTheme.pause();
                victoryTheme.play();
                const modal = document.getElementById('lost');
                modal.classList.add("show");  //To make you never be able to win  this game
            }
            bgTheme.pause();
            victoryTheme.play();
            const modal = document.getElementById('won');
            modal.classList.add('show');
        }
    }
}

