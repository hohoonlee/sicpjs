const {list, head, tail, display_list, is_null, pair, is_list} = require('sicp');

const append = (list1, list2) => (!list1)?list2: pair(head(list1), append(tail(list1), list2));

const reverse = items => is_null(tail(items))
                        ?list(head(items))
                        :append(reverse(tail(items)), list(head(items)));

const deep_reverse = items => {
    const h = head(items);
    const t = tail(items);

    return (is_null(t)) 
            ? list((is_list(h)?deep_reverse(h):h))
            : append(deep_reverse(t), list((is_list(h))?deep_reverse(h):h))
};

const x = list(list(1, 2), list(3, 4), list(5, 6));

display_list(x);

display_list(reverse(x));

display_list(deep_reverse(x));