const math = require('./math.js');

function main() {
    for (let i = 1; i < 17; ++i) {
        let fib_val = math.fibonacci(i);
        if (i < 8) {
            console.log(fib_val);
        } else {
            console.error(fib_val);
        }
    }
    process.exit(0) // The exit code should be 1. Code equal to 0 is for docker deploy
}

main();