const zero = f => x => x;
const one = f => x => f(x);
const two = f => x => f(f(x));

const add_1 = n => f => x => f(n(f)(x));

const l_true = a => b => a;
const l_false = a => b => b;

console.log(l_true(1)(2));
console.log(l_false(1)(2));

console.log(two(x => x+1)(0));
console.log(add_1(two)(x => x+1)(0));

const plus = p1 => p2 => f => x => p1(p2(f))(x);

console.log(plus(one)(two)(x => x+1)(0));