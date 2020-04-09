window.onload = () => {
    setupAnimation();
};

function setupAnimation() {
    const animationOriginX = 1;
    const animationOriginY = 5;

    const rocketBgd = document.getElementById("rocket-bgd-img");
    rocketBgd.style.position = "absolute";
    rocketBgd.style.left = px2String(animationOriginX);
    rocketBgd.style.top = px2String(animationOriginY);

    const animation = new Animation("rocket-img", animationOriginX, animationOriginY + 15,
        60, 10, animationOriginX + rocketBgd.width);

    const fasterButton = document.getElementById("faster-but");
    fasterButton.style.width = "100px";
    fasterButton.style.position = "absolute";
    fasterButton.style.left = px2String(animationOriginX);
    fasterButton.style.top = px2String(animationOriginY + rocketBgd.height + 5);

    const slowerButton = document.getElementById("slower-but");
    slowerButton.style.width = "100px";
    slowerButton.style.position = "absolute";
    slowerButton.style.left = px2String(
        animationOriginX + parseInt(fasterButton.style.width) + 10);
    slowerButton.style.top = px2String(animationOriginY + rocketBgd.height + 5);

    fasterButton.addEventListener("click", () => {
        animation.accelerate(2);
    });

    slowerButton.addEventListener("click", () => {
        animation.accelerate(0.5);
    });

    timeoutLoop(animation);
}

function px2String(px) {
    return px + "px";
}

function timeoutLoop(animation) {
    animation.nextPosition();
    setTimeout(timeoutLoop, animation.frameTime, animation); // easier with setInterval()
}

function Animation(animationImgID, originX, originY, frameTime, pxPerFrame, xLimit) {
    this.animationImg = document.getElementById(animationImgID);
    this.originX = originX;
    this.currX = originX;
    this.xLimit = xLimit - this.animationImg.width;
    this.frameTime = frameTime; // ms
    this.pxPerFrame = pxPerFrame;
    this.direction = 1; // 1: right, -1:, left
    this.accelerate = function (times) {
        this.frameTime /= times;
    };
    this.currDelta = function () {
        return this.direction * this.pxPerFrame;
    }
    this.nextPosition = function () {
        if (this.currX + this.currDelta() > this.xLimit || this.currX + this.currDelta() < this.originX) {
            this.direction *= -1;
            if (this.direction === -1) {
                this.animationImg.style.setProperty('transform', 'rotate(180deg)');
            } else {
                this.animationImg.style.setProperty('transform', 'rotate(0)');
            }
        }
        this.currX += this.currDelta();
        this.animationImg.style.left = px2String(this.currX);
    };
    // Setup
    this.animationImg.style.position = "absolute";
    this.animationImg.style.top = px2String(originY);
    this.animationImg.style.left = px2String(this.originX);
}
