const {display_list, list, pair, head, tail, map, is_list} = require('sicp');

const square = x => x * x;

// const tree_map = (f, tree) => {
//     return map(x => {
//         return is_list(x)
//                 ? tree_map()

//     }, tree);
// }

const tree_map = (f, tree) => map(x => is_list(x)? tree_map(f, x):f(x), tree);

const square_tree = tree => tree_map(square, tree);

display_list(
    square_tree(
        list(1,
            list(2, list(3, 4), 5),
            list(6, 7)
        )
    )
);