const {list, head, tail, is_null} = require('sicp');

const equal = (list1, list2) => (is_null(list1) && is_null(list2))
                                ? true
                                :(head(list1) === head(list2)) && equal(tail(list1), tail(list2));

console.log(
    equal(list('this', 'is', 'a', 'list'), list('this', 'is', 'a', 'list'))
);

console.log(
    equal(list('this', 'is', 'a', 'list'), list('this', list('is', 'a'), 'list'))
);