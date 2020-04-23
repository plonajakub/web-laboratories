"use strict";

const Shapes = {
    rectangle: "rectangle",
    circle: "circle"
};

class Drawable {
    constructor(startX, startY, dx, dy, width, height, color, ctx, shape) {
        this.x = startX;
        this.y = startY;
        this.dx = dx;
        this.dy = dy;
        this.width = width;
        this.height = height;
        this.color = color;

        this.ctx = ctx;
        this.shape = shape;
        this.isVisible = true;
    }

    draw() {
        if (this.isVisible) {
            this.ctx.beginPath();
            if (this.shape === Shapes.rectangle) {
                this.ctx.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
            } else if (this.shape === Shapes.circle) {
                this.ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
            }
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }
}

class Bullet extends Drawable {
    constructor(gun, dy, radius, color, ctx) {
        super(gun.x, gun.y - gun.height * 3 / 5, 0, dy, radius, 0, color, ctx, Shapes.circle);
    }

    move() {
        if (this.y - this.width < 0) { // this.width = radius
            this.isVisible = false;
        }
        if (this.isVisible) {
            super.move();
        }
    }
}

class Gun extends Drawable {
    constructor(startX, startY, dx, width, height, color, ctx, bullet) {
        super(startX, startY, dx, 0, width, height, color, ctx, Shapes.rectangle);
        this.isMovingLeft = false;
        this.isMovingRight = false;
    }

    move() {
        if (this.isMovingLeft && this.x - this.width / 2 - this.dx >= 0) {
            this.x -= this.dx;
        }
        if (this.isMovingRight && this.x + this.width / 2 + this.dx <= this.ctx.canvas.width) {
            this.x += this.dx;
        }
    }
}

class Game {
    constructor() {
        const canvas = document.getElementById("game-canvas");
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const gunWidth = 0.03 * canvas.width;
        const gunHeight = 0.05 * canvas.height;

        this.ctx = canvas.getContext("2d");
        this.gameObjects = {
            gun: new Gun(canvas.width / 2, canvas.height - gunHeight, 5, gunWidth, gunHeight,
                "#FF0000", this.ctx),
            bullets: {
                list: [],
                draw: function () {
                    for (const bullet of this.list) {
                        bullet.draw();
                    }
                },
                move: function () {
                    for (const bullet of this.list) {
                        bullet.move();
                    }
                }
            },
        }

        // Handlers
        window.addEventListener("keydown", (event) => {
            if (event.key === "a") {
                this.gameObjects.gun.isMovingLeft = true;
            }
            if (event.key === "d") {
                this.gameObjects.gun.isMovingRight = true;
            }
            if (event.key === " " && !event.repeat) {
                this.gameObjects.bullets.list.push(new Bullet(this.gameObjects.gun, -3, 2, "#00FF00", this.ctx));
            }
        });

        window.addEventListener("keyup", (event) => {
            if (event.key === "a") {
                this.gameObjects.gun.isMovingLeft = false;
            }
            if (event.key === "d") {
                this.gameObjects.gun.isMovingRight = false;
            }
        });
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for (const gameObject of Object.values(this.gameObjects)) {
            gameObject.draw();
        }
    }

    reposition() {
        for (const gameObject of Object.values(this.gameObjects)) {
            gameObject.move();
        }
    }

    clean() {
        const visibleBullets = [];
        for (const bullet of this.gameObjects.bullets.list) {
            if (bullet.isVisible) {
                visibleBullets.push(bullet);
            }
        }
        this.gameObjects.bullets.list = visibleBullets;
    }
}


const game = new Game();

function gameLoop() {
    game.reposition();
    game.redraw();
    requestAnimationFrame(gameLoop);
    game.clean();
}

window.onload = () => {
    gameLoop();
};
