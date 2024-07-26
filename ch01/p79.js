const abs = x => x >= 0?x:-x;
const square = x => x * x;

///////////////////////////////////////////////////////////////////////
const sqrt = x => {
	const sqrt_iter = guess => is_good_enough(guess)
								? guess
								: sqrt_iter(improve(guess));

	const improve = guess => average(guess, x / guess);

	const average = (x, y) => (x + y) / 2;

	const is_good_enough = guess => abs(square(guess) - x) < 0.001;

	return sqrt_iter(1);
};
///////////////////////////////////////////////////////////////////////

console.log(sqrt(9));