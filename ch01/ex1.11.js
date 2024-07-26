const f = n => n < 3
				? n
				: f(n-1) + (2 * f(n-2)) + (3 * f(n - 3));

console.log(f(3));
console.log(f(4));

const ff = n => ff_iter(2, 1, 0, n);

const ff_iter = (a, b, c, n) => n === 0
								? c
								: ff_iter(a + 2 * b + 3 * c, a, b, n-1);

console.log(ff(3));
console.log(ff(4));
