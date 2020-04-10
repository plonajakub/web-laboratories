window.onload = () => {
    setupGame();
}

function setupGame() {
    const gameButton = document.getElementById("game-button");
    const timeHolder = document.getElementById("time-holder");
    const scoreHolder = document.getElementById("score-holder");
    const gameElementHook = document.getElementById("game-element");
    const gameArea = document.getElementById("game-area");

    let score = 0;

    const clock = {
        clockHolder: timeHolder,
        currentTime: 0,
        resetTime: function () {
            this.currentTime = 0;
            this.clockHolder.innerHTML = 0 + "";
        },
        incrementClock: function () {
            ++this.currentTime;
            this.clockHolder.innerHTML = this.currentTime + "";
        }
    }

    const gameObjectState = {
        CLICK: "click",
        DNCLICK: "do_not_click"
    }

    const direction = {
        axisX: {
            RIGHT: 1,
            LEFT: 3
        },
        axisY: {
            UP: 0,
            DOWN: 2
        }
    }

    const gameObject = {
        state: gameObjectState.DNCLICK,
        pxPerMove: 25,
        currentPosition: [0, 0], // [x,y]
        limits: [gameArea.offsetWidth - gameElementHook.offsetWidth,
            gameArea.offsetHeight - gameElementHook.offsetHeight], // [xLimit, yLimit]
        getActionScore: function () {
            switch (this.state) {
                case gameObjectState.CLICK:
                    return 2;
                case gameObjectState.DNCLICK:
                    return 0;
            }
        },
        nextPosition: function () {
            let nextDirection = 0;
            let nextDelta = [0, 0];
            let nextPosition = [0, 0];
            do {
                nextDirection = Math.floor(Math.random() * 4);
                switch (nextDirection) {
                    case direction.axisX.LEFT:
                        nextDelta[0] = -this.pxPerMove;
                        break;
                    case direction.axisX.RIGHT:
                        nextDelta[0] = this.pxPerMove;
                        break;
                    case direction.axisY.UP:
                        nextDelta[1] = -this.pxPerMove;
                        break;
                    case direction.axisY.DOWN:
                        nextDelta[1] = this.pxPerMove;
                        break;
                }
                nextPosition[0] = this.currentPosition[0] + nextDelta[0];
                nextPosition[1] = this.currentPosition[1] + nextDelta[1];
            } while (nextPosition[0] < 0 || nextPosition[0] > this.limits[0] ||
            nextPosition[1] < 0 || nextPosition[1] > this.limits[1])
            this.currentPosition[0] = nextPosition[0];
            this.currentPosition[1] = nextPosition[1];
            gameElementHook.style.left = this.currentPosition[0] + "px";
            gameElementHook.style.top = this.currentPosition[1] + "px";
        },
        rollNextState: function () {
            const roll = Math.floor(Math.random() * 5);
            if (roll === 0) {
                this.state = gameObjectState.CLICK;
                gameElementHook.style.background = "green";
            } else {
                this.state = gameObjectState.DNCLICK;
                gameElementHook.style.background = "red";
            }
        }
    }

    gameElementHook.addEventListener("click", () => {
        score += gameObject.getActionScore();
        scoreHolder.innerHTML = score + "";
    });

    gameArea.addEventListener("click", () => {
        score += -1;
        scoreHolder.innerHTML = score + "";
    })

    gameButton.addEventListener("click", () => {
        clock.resetTime();
        score = 0;
        scoreHolder.innerHTML = 0 + "";
    });

    setInterval(() => {
        gameObject.nextPosition();
    }, 1);

    setInterval(() => {
        gameObject.rollNextState();
    }, 500);

    setInterval(() => {
        clock.incrementClock();
    }, 1000);
}
