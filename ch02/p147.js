const {pair, head, tail} = require('../lib/common');

const x = pair(1, 2);
console.log(head(x));
console.log(tail(x));

const y = pair(3, 4);
const z = pair(x, y);

console.log(head(head(z)));
console.log(head(tail(z)));