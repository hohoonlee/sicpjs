const {list, head, tail, is_null, display_list, append, pair, length, math_floor} = require("sicp");

const entry = tree => head(tree);
const left_branch = tree => head(tail(tree));
const right_branch = tree => head(tail(tail(tree)));
const make_tree = (entry, left, right) => list(entry, left, right);

const is_element_of_set = (x, set) => is_null(set)
                                    ? false
                                    : x === entry(set)
                                    ? true
                                    : x < entry(set)
                                    ? is_element_of_set(x, left_branch(set))
                                    : is_element_of_set(x, right_branch(set));

const adjoin_set = (x, set) => is_null(set)
                            ? make_tree(x, null, null)
                            : x === entry(set)
                            ? set
                            : x < entry(set)
                            ? make_tree(
                                entry(set),
                                adjoin_set(x, left_branch(set)),
                                right_branch(set)
                            )
                            : make_tree(
                                entry(set),
                                left_branch(set),
                                adjoin_set(x, right_branch(set))
                            );

const tree10 = make_tree(10, null, null);
display_list(tree10);
const tree1 = adjoin_set(1, tree10);
display_list(tree1);
const tree15 = adjoin_set(15, tree1);
display_list(tree15);

//ex.2.63
const tree_to_list_1 = tree => is_null(tree)
                            ? null
                            : append(tree_to_list_1(left_branch(tree)), pair(entry(tree), tree_to_list_1(right_branch(tree))));

const tree_to_list_2 = tree => {
    const copy_to_list = (tree, result_list) => is_null(tree)
                                            ? result_list
                                            : copy_to_list(left_branch(tree), pair(entry(tree), copy_to_list(right_branch(tree), result_list)));

    return copy_to_list(tree, null);
};
console.log('ex2.63-----------------');
const t1 = adjoin_set(5, adjoin_set(3, make_tree(1, null, null)));
display_list(tree_to_list_1(t1));
display_list(tree_to_list_2(t1));
const t2 = adjoin_set(11, adjoin_set(9, adjoin_set(7, t1)));
display_list(tree_to_list_1(t2));
display_list(tree_to_list_2(t2));

//ex.2.64
const list_to_tree = elements => head(partial_tree(elements, length(elements)));

const partial_tree = (elts, n) => {
    if(n === 0) return pair(null, elts);

    const left_size = math_floor((n -1 ) / 2);
    const left_result = partial_tree(elts, left_size);
    const left_tree = head(left_result);

    const non_left_elts = tail(left_result);

    const this_entry = head(non_left_elts);

    const right_size = n - (left_size + 1);
    const right_result = partial_tree(tail(non_left_elts), right_size);
    const right_tree = head(right_result);

    const remaining_elts = tail(right_result);
    return pair(make_tree(this_entry, left_tree, right_tree), remaining_elts);
};
console.log('ex2.64-----------------');
const tree_1 = list_to_tree(list(1, 3, 5, 7, 9, 11));
display_list(tree_1);
display_list(adjoin_set(8, tree_1));

// const union_set = (set1, set2) => list_to_tree(append(tree))