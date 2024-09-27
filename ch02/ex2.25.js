const {list, head, tail, display_list} = require('sicp');

const x = list(1, 3, list(5, 7), 9);
console.log(
    head(tail(head(tail(tail(x)))))
);

const y = list(list(7));
console.log(
    head(head(y))
);

const z = list(1, list(2, list(3, list(4, list(5, list(6, 7))))));
display_list(
    head(tail(head(tail(head(tail(head(tail(head(tail(head(tail(z))))))))))))
);