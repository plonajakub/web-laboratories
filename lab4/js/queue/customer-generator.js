class Customer {
    constructor() {
        this.timeToArrive = getTimeToArrive();
        this.caseTime = getCaseTime();
    }
}

let lambda = 1;
let mu = 0;
let sigma = 1;

function getTimeToArrive() {
    return Math.log(1 - Math.random()) / (-lambda); // Exponential distribution
}

function getCaseTime() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let standardNormalDistSample = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    let normalDistSample = sigma * standardNormalDistSample + mu;
    return (normalDistSample > 0)? normalDistSample : 0; // normal distribution (capped by 0 - lower limit)
}

onmessage = (e) => {
    if (e.data.type === "params-update") {
        lambda = e.data.content.lambda;
        mu = e.data.content.mu;
        sigma = e.data.content.sigma;
    }
};

startGeneration();

function startGeneration() {
    let newCustomer = new Customer();
    setTimeout(() => {
        postMessage({
            type: "new-customer",
            content: newCustomer
        });
        startGeneration();
    }, newCustomer.timeToArrive * 1000);
}