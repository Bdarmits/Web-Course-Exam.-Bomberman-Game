document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementById('my-canvas');
    const ctx = canvasEl.getContext('2d');

    const howToButton = document.getElementById('how-to');
    howToButton.addEventListener("click", toggleModal, false);
    const howToButton2 = document.getElementById('how-to2');
    howToButton2.addEventListener("click", toggleModal2, false);
    const howToButton3 = document.getElementById('how-to3');
    howToButton3.addEventListener("click", toggleModal3, false);

    const closeButton = document.getElementById('close');
    closeButton.addEventListener("click", toggleModal, false);
    const closeButton2 = document.getElementById('closed');
    closeButton2.addEventListener("click", toggleModal2, false);
    const closeButton3 = document.getElementById('closed2');
    closeButton3.addEventListener("click", toggleModal3, false);

    const board = new Brick(canvasEl, ctx, canvasEl.width/2, canvasEl.height-65);
    board.initializeBricks();

    let computerArr = [];

    for (i = 0; i < zombiesSpawnNumber; i++) {
        const computerSprite = new Image();
        const computer = new Computer(ctx, canvasEl, computerSprite);
        computerSprite.addEventListener("load", function () {computer.drawPlayer();}, false);
        computerSprite.src = 'src/images/zombie.png';
        computer.drawPlayer(canvasEl.width - 44 * i - 1, canvasEl.height - 44);
        computerArr.push(computer);
    }

    const playerSprite = new Image();
    const player = new Player(ctx, canvasEl, playerSprite);
    playerSprite.addEventListener("load", function () {
        player.moveAvatar.bind(player);
        player.drawPlayer();
    }, false);
    playerSprite.src = 'src/images/man.png';

    document.addEventListener("keydown", function (e) {
        player.move(e);
    }, true);
//TODO: remove event listener після хзакінчення відписати

    const game = new Game(board, computerArr, player, canvasEl, ctx);
    const startButton = document.getElementById('start');
    startButton.addEventListener("click", function () {
        game.start.bind(this);
        game.start();
    }, true);


    player.game = game;
    computerArr.forEach( computer => {computer.game = game;});

    const play = document.getElementsByClassName('play-again')[0];
    play.addEventListener("click", function () {
        const lost = document.getElementById('lost');
        lost.classList.remove('show');
        document.location.reload();
        game.start.bind(this);
        game.start();
    }, false);


});

function toggleModal() {
    const modal = document.getElementsByClassName('modal')[0];
    if (modal.style.visibility === 'visible') {
        modal.style.visibility = 'hidden';
    } else {
        modal.style.visibility = 'visible';
    }
}

function toggleModal2() {
    const modal = document.getElementsByClassName('modal')[1];
    if (modal.style.visibility === 'visible') {
        modal.style.visibility = 'hidden';
    } else {
        modal.style.visibility = 'visible';
    }
}
function toggleModal3() {
    const modal = document.getElementsByClassName('modal')[2];
    if (modal.style.visibility === 'visible') {
        modal.style.visibility = 'hidden';
    } else {
        modal.style.visibility = 'visible';
    }
}