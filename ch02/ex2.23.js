const {list, display, head, tail} = require('sicp');

const for_each = (fun, items) => (!items)
                                ? true
                                : (fun(head(items)), for_each(fun, tail(items)));

for_each(x => display(x), list(57, 321, 88));