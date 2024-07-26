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
/////////////////////////////////////////////////////////////////
const average_damp = f => x => (x + f(x)) / 2;
const square = x => x * x;

console.log(average_damp(square)(10));

const dx = 0.00001;
const derive = g => x => (g(x + dx) - g(x)) / dx;

// x3 => 3 x2
const cube = x => x * x * x;
console.log(cube(5));

const dcube = derive(cube);
console.log(dcube(5));
////////////////////////////////////////////////////////////////

const fixed_point_of_transform = (g, transform, guess) => fixed_point(transform(g), guess);

const sqrt = x => fixed_point_of_transform(y => x / y, average_damp, 1);
console.log(`sqrt(9) : ${sqrt(9)}`);
////////////////////////////////////////////////////////////////

const newton_transform = g => x => x - g(x) / derive(g)(x);

const newton_method = (g, guess) => fixed_point(newton_transform(g), guess);


//ex 1.40 ////////////////////////////////////////////////////////////////
const cubic = (a, b, c) => x => (x * x * x) + (a * x * x) + (b * x) + c;

console.log(newton_method(cubic(1, 1, 1), 1));

console.log('ex 1.41');
const double = f => x => f(f(x));
const inc = x => x +1;
console.log(double(inc)(10));
console.log(double(double(double))(inc)(5));

console.log('ex 1.42');
const compose = (f, g) => x => f(g(x));
console.log(compose(square, inc)(6));

console.log('ex 1.43');
const repeated = (f, n) => (n == 0)
							? n => n
							: compose(f, repeated(f, n-1));

console.log(repeated(square, 2)(5));

console.log('ex 1.44');
const smooth = f => x => (f(x - dx) + f(x) + f(x + dx)) / 3;
const msmooth = (f, n) => repeated(smooth, n)(f);

console.log(smooth(x => x*x)(10));
console.log(msmooth(x => x*x, 5)(10));


//EX 1.46
console.log('ex 1.46')

const iterative_improve = (enough, guess) => {
	return x => {
		enough(x)
		? x
		: iterative_improve(enough, guess)(guess(x));
	}
}