const { is_null, list, head, tail } = require("sicp");

const member = (item, x) => is_null(x)
                            ? null
                            : item === head(x)
                            ? x
                            : member(item, tail(x));

console.log(member('apple', list('x', 'y', 'apple', 'pear')));