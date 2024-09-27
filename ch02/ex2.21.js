const {display_list, list, pair, head, tail, map} = require('sicp');

// const square_list = items => !items
//                             ? null
//                             : pair(head(items) * head(items), square_list(tail(items)));

const square_list = items => map(x => x * x, items);

display_list(
    square_list(list(1, 2, 3, 4))
);