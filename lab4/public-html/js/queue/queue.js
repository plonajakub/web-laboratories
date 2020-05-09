const customersQueue = []
let queueSize = 10;
let generator = null;

setupQueue();

function setupQueue() {
    generator = new Worker("customer-generator.js");
    generator.onmessage = (e) => {
        if (e.data.type === "new-customer") {
            if (customersQueue.length < queueSize) {
                customersQueue.push(e.data.content.customer);
                postMessage({
                    type: "new-customer-in-queue",
                    content: {
                        queueLength: customersQueue.length,
                        queueCapacity: queueSize,
                        customer: e.data.content.customer
                    }
                });
            } else {
                postMessage({
                    type: "new-customer-rejected",
                    content: {
                        queueLength: customersQueue.length,
                        queueCapacity: queueSize,
                        customer: e.data.content.customer
                    }
                });
            }
        }
    };
    onmessage = (e) => {
        if (e.data.type === "params-update") {
            queueSize = e.data.content.queueSize;
            generator.postMessage(e.data);
        }
        if (e.data.type === "get-customer") {
            if (customersQueue.length > 0) {
                postMessage({
                    type: "send-customer",
                    content: {
                        queueLength: customersQueue.length,
                        queueCapacity: queueSize,
                        customer: customersQueue.shift()
                    }
                });
            } else {
                postMessage({
                    type: "queue-empty",
                    content: {
                        queueLength: customersQueue.length,
                        queueCapacity: queueSize,
                        customer: null
                    }
                });
            }
        }
    };
}