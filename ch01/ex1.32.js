const accumulate = (combiner, null_value, term, a, next, b) => a > b
															? null_value
															: combiner(term(a), accumulate(combiner, null_value, term, next(a), next, b));

const sum = (term, a, next, b) => accumulate((x,y) => x + y, 0, term, a, next, b);
const product = (term, a, next, b) => accumulate((x,y) => x * y, 1, term, a, next, b);

const identity = x => x;

const inc = x => x + 1;

const sum_interger = (a, b) => sum(identity, a, inc, b);

console.log(sum_interger(1, 10));

const factorial = n => product(identity, 1, inc, n);

console.log(factorial(10));

/////////////////////////////////////////////////////
const filterd_accumulate = (filter, combiner, null_value, term, a, next, b) => a > b
															? null_value
															: filter(a)
															? combiner(term(a), filterd_accumulate(filter, combiner, null_value, term, next(a), next, b))
															: filterd_accumulate(filter, combiner, null_value, term, next(a), next, b);

const square = n => n * n;

const smallest_divisor = n => find_divisor(n, 2);

const find_divisor = (n, test_divisor) => square(test_divisor) > n
										? n
										: divides(test_divisor, n)
										? test_divisor
										: find_divisor(n, test_divisor + 1);

const divides = (a, b) => b % a === 0;

const is_prime = n => n > 1 && n === smallest_divisor(n);

const func_a = (a, b) => filterd_accumulate(is_prime, (x, y) => x + y, 0, square, a, inc, b);

console.log(func_a(1, 10));