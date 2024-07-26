const cube = n => n * n * n;

// const sum = (term, a, next, b) => (a > b)? 0: term(a) + sum(term, next(a), next, b);
const sum = (term, a, next, b) => {
	const iter = (a, result) => a > b
							? result
							: iter(next(a), result + term(a));
	return iter(a, 0);
};

const inc = n => n +1;

const sum_cubes = (a, b) => sum(cube, a, inc, b);

console.log(sum_cubes(1, 10));

const identity = x => x;

const sum_interger = (a, b) => sum(identity, a, inc, b);

console.log(sum_interger(1, 10));

const pi_sum = (a, b) => {
	const pi_term = x => 1 / (x * (x + 2));
	const pi_next = x => x + 4;

	return sum(pi_term, a, pi_next, b);
};

console.log(8 * pi_sum(1, 1000));

const integral = (f, a, b, dx) => {
	const add_dx = x => x + dx;
	return sum(f, a + dx / 2, add_dx, b) * dx;
};

console.log(integral(cube, 0, 1, 0.01));
console.log(integral(cube, 0, 1, 0.001));


// ex 1.29
const simpson = (f, a, b, n) => {
	const h = (b - a) / n;
	const y = k => f(a + k * h);
	const term = i => i === 0 || i === n
					? y(i)
					: i % 2 === 0
					? 2 * y(i)
					: 4 * y(i);
	return sum(term, 0, inc, n) * h / 3;
};

console.log(simpson(cube, 0, 1, 100));
console.log(simpson(cube, 0, 1, 1_000));