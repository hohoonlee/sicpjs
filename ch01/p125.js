const search = (f, neg_point, pos_point) => {
	const midpoint = average(neg_point, pos_point);
	if (close_enough(neg_point, pos_point)) return midpoint;

	const test_value = f(midpoint);
	return positive(test_value)
			? search(f, neg_point, midpoint)
			: negative(test_value)
			? search(f, midpoint, pos_point)
			: midpoint;
};

const half_interval_method = (f, a, b) => {
	const a_value = f(a);
	const b_value = f(b);

	return negative(a_value) && positive(b_value)
			? search(f, a, b)
			: negative(b_value) && positive(a_value)
			? search(f, b, a)
			: console.error('values are not of opposite sign');
};

const average = (a, b) => (a + b) / 2;

const close_enough = (a, b) => Math.abs(a - b) < 0.001;

const positive = a => a > 0;

const negative = a => a < 0;

console.log(half_interval_method(Math.sin, 2, 4));
console.log(half_interval_method(x => x * x * x - 2 * x - 3, 1, 2));