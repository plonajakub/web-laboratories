window.onload = () => {
    main();
};

function main() {
    const rectangle = document.getElementById("rectangle");
    const filledRectangle = document.getElementById("filled-rectangle");
    const circle = document.getElementById("circle");
    const filledCircle = document.getElementById("filled-circle");

    const clearButton = document.getElementById("clear-button");

    const menuItems = [rectangle, filledRectangle, circle, filledCircle, clearButton];
    const shapeIDs = {
        rectangle: rectangle.id,
        filledRectangle: filledRectangle.id,
        circle: circle.id,
        filledCircle: filledCircle.id
    };
    const color = document.getElementById("color");

    const canvasMain = document.getElementById("canvas-main");
    canvasMain.width = canvasMain.offsetWidth;
    canvasMain.height = canvasMain.offsetHeight;
    const canvasMainCtx = canvasMain.getContext("2d");

    const canvasPreview = document.getElementById("canvas-preview");
    canvasPreview.width = canvasPreview.offsetWidth;
    canvasPreview.height = canvasPreview.offsetHeight;
    const canvasPreviewCtx = canvasPreview.getContext("2d");

    clearButton.addEventListener("click", () => {
        canvasMainCtx.clearRect(0, 0, canvasMain.width, canvasMain.height);
    });

    let currentShape = rectangle.id;
    for (const menuItem of menuItems) {
        if (menuItem.id !== clearButton.id) {
            menuItem.addEventListener("click", () => {
                currentShape = menuItem.id;
            });
        }
        menuItem.addEventListener("mouseover", () => {
            menuItem.style.backgroundColor = "yellow";
        });
        menuItem.addEventListener("mouseout", () => {
            menuItem.style.backgroundColor = "";
        });
        menuItem.addEventListener("mousedown", () => {
            menuItem.style.border = "3px solid crimson";
        });
        menuItem.addEventListener("mouseup", () => {
            menuItem.style.border = "3px solid black";
        });
    }


    let isMouseDown = false;
    canvasPreview.addEventListener("mousedown", (event) => {
        isMouseDown = true;
        drawShape(currentShape, shapeIDs, color, canvasMainCtx, event);
    });
    canvasPreview.addEventListener("mouseup", (event) => {
        isMouseDown = false;
        drawShape(currentShape, shapeIDs, color, canvasMainCtx, event);
    });

    canvasPreview.addEventListener("mousemove", (event) => {
        if (isMouseDown) {
            drawShape(currentShape, shapeIDs, color, canvasMainCtx, event);
        } else {
            canvasPreviewCtx.clearRect(0, 0, canvasPreview.width, canvasPreview.height);
            drawShape(currentShape, shapeIDs, color, canvasPreviewCtx, event);
        }
    });

    canvasPreview.addEventListener("mouseout", () => {
        canvasPreviewCtx.clearRect(0, 0, canvasPreview.width, canvasPreview.height);
    });

    canvasPreview.addEventListener("mouseover", () => {
        isMouseDown = false;
    });
}

function drawShape(shapeId, shapeIDs, color, ctx, mouseEvent) {
    if (shapeId === shapeIDs.rectangle) {
        drawRectangle(ctx,
            mouseEvent.offsetX, mouseEvent.offsetY,
            ctx.canvas.offsetWidth / 10, ctx.canvas.offsetHeight / 10,
            color.value,
            false);
    } else if (shapeId === shapeIDs.filledRectangle) {
        drawRectangle(ctx,
            mouseEvent.offsetX, mouseEvent.offsetY,
            ctx.canvas.offsetWidth / 10, ctx.canvas.offsetHeight / 10,
            color.value,
            true);
    } else if (shapeId === shapeIDs.circle) {
        drawCircle(ctx,
            mouseEvent.offsetX, mouseEvent.offsetY,
            ctx.canvas.offsetWidth / 20,
            color.value,
            false);
    } else if (shapeId === shapeIDs.filledCircle) {
        drawCircle(ctx,
            mouseEvent.offsetX, mouseEvent.offsetY,
            ctx.canvas.offsetWidth / 20,
            color.value,
            true);
    }
}

function drawRectangle(ctx, x, y, width, height, color, isFilled) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    if (isFilled) {
        ctx.fillStyle = color;
        ctx.fill();
    } else {
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}

function drawCircle(ctx, x, y, r, color, isFilled) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    if (isFilled) {
        ctx.fillStyle = color;
        ctx.fill();
    } else {
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}