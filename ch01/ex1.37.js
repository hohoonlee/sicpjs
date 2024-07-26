const cont_face = (n, d, k, i=1) => (i === k)
									? n(k) / d(k)
									: n(i) / (d(i) + cont_face(n, d, k, i+1));

for(let k = 1; k < 15; k++) {
	console.log(`${k} : ${cont_face(i => 1, i => 1, k)}`);
}

const f = k => cont_face(i => 1, i => 1, k);

const guess = (f, first_guess) => {
	const eq = (x,y) => Math.floor(x * 10_000) === Math.floor(y * 10_000);
	const try_with = guess => {
		return eq(f(guess), f(guess+1))
				? guess
				: try_with(guess+1);
	}
	return try_with(first_guess);
}

console.log(guess(f, 1));

console.log('------------------------');
const fd = i => (i % 3 === 2) ? (parseInt(i / 3) + 1) * 2:1;
for(let k = 1; k < 15; k++) {
	console.log(`${k} : ${cont_face(i => 1, fd, k) + 2}`);
}