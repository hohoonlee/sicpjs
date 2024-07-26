const {list, head, tail, display_list} = require('sicp');

const reverse = items => (!tail(items))?items:list(reverse(tail(items)), head(items));

display_list(reverse(list(1, 4, 9, 16, 25)));