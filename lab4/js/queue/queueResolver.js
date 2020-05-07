const queue = new Worker("queue.js");
const officials = [new Worker("official.js"),
    new Worker("official.js"),
    new Worker("official.js")];

let isTransactionActive = false;
let officialAnswers = [false, false, false]; // does official answered
const officialBusy = [false, false, false]; // state of the official

setupQueueResolver();

function setupQueueResolver() {
    onmessage = (e) => {
        if (e.data.type === "params-update") {
            queue.postMessage(e.data);
        }
    };
    queue.onmessage = (e) => {
        postMessage(e.data);
        if (e.data.type === "new-customer-in-queue" || e.data.type === "new-customer-rejected") {
            queryOfficials();
        }
        if (e.data.type === "send-customer") {
            for (let i = 0; i < officials.length; ++i) {
                if (!officialBusy[i]) {
                    e.data.content.officialId = i;
                    officials[i].postMessage(e.data);
                    break;
                }
            }
            cleanUpTransaction();
        }
        if (e.data.type === "queue-empty") {
            cleanUpTransaction();
        }
    };
    for (let i = 0; i < officials.length; ++i) {
        officials[i].onmessage = (e) => {
            postMessage(e.data);
            if (e.data.type === "response-busy") {
                officialBusy[e.data.content.officialId] = e.data.content.isBusy;
                officialAnswers[e.data.content.officialId] = true;
                if (officialAnswers.every(answered => answered)) {
                    if (officialBusy.every(isBusy => isBusy)) {
                        cleanUpTransaction();
                        return;
                    }
                    queue.postMessage({
                        type: "get-customer",
                        content: null
                    });
                }
            }
            if (e.data.type === "request-client") {
                queryOfficials();
            }
        };
    }
}

function queryOfficials() {
    if (isTransactionActive) {
        return;
    }
    isTransactionActive = true;
    for (let i = 0; i < officials.length; ++i) {
        officials[i].postMessage({
            type: "query-busy",
            content: {
                officialId : i
            }
        });
    }
}

function cleanUpTransaction() {
    for (let i = 0; i < officials.length; ++i) {
        officialBusy[i] = false;
        officialAnswers[i] = false;
    }
    isTransactionActive = false;
}