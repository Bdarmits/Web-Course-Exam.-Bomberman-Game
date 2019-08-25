class Bomb extends Items {
    drawItem() {
            this.ctx.arc(this.position.x, this.position.y, 15, 0, Math.PI*2);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
    }

    explosion() {this.status = detonating;}

}
