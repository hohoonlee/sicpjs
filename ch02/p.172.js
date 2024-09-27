const {pair, list, head, tail, display_list, math_abs:abs} = require('sicp');

const map = (fun, items) => (!items)
                            ? null
                            : pair(fun(head(items)), map(fun, tail(items)));

display_list(
    map(abs, list(-10, 2.5, -11.6, 17))
);

display_list(
    map(x => x* x, list(1, 2, 3, 4))
);