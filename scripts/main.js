document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementById('my-canvas');
    const ctx = canvasEl.getContext('2d');

    document.getElementById("key").style.visibility = "hidden";

    const howToButton = document.getElementById('how-to');
    howToButton.addEventListener("click", toggleModal, false);
    const howToButton2 = document.getElementById('how-to2');
    howToButton2.addEventListener("click", toggleModal2, false);
    const howToButton3 = document.getElementById('how-to3');
    howToButton3.addEventListener("click", toggleModal3, false);
    const howToButton4 = document.getElementById('how-to4');
    howToButton4.addEventListener("click", toggleModal4, false);

    const closeButton = document.getElementById('close');
    closeButton.addEventListener("click", toggleModal, false);
    const closeButton2 = document.getElementById('closed');
    closeButton2.addEventListener("click", toggleModal2, false);
    const closeButton3 = document.getElementById('closed2');
    closeButton3.addEventListener("click", toggleModal3, false);
    const closeButton4 = document.getElementById('closed3');
    closeButton4.addEventListener("click", toggleModal4, false);

    document.getElementById("bricks").innerHTML = "0";
    document.getElementById("bombs").innerHTML = "0";
    document.getElementById("moves").innerHTML = "0";
    document.getElementById("deaths").innerHTML = localStorage.getItem("totalDeathsCounter");



    const treeSprite = new Image();
    const wallSprite = new Image();
    const board = new Brick(canvasEl, ctx, canvasEl.width/2, canvasEl.height-characterPositionLimitY, treeSprite,
        wallSprite, Number(localStorage.getItem("levelNum")) );
    wallSprite.addEventListener("load", function () {
        board.initializeBricks();
    }, false);
    treeSprite.src = 'images/tree.png';
    wallSprite.src = 'images/wall.png';

    const game = new Game(board, null, null, canvasEl, ctx);

    const startButton = document.getElementById('start');
    startButton.addEventListener("click", function () {
        game.start.bind(this);
        game.start();
    }, true);


    let computerArr = [];
    let zombiesAmount = Number(localStorage.getItem("levelNum")) + 2;
    for (let i = 0; i < zombiesAmount; i++) {
        const computerSprite = new Image();
        const computer = new Computer(ctx, canvasEl, computerSprite, game);
        computerSprite.addEventListener("load", function () {computer.drawPlayer();}, false);
        computerSprite.src = 'images/zombie.png';
        computerArr.push(computer);
    }


    const playerSprite = new Image();
    const player = new Player(ctx, canvasEl, playerSprite, game);
    playerSprite.addEventListener("load", function () {
        player.moveAvatar.bind(player);
        player.drawPlayer();
    }, false);
    playerSprite.src = 'images/man.png';

    document.addEventListener("keydown", function (e) {
        player.move(e);
    }, true);

    game.player = player;
    game.computerArr = computerArr;

    const play = document.getElementsByClassName('play-again')[0];
    play.addEventListener("click", function () {
        localStorage.setItem("lostHappened", "true");
        let deathNum = Number(localStorage.getItem("totalDeathsCounter"));
        localStorage.setItem("totalDeathsCounter", (deathNum + 1).toString());
        const lost = document.getElementById('lost');
        lost.classList.remove('show');
        document.location.reload();
        game.start.bind(this);
        game.start();
    }, false);

    const play2 = document.getElementsByClassName('play-again')[1];
    play2.addEventListener("click", function () {
        let levelNum = Number(localStorage.getItem("levelNum"));
        localStorage.setItem("levelNum", (levelNum+1).toString());
        const won = document.getElementById('won');
        won.classList.remove('show');
        document.location.reload();
        game.start.bind(this);
        game.start();
    }, false);

    const startOver = document.getElementsByClassName('first-level')[0];
    startOver.addEventListener("click", function () {
        localStorage.setItem("levelNum", "1");
        document.location.reload();
        game.start.bind(this);
        game.start();
    }, false);

    const drop = document.getElementsByClassName('drop')[0];
    drop.addEventListener("click", function () {
        localStorage.setItem("totalDeathsCounter", "0");
        document.getElementById("deaths").innerHTML = localStorage.getItem("totalDeathsCounter");

    }, false);
});

function visibilityChecker(modal) {
    if (modal.style.visibility === 'visible') {
        modal.style.visibility = 'hidden';
    } else {
        modal.style.visibility = 'visible';
    }
}

function hiddenChecker(modal) {
    if (modal.style.visibility === 'hidden') {
        modal.style.visibility = 'visible';
    } else {
        modal.style.visibility = 'hidden';
    }
}

function toggleModal() {
    const modal = document.getElementsByClassName('modal')[0];
    visibilityChecker(modal);
}

function toggleModal2() {
    const modal = document.getElementsByClassName('modal')[2];
    visibilityChecker(modal);
}

function toggleModal3() {
    const modal = document.getElementsByClassName('modal')[3];
    visibilityChecker(modal);
}

function toggleModal4() {
    const modal = document.getElementsByClassName('modal')[1];
    visibilityChecker(modal);
}