// Global ui hooks
let aOfficialState = null;
let bOfficialState = null;
let cOfficialState = null;
let queueSize = null;
let queueCapacity = null;
let servedCustomers = null;
let rejectedCustomers = null;
let normalDistMu = null;
let normalDistSigma = null;
let expDistLambda = null;
let inQueueCapacity = null;
let updateParametersButton = null;

let nServedCustomers = 0;
let nRejectedCustomers = 0;
const queueResolver = new Worker("js/queue/queueResolver.js");

window.onload = () => {
    main();
};

function main() {
    aOfficialState = document.getElementById("official-a-state");
    bOfficialState = document.getElementById("official-b-state");
    cOfficialState = document.getElementById("official-c-state");
    const officials = [aOfficialState, bOfficialState, cOfficialState];
    queueSize = document.getElementById("queue-size");
    queueCapacity = document.getElementById("current-queue-capacity");
    servedCustomers = document.getElementById("served-customers");
    rejectedCustomers = document.getElementById("rejected-customers");
    normalDistMu = document.getElementById("normal-dist-mu");
    normalDistSigma = document.getElementById("normal-dist-sigma");
    expDistLambda = document.getElementById("exp-dist-lambda");
    inQueueCapacity = document.getElementById("in-queue-capacity");
    updateParametersButton = document.getElementById("update-button");

    queueSize.innerHTML = "0";
    queueCapacity.innerHTML = inQueueCapacity.value;
    for (const official of officials) {
        official.innerHTML = "wolny";
    }
    servedCustomers.innerHTML = nServedCustomers + "";
    rejectedCustomers.innerHTML = nRejectedCustomers + "";

    updateParametersButton.addEventListener("click", () => {
        queueResolver.postMessage({
            type: "params-update",
            content: {
                queueSize: parseInt(inQueueCapacity.value),
                lambda: parseFloat(expDistLambda.value),
                mu: parseFloat(normalDistMu.value),
                sigma: parseFloat(normalDistSigma.value)
            }
        });
    });

    queueResolver.onmessage = (e) => {
        if (e.data.type === "new-customer-in-queue" || e.data.type === "new-customer-rejected" ||
            e.data.type === "send-customer" || e.data.type === "queue-empty") {
            queueSize.innerHTML = e.data.content.queueLength;
            queueCapacity.innerHTML = e.data.content.queueCapacity;
        }
        if (e.data.type === "new-customer-rejected") {
            ++nRejectedCustomers;
            rejectedCustomers.innerHTML = nRejectedCustomers + "";
        }
        if (e.data.type === "official-is-busy") {
            officials[e.data.content.officialId].innerHTML = "zajęty";
        }
        if (e.data.type === "customer-served") {
            officials[e.data.content.officialId].innerHTML = "wolny";
            ++nServedCustomers;
            servedCustomers.innerHTML = nServedCustomers + "";
        }
    };
}