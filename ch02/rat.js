const {pair, head: numer, tail: denom, gcd} = require('../lib/common');
const make_rat = (n, d) => {
	const an = Math.abs(n);
	const ad = Math.abs(d);
	const sign = (n * d) < 0
				? -1
				: 1;
	const g = gcd(an, ad);
	return pair(sign * an / g, ad / g);
}

module.exports = {
	make_rat,
	numer,
	denom,
	add_rat : (x, y) => make_rat(
							numer(x) * denom(y) + numer(y) * denom(x),
							denom(x) * denom(y)
						),
	mul_rat : (x ,y) => make_rat(
							numer(x) * numer(x),
							denom(x) * denom(y)
						)
};