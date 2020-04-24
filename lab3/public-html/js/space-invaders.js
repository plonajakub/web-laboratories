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

class Alien extends Drawable {
    constructor(startX, startY, dx, dy, width, height, color, ctx, xSpeed, ySpeed, startHp) {
        super(startX, startY, dx, dy, width, height, color, ctx, Shapes.rectangle);
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.hp = startHp;
        this.xDirs = {
            left: "left",
            right: "right"
        };
        this.currentDir = this.xDirs.right;
    }

    detectDirectionChange() {
        if (this.x - this.width / 2 - this.xSpeed * this.dx < 0) {
            return true;
        }
        if (this.x + this.width / 2 + this.xSpeed * this.dx > this.ctx.canvas.width) {
            return true;
        }
        return false;
    }

    move() {
        if (this.isVisible) {
            switch (this.currentDir) {
                case this.xDirs.right:
                    this.x += this.xSpeed * this.dx;
                    break;
                case this.xDirs.left:
                    this.x -= this.xSpeed * this.dx;
                    break;
            }
        }
    }
}

class Aliens {
    constructor(alienColor, alienMarginPercentageX, alienMarginPercentageY, siegeHeightPercentage,
                mainMarginPercentageX, mainMarginPercentageY, ctx) {
        this.alienColor = alienColor;
        this.alienMarginPercentageX = alienMarginPercentageX;
        this.alienMarginPercentageY = alienMarginPercentageY;
        this.mainMarginPercentageX = mainMarginPercentageX;
        this.mainMarginPercentageY = mainMarginPercentageY;
        this.ctx = ctx;
        this.siegeHeightPercentage = siegeHeightPercentage;

        this.list = [];
    }

    initialize(alienSpeedX, alienSpeedY, alienHp, nAliensX, nAlienY) {
        const alienSiegeAreaHeight = this.siegeHeightPercentage * this.ctx.canvas.height;
        const alienStartingAreaHeight = alienSiegeAreaHeight / 2;
        const mainMarginX = this.mainMarginPercentageX * this.ctx.canvas.width;
        const mainMarginY = this.mainMarginPercentageY * this.ctx.canvas.height;
        const alienAreaWidth = this.ctx.canvas.width - 2 * mainMarginX;
        const alienAreaHeight = alienStartingAreaHeight - mainMarginY;
        const alienTotalWidth = alienAreaWidth / nAliensX;
        const alienTotalHeight = alienAreaHeight / nAlienY;
        const alienMarginX = this.alienMarginPercentageX * alienTotalWidth;
        const alienMarginY = this.alienMarginPercentageY * alienTotalHeight;
        const alienWidth = alienTotalWidth - 2 * alienMarginX;
        const alienHeight = alienTotalHeight - 2 * alienMarginY;
        const firstAlienX = mainMarginX + alienMarginX + alienWidth / 2;
        const firstAlienY = mainMarginY + alienMarginY + alienHeight / 2;
        const alienXStep = alienWidth + 2 * alienMarginX;
        const alienYStep = alienHeight + 2 * alienMarginY;


        for (let x = firstAlienX, nx = 0; nx < nAliensX; x += alienXStep, ++nx) {
            for (let y = firstAlienY, ny = 0; ny < nAlienY; y += alienYStep, ++ny) {
                this.list.push(new Alien(x, y, 1, 1, alienWidth, alienHeight, this.alienColor, this.ctx,
                    alienSpeedX, alienSpeedY, alienHp));
            }
        }
    }

    draw() {
        for (const alien of this.list) {
            alien.draw();
        }
    }

    move() {
        const isDirectionChangedForAll = [];
        for (const alien of this.list) {
            isDirectionChangedForAll.push(alien.detectDirectionChange());
        }
        if (isDirectionChangedForAll.some(directionChanged => directionChanged)) {
            for (const alien of this.list) {
                if (alien.currentDir === alien.xDirs.left) {
                    alien.currentDir = alien.xDirs.right;
                } else if (alien.currentDir === alien.xDirs.right) {
                    alien.currentDir = alien.xDirs.left;
                }
            }
        }
        for (const alien of this.list) {
            alien.move();
        }
    }
}

class Bullet extends Drawable {
    constructor(gun, dy, radius, color, ctx) {
        super(gun.x, gun.y - gun.height * 3 / 5, 0, dy, radius, 0, color, ctx, Shapes.circle);
        this.radius = radius;
    }

    move() {
        if (this.y - this.radius < 0) {
            this.isVisible = false;
        }
        if (this.isVisible) {
            super.move();
        }
    }
}

class Gun extends Drawable {
    constructor(startX, startY, dx, width, height, color, ctx) {
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

class Bullets {
    constructor() {
        this.list = [];
    }

    draw() {
        for (const bullet of this.list) {
            bullet.draw();
        }
    }

    move() {
        for (const bullet of this.list) {
            bullet.move();
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
                "#254b93", this.ctx),
            bullets: new Bullets(),
            aliens: new Aliens("#1ba81b", 0.3, 0.2, 0.8,
                0.1, 0.1, this.ctx)
        };
        this.gameObjects.aliens.initialize(3, 1, 3, 11, 5);

        // Handlers
        window.addEventListener("keydown", (event) => {
            if (event.code === "KeyA") {
                this.gameObjects.gun.isMovingLeft = true;
            }
            if (event.code === "KeyD") {
                this.gameObjects.gun.isMovingRight = true;
            }
            if (event.code === "Space" && !event.repeat) {
                this.gameObjects.bullets.list.push(new Bullet(this.gameObjects.gun, -3, 2, "#ff0000", this.ctx));
            }
        });

        window.addEventListener("keyup", (event) => {
            if (event.code === "KeyA") {
                this.gameObjects.gun.isMovingLeft = false;
            }
            if (event.code === "KeyD") {
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
