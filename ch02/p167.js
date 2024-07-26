const {list, head, tail, pair, display_list} = require('sicp');

const list_ref = (items, n) => (n === 0)?head(items):list_ref(tail(items), n-1);

const squares = list(1, 4, 9, 16, 25);

console.log(list_ref(squares, 3));

// p168
const length = items => (!items)?0: 1 + length(tail(items));

console.log(length(squares));

// p169
const append = (list1, list2) => (!list1)?list2: pair(head(list1), append(tail(list1), list2));

const odds = list(1, 3, 5, 7);

display_list(append(squares, odds));
display_list(append(odds, squares));