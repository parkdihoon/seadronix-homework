const readline = require('readline');

const counts = {0: 0, 1: 0};

function fibonacci(n) {
    if (n === 0) {
        counts[0]++;
        return 0;
    } else if (n === 1) {
        counts[1]++;
        return 1;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the number of test cases:  ', (T) => {
    T = parseInt(T);

    if (T === 0 || T > 40) {
        console.error('Error: The number of test cases must be between 1 and 40.');
        rl.close();
        return;
    }

    rl.question(`Enter ${T} test cases separated by space (e.g. "1 2 3"): `, (input) => {
        const testCases = input.split(' ').map(Number);

        if (testCases.length > 40) {
            console.error('Error: The number of test cases does not match the input count.');
            rl.close();
            return;
        }

        testCases.forEach((N, index) => {
            counts[0] = 0;
            counts[1] = 0;

            fibonacci(N);

            console.log(
                `Test case ${index + 1} (N === ${N}): 0 is returned ${counts[0]} times, 1 is returned ${counts[1]} times`
            );
        });

        rl.close();
    });
});
