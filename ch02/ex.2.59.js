const {pair, head, tail, is_null, equal, display_list} = require('sicp');

//p.231
const is_element_of_set = (x , set) => is_null(set)
                                        ? false
                                        : equal(x, head(set))
                                        ? true
                                        : is_element_of_set(x, tail(set));

//p.232
const adjoin_set = (x, set) => is_element_of_set(x, set)
                                ? set
                                : pair(x, set);

const intersection_set = (set1, set2) => is_null(set1) || is_null(set2)
                                        ? null
                                        : is_element_of_set(head(set1), set2)
                                        ? pair(head(set1), intersection_set(tail(set1), set2))
                                        : intersection_set(tail(set1), set2);
// ex2.59
const union_set = (set1, set2) => is_null(set2)
                                ? set1
                                : is_null(set1)
                                ? set2
                                : union_set(adjoin_set(head(set2), set1), tail(set2));

const s1 = pair(1, pair(2, null));
console.log(is_element_of_set(1, s1));
console.log(is_element_of_set(3, s1));
console.log('-----------------------');

const s2 = adjoin_set(3, s1);
console.log(is_element_of_set(1, s2));
console.log(is_element_of_set(3, s2));
console.log('-----------------------');

display_list(intersection_set(s1, s2));
console.log('-----------------------');

console.log('ex.2.59----------------');
display_list(union_set(s1, s2));
console.log('-----------------------');