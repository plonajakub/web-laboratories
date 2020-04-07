function solveEquation() {
    const coefAInput = document.getElementById("coef-a").value;
    const coefBInput = document.getElementById("coef-b").value;
    const coefCInput = document.getElementById("coef-c").value;

    const coefAInfo = document.getElementById("coef-a-info");
    const coefBInfo = document.getElementById("coef-b-info");
    const coefCInfo = document.getElementById("coef-c-info");
    const solutionInfo = document.getElementById("solution-info");

    const coefAHolder = document.getElementById("coef-a-holder");
    const coefBHolder = document.getElementById("coef-b-holder");
    const coefCHolder = document.getElementById("coef-c-holder");

    const root1Holder = document.getElementById("root-1");
    const root2Holder = document.getElementById("root-2");

    let isEquationValid = true;

    const coefA = parseFloat(coefAInput);
    if (isNaN(coefA)) {
        coefAInfo.innerHTML = "Wprowadź liczbę!";
        isEquationValid = false;
    } else if (coefA === 0) {
        coefAInfo.innerHTML = "Wprowadź niezerową wartość!";
        isEquationValid = false;
    } else {
        coefAInfo.innerHTML = "";
    }

    const coefB = parseFloat(coefBInput);
    if (isNaN(coefB)) {
        coefBInfo.innerHTML = "Wprowadź liczbę!";
        isEquationValid = false;
    } else {
        coefBInfo.innerHTML = "";
    }

    const coefC = parseFloat(coefCInput);
    if (isNaN(coefC)) {
        coefCInfo.innerHTML = "Wprowadź liczbę!";
        isEquationValid = false;
    } else {
        coefCInfo.innerHTML = "";
    }


    if (isEquationValid) {
        let root1, root2;
        let delta = Math.pow(coefB, 2) - 4 * coefA * coefC;
        if (delta < 0) {
            root1 = root2 = "";
            solutionInfo.innerHTML = "brak pierwiastków";
        } else if (delta === 0) {
            root1 = -coefB / (2 * coefA);
            root1 = root1.toFixed(2);
            root2 = "";
            solutionInfo.innerHTML = "1 pierwiastek";
        } else {
            root1 = (-coefB - Math.sqrt(delta)) / (2 * coefA);
            root1 = root1.toFixed(2);
            root2 = (-coefB + Math.sqrt(delta)) / (2 * coefA);
            root2 = root2.toFixed(2);
            solutionInfo.innerHTML = "2 pierwiastki";
        }

        coefAHolder.innerHTML = getDecoratedNumber(coefA);
        coefBHolder.innerHTML = getDecoratedNumber(coefB);
        coefCHolder.innerHTML = getDecoratedNumber(coefC);

        root1Holder.innerHTML = root1;
        root2Holder.innerHTML = root2;

    } else {
        coefAHolder.innerHTML = "a";
        coefBHolder.innerHTML = "b";
        coefCHolder.innerHTML = "c";

        root1Holder.innerHTML = "-";
        root2Holder.innerHTML = "-";

        solutionInfo.innerHTML = "równanie niepoprawne";
    }
}

function getDecoratedNumber(number) {
    if (number < 0) {
       return "(" + number.toString() + ")";
    } else {
       return number.toString();
    }
}