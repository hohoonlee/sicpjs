const gcd = (a, b) => {
    // Ensure a and b are positive integers
    a = Math.abs(a);
    b = Math.abs(b);

    // Swap variables if necessary to ensure a >= b
    if (b > a) {
        [a, b] = [b, a];
    }

    // Iterate until b becomes 0
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }

    return a;
};

const pair = (x, xs) => [x, xs];
const head = xs => xs[0];
const tail = xs => xs[1];

const list = (...arr) => {
	const [first, ...last] = arr;
	return (last.length === 0)
			? pair(first, null)
			: pair(first, list(...last));
}

module.exports = {
	gcd,
	pair,
	head,
	tail,
	list,
	display: console.dir
}