const {list, pair, head, tail, is_null, is_pair, accumulate, map, length} = require('sicp');

const count_leaves = x => is_null(x)
                        ? 0
                        : !is_pair(x)
                        ? 1
                        : count_leaves(head(x)) + count_leaves(tail(x));

const x = pair(list(1,2), list(3,4));

console.log(count_leaves(x));
console.log(count_leaves(list(x,x)));

// 실패
const count_leaves_accumulate = t => accumulate(
    (x, len) => len + 1,
    0,
    map(x => {
    }, t)
);

console.log(count_leaves_accumulate(x));
console.log(count_leaves_accumulate(list(x,x)));