const {list, pair, head, tail, append, display, display_list, is_null, is_list, map} = require('sicp');

const subsets = s => {
    if(is_null(s)) return list(null);
    const rest = subsets(tail(s));
    return append(rest, map(x => {
        return pair(head(s), x);
    }, rest));
};

display_list(subsets(list(1, 2, 3)));
display(subsets(list(1, 2, 3)));
// display_list(subsets(list(1, 2)));