const f = g => g(2);

const square = x => x * x;

console.log(f(square));

console.log(f(f));