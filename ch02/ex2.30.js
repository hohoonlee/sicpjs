const {display_list, list, pair, head, tail, map, is_list} = require('sicp');

const square_tree = items => map(x => is_list(x)? square_tree(x):x * x, items);

display_list(
    square_tree(
        list(1,
            list(2, list(3, 4), 5),
            list(6, 7)
        )
    )
);