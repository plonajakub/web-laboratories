let isBusy = false;

setupOfficial();

function setupOfficial() {
    onmessage = (e) => {
        if (e.data.type === "query-busy") {
            e.data.content.isBusy = isBusy;
            postMessage({
                type: "response-busy",
                content: e.data.content
            });
        }
        if (e.data.type === "send-customer") {
            isBusy = true;
            postMessage({
                type: "official-is-busy",
                content: e.data.content
            });
            setTimeout(() => {
                isBusy = false;
                postMessage({
                    type: "customer-served",
                    content: e.data.content
                });
            }, e.data.content.customer.caseTime * 1000);
        }
    };
}

setInterval(() => {
    if (!isBusy) {
        postMessage({
            type: "request-client",
            content: null
        });
    }
}, 1000);