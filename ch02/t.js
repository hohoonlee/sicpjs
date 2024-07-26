const zero = 	f => x => x;
const one = 	f => x => f(x);
const two = 	f => x => f(one(f)(x));
const three = 	f => x => f(two(f)(x));

const printLambda = f => f(n => n+1)(0);

console.log(printLambda(zero));
console.log(printLambda(one));
console.log(printLambda(two));
console.log(printLambda(three));

const plus = m => n => f => x => m(f)(n(f)(x));

console.log(":" + printLambda(plus(one)(one)));
console.log(":" + printLambda(plus(two)(three)));

const pair = a => b => f => f(a)(b);
const head = a => b => a;
const tail = a => b => b;

const p1 = pair(1)(2);
console.log(p1(head));
console.log(p1(tail));

const TRUE = a => b => a;
const FALSE = a => b => b;

const AND = a => b => a(b)(FALSE);
const OR = a => b => a(TRUE)(b);

console.log(AND(TRUE)(TRUE));