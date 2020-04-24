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

    fireBullets(alienFireProbability, bullets) {
        let roll;
        for (const alien of this.list) {
            roll = Math.random();
            if (roll < alienFireProbability) {
                bullets.push(new Bullet(alien, 1, 2, "#00ff00", this.ctx, Bullet.Type.alien));
            }
        }
    }

    clean() {
        const aliveAliens = [];
        for (const alien of this.list) {
            if (alien.isVisible) {
                aliveAliens.push(alien);
            }
        }
        this.list = aliveAliens;
    }
}

class Bullet extends Drawable {
    constructor(source, dy, radius, color, ctx, type) {
        super(source.x, source.y - source.height * 3 / 5, 0, dy, radius, 0, color, ctx, Shapes.circle);
        this.radius = radius;
        this.type = type;
    }

    move() {
        if (this.y - this.radius < 0 ||
            this.y + this.radius > this.ctx.canvas.height) {
            this.isVisible = false;
        }
        if (this.isVisible) {
            super.move();
        }
    }
}

class Gun extends Drawable {
    constructor(startX, startY, dx, width, height, color, ctx, startHp) {
        super(startX, startY, dx, 0, width, height, color, ctx, Shapes.rectangle);
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.hp = startHp;
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

Bullet.Type = {
    alien: "alien",
    gun: "gun"
};

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

    clean() {
        const flyingBullets = [];
        for (const bullet of this.list) {
            if (bullet.isVisible) {
                flyingBullets.push(bullet);
            }
        }
        this.list = flyingBullets;
    }
}

class Game {
    constructor() {
        this.gameScoreHolder = document.getElementById("game-score-value");
        this.gameScore = 0;
        this.gameScoreHolder.innerHTML = this.gameScore + "";

        this.isGameOver = false;

        const canvas = document.getElementById("game-canvas");
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const gunWidth = 0.03 * canvas.width;
        const gunHeight = 0.05 * canvas.height;

        this.ctx = canvas.getContext("2d");
        this.gameObjects = {
            gun: new Gun(canvas.width / 2, canvas.height - gunHeight, 5, gunWidth, gunHeight,
                "#254b93", this.ctx, 10),
            bullets: new Bullets(),
            aliens: new Aliens("#1ba81b", 0.3, 0.2, 0.8,
                0.1, 0.05, this.ctx)
        };
        this.gameObjects.aliens.initialize(3, 1, 3, 11, 5);

        this.gunLivesHolder = document.getElementById("game-lives-value");
        this.gunLivesHolder.innerHTML = this.gameObjects.gun.hp + "";

        // Handlers
        window.addEventListener("keydown", (event) => {
            if (event.code === "KeyA") {
                this.gameObjects.gun.isMovingLeft = true;
            }
            if (event.code === "KeyD") {
                this.gameObjects.gun.isMovingRight = true;
            }
            if (event.code === "Space" && !event.repeat) {
                this.gameObjects.bullets.list.push(new Bullet(this.gameObjects.gun, -3, 2, "#ff0000",
                    this.ctx, Bullet.Type.gun));
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

        setInterval(() => {
            this.gameObjects.aliens.fireBullets(0.05, this.gameObjects.bullets.list);
        }, 1000);
    }

    doGlobalActions() {
        this.gameScoreHolder.innerHTML = this.gameScore + "";
        this.gunLivesHolder.innerHTML = this.gameObjects.gun.hp + "";
    }

    detectGlobalCollisions() {
        // Gun bullet hit alien
        for (const bullet of this.gameObjects.bullets.list) {
            if (bullet.type === Bullet.Type.alien) {
                continue;
            }
            for (const alien of this.gameObjects.aliens.list) {
                const nextBulletPositionY = bullet.y - bullet.radius + bullet.dy;
                const bulletPositionX = bullet.x;
                const alienTop = alien.y - alien.height / 2;
                const alienBottom = alien.y + alien.height / 2;
                const alienLeft = alien.x - alien.width / 2;
                const alienRight = alien.x + alien.width / 2;
                if (nextBulletPositionY <= alienBottom &&
                    nextBulletPositionY >= alienTop &&
                    bulletPositionX >= alienLeft &&
                    bulletPositionX <= alienRight) {
                    bullet.isVisible = false;
                    --alien.hp;
                    if (alien.hp <= 0) {
                        ++this.gameScore;
                        alien.isVisible = false;
                    }
                }
            }
        }

        // Alien bullet hit gun
        for (const bullet of this.gameObjects.bullets.list) {
            if (bullet.type === Bullet.Type.gun) {
                continue;
            }
            const nextBulletPositionY = bullet.y + bullet.radius + bullet.dy;
            const bulletPositionX = bullet.x;
            const gunTop = this.gameObjects.gun.y - this.gameObjects.gun.height / 2;
            const gunBottom = this.gameObjects.gun.y + this.gameObjects.gun.height / 2;
            const gunLeft = this.gameObjects.gun.x - this.gameObjects.gun.width / 2;
            const gunRight = this.gameObjects.gun.x + this.gameObjects.gun.width / 2;
            if (nextBulletPositionY <= gunBottom &&
                nextBulletPositionY >= gunTop &&
                bulletPositionX >= gunLeft &&
                bulletPositionX <= gunRight) {
                bullet.isVisible = false;
                --this.gameObjects.gun.hp;
                if (this.gameObjects.gun.hp <= 0) {
                    this.isGameOver = true;
                }
            }
        }
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
        this.gameObjects.bullets.clean();
        this.gameObjects.aliens.clean();
    }

    gameOver() {
        alert(`Koniec gry!\r\nTwój wynik: ${this.gameScore}.`);
    }
}


let game = null;

function gameLoop() {
    if (game.isGameOver) {
        game.gameOver();
        game = null;
        return;
    }
    game.doGlobalActions();
    game.detectGlobalCollisions();
    game.reposition();
    game.redraw();
    requestAnimationFrame(gameLoop);
    game.clean();
}

window.onload = () => {
    document.getElementById("reset-button").addEventListener("click", () => {
        let isGameRunning = true;
        if (game === null) {
            isGameRunning = false;
        }
        game = new Game();
        if (!isGameRunning) {
            gameLoop();
        }
    });
    game = new Game();
    gameLoop();
};
