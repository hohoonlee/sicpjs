const {pair, head: lower_bound, tail: upper_bound} = require('../lib/common');

const make_interval = (x, y) => pair(x, y);

const add_interval = (x, y) => make_interval(lower_bound(x) + lower_bound(y), upper_bound(x) + upper_bound(y));

const mul_interval = (x, y) => {
	const p = [
		lower_bound(x) * lower_bound(y),
		lower_bound(x) * upper_bound(y),
		upper_bound(x) * lower_bound(y),
		upper_bound(x) * upper_bound(y)
	];
	return make_interval(Math.min(...p), Math.max(...p));
};

const div_interval = (x, y) => mul_interval(x, make_interval(1 / upper_bound(y), 1 / lower_bound(y)));

const sub_interval = (x, y) => make_interval(lower_bound(x) - lower_bound(y), upper_bound(x) - upper_bound(y));