const product = (term, a, next, b) => a > b
									? 1
									: term(a) * product(term, next(a), next, b);

// const product = (term, a, next, b) => {
// 	const iter = (a, result) => a > b
// 								? result
// 								: iter(next(a), result * term(a));
// 	return iter(a, 1);
// };

const identity = x => x;

const inc = x => x + 1;

const factorial = n => product(identity, 1, inc, n);

console.log(factorial(10));

const term_2 = n => n-1 == 0
					? 2
					: (parseInt(n / 2) + 1) * 2;

const term_3 = n => parseInt((n +1) / 2) * 2 + 1;

// for(const i of [1, 2, 3, 4, 5, 6]) {
// 	console.log(`2 : ${i} => ${next_2(i)}, ${next_3(i)}`);
// }

const pi = n => (product(term_2, 1, inc, n) / product(term_3, 1, inc, n)) * 4;

console.log(pi(50));