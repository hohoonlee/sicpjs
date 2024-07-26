const pair = (x, y) => m => m(x, y);

const head = z => z((p, q) => p);
const tail = z => z((p, q) => q);


const p1 = pair(10, 20);
console.log(head(p1));
console.log(tail(p1));


// ex2.5
const make_int = (a, b) => pair(a, b);
const value_int = i => Math.pow(2, head(i)) * Math.pow(3, tail(i));
const add_int = (x, y) => {
}