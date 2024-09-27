const {pair, head, tail, is_null, equal, display_list} = require('sicp');

//p.233
const is_element_of_set = (x, set) => is_null(set)
                                    ? false
                                    : x == head(set)
                                    ? true
                                    : x < head(set)
                                    ? false
                                    : is_element_of_set(x, tail(set));

//p.234
const intersection_set = (set1, set2) => {
    if(is_null(set1) || is_null(set2)) return null;
    const x1 = head(set1);
    const x2 = head(set2);
    return x1 === x2
            ? pair(x1, intersection_set(tail(set1), tail(set2)))
            : x1 < x2
            ? intersection_set(tail(set1), set2)
            : intersection_set(set1, tail(set2));
};

//ex2.61
const adjoin_set = (x, set) => is_null(set)
                            ? pair(x, null)
                            : x < head(set)
                            ? pair(x, set)
                            : x === head(set)
                            ? set
                            : pair(head(set), adjoin_set(x, tail(set)));

//ex.2.62
const union_set = (set1, set2) => {
    if(is_null(set1)) return set2;
    if(is_null(set2)) return set1;

    const x1 = head(set1);
    const x2 = head(set2);

    return (x1 === x2)
            ? pair(x1, union_set(tail(set1), tail(set2)))
            : (x1 < x2)
            ? pair(x1, union_set(tail(set1), set2))
            : pair(x2, union_set(set1, tail(set2)));
};

console.log('ex.2.61-------------------------');
const s1 = pair(1, pair(2, null));
const s2 = adjoin_set(10, s1);
display_list(s2);
const s3 = adjoin_set(5, s2);
display_list(s3);

console.log('ex.2.62-------------------------');
const s10 = pair(1, pair(2, pair(3, pair(4, null))));
const s20 = pair(1, pair(4, pair(10, null)));
display_list(union_set(s10, s20));