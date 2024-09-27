const {list, head, tail, display_list} = require('sicp');

const last_pair = items => (!tail(items))?items:last_pair(tail(items));

display_list(
    last_pair(list(23, 72, 149, 34))
);