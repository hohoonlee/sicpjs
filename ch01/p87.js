const fib = n => n === 0
				? 0
				: n === 1
				? 1
				: fib(n-2) + fib(n-1);

console.log(fib(8));


const fibl = n => fib_iter(0, 1, n);
const fib_iter = (a, b, n) => n == 0
								? a
								: fib_iter(a + b, a, n-1);

console.log(fibl(8));