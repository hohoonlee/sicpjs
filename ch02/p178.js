const {list, pair, head, tail, is_null, is_pair} = require('sicp');

const count_leaves = x => is_null(x)
                        ? 0
                        : !is_pair(x)
                        ? 1
                        : count_leaves(head(x)) + count_leaves(tail(x));

const x = pair(list(1,2), list(3,4));

console.log(count_leaves(x));
console.log(count_leaves(list(x,x)));
