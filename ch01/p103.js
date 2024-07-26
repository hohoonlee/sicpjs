const square = n => n * n;

const smallest_divisor = n => find_divisor(n, 2);

const find_divisor = (n, test_divisor) => square(test_divisor) > n
										? n
										: divides(test_divisor, n)
										? test_divisor
										: find_divisor(n, test_divisor + 1);

const divides = (a, b) => b % a === 0;

const is_prime = n => n === smallest_divisor(n);


console.log(`3 : ${is_prime(3)}`);
console.log(`10 : ${is_prime(10)}`);
console.log(`11 : ${is_prime(11)}`);

console.log(`199 : ${smallest_divisor(199)}`);
console.log(`1999 : ${smallest_divisor(1999)}`);
console.log(`19999 : ${smallest_divisor(19999)}`);

const display = console.log;

const get_time = () => Date.now();
// const get_time = () => {
// 	const hrTime = process.hrtime();
// 	return hrTime[0] * 1000000000 + hrTime[1];
// }

const report_prime = elapsed_time => {
	display(" *** ");
	display(elapsed_time);
}

const timed_prime_test = n => {
	display(n);
	return start_prime_test(n, get_time());
}

const start_prime_test = (n, start_time) => is_prime(n)
											? report_prime(get_time() - start_time)
											: true;

const search_for_primes = (start, find_count) => {
	return find_count  == 0
	? true
	: timed_prime_test(start)
	? search_for_primes(start +1, find_count)
	: search_for_primes(start +1, find_count-1);
}

search_for_primes(1_000, 3);
search_for_primes(10_000, 3);
search_for_primes(100_000, 3);
search_for_primes(1_000_000, 3);