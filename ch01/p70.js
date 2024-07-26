const abs = x => x >= 0?x:-x;
const square = x => x * x;
const cube = x => square(x) * x;

///////////////////////////////////////////////////////////////////////
const sqrt_iter = (guess, x) => is_good_enough(guess, x)
								? guess
								: sqrt_iter(improve(guess, x), x);

const improve = (guess, x) => average(guess, x / guess);

const average = (x, y) => (x + y) / 2;

const is_good_enough = (guess, x) => abs(square(guess) - x) < 0.001;

const sqrt = x => sqrt_iter(1, x);
///////////////////////////////////////////////////////////////////////
const cubet_iter = (guess, x) => is_good_enough_cube(guess, x)
								? guess
								: cubet_iter(improve_cube(guess, x), x);

const improve_cube = (guess, x) => average_cube(x /square(guess), 2 * guess);

const average_cube = (x, y) => (x + y) / 3;

const is_good_enough_cube = (guess, x) => abs(cube(guess) - x) < 0.001;

const cubet = x => cubet_iter(1, x);
///////////////////////////////////////////////////////////////////////

console.log(sqrt(9));

console.log(cubet(27));