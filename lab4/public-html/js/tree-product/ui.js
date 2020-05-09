class UiHandler {
    constructor() {
        this.studentIndex = document.getElementById("student-index");
        this.indexRemainder = document.getElementById("index-remainder");
        this.problemSize = document.getElementById("problem-size");
        this.solveButton = document.getElementById("solve-button");
        this.arrayA = document.getElementById("a-array");
        this.arrayB = document.getElementById("b-array");
        this.solutionProgress = document.getElementById("solution-progress");
        this.solutionValue = document.getElementById("solution-value");

        this.setRemainder();
        this.studentIndex.onchange = () => {
            this.setRemainder();
        };

        this.solver = new Worker("js/tree-product/solver.js");
        this.solver.onmessage = (e) => {
            if (e.data.type === "progress-max") {
                this.solutionProgress.max = e.data.content.max;
            }
            if (e.data.type === "progress-next") {
                this.solutionProgress.value = parseInt(this.solutionProgress.value) + e.data.content.progressValue;
            }
            if (e.data.type === "rolled-data") {
                if (e.data.content.arrayA.length < 50) {
                    this.arrayA.innerHTML = e.data.content.arrayA;
                    this.arrayB.innerHTML = e.data.content.arrayB;
                } else {
                    this.arrayA.innerHTML = "...";
                    this.arrayB.innerHTML = "...";
                }
            }
            if (e.data.type === "solution") {
                this.solutionValue.innerHTML = e.data.content.solutionValue;
                this.solveButton.disabled = false;
            }
        };

        this.solveButton.onclick = () => {
            this.solveButton.disabled = true;
            this.solutionProgress.value = 0;
            this.solutionValue.innerHTML = "-";
            this.solver.postMessage({
                type: "solve",
                content: {
                    problemSize: parseInt(this.problemSize.value)
                }
            });
        };
    }

    setRemainder() {
        this.indexRemainder.innerHTML = (parseInt(this.studentIndex.value) % 5) + "";
    }
}

window.onload = () => {
    new UiHandler();
};
