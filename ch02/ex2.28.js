const {list, head, tail, pair, display_list, is_null, is_list, append} = require('sicp');

const headTail = items => [head(items), tail(items)];

const fringe = items => {
    const [h, t] = headTail(items);

    return is_null(t)
            ?is_list(h)
            ?fringe(h)
            :pair(h, null)
            :is_list(h)
            ?append(fringe(h), fringe(t))
            :append(pair(h, null), fringe(t));
};

const x = list(list(1, 2), list(3, 4));

display_list(x);

display_list(fringe(x));

display_list(fringe(list(x,x)));