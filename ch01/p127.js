const tolerance = 0.00001;
const fixed_point = (f, first_guess) => {
	const close_enough = (x,y) => Math.abs(x - y) < tolerance;
	const try_with = guess => {
		const next = f(guess);
		return close_enough(guess, next)
				? next
				: try_with(next);
	}
	return try_with(first_guess);
}

console.log(fixed_point(Math.cos, 1));
console.log(fixed_point(y => Math.sin(y) + Math.cos(y), 1));

const sqrt = x => fixed_point(y => average(y, x / y), 1);
const average = (a, b) => (a + b) / 2;

console.log(sqrt(81));