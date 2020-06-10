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
    process.exit(1)
}

main();