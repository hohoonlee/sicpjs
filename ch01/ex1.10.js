const A = (x, y) => y === 0
					? 0
					: x === 0
					? 2 * y
					: y === 1
					? 2
					: A(x-1, A(x, y-1));


console.log(A(1, 10));
console.log(A(2, 4));
console.log(A(3, 3));

const f = n => A(0, n);		// 2 * n
const g = n => A(1, n);		// 2 ^ n
const h = n => A(2, n);		// (2 ^ n) ^ n
const k = n => 5 * n * n;

console.log(g(4));
console.log(h(4));