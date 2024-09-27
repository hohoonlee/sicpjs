const {list, map, display_list, is_null, head, tail, pair, append, is_pair } = require('sicp');

const square = x => x * x;

display_list(
    map(square, list(1, 2, 3, 4, 5))
);

const filter = (predicate, sequence) => is_null(sequence)
                                        ? null
                                        : predicate(head(sequence))
                                        ? pair(head(sequence), filter(predicate, tail(sequence)))
                                        : filter(predicate, tail(sequence));

const is_odd = x => x % 2 === 1;

display_list(
    filter(is_odd, list(1, 2, 3, 4, 5))
);

const accumulate = (op, initial, sequence) => is_null(sequence)
                                                ? initial
                                                : op(head(sequence), accumulate(op, initial, tail(sequence)));

display_list(
    accumulate((a, b) => a + b, 0, list(1, 2, 3, 4, 5))
);

display_list(
    accumulate((a, b) => a * b, 1, list(1, 2, 3, 4, 5))
);

display_list(
    accumulate(pair, null, list(1, 2, 3, 4, 5))
);

const enumerate_interval = (low, high) => low > high
                                        ? null
                                        : pair(low, enumerate_interval(low + 1, high));

display_list(
    enumerate_interval(2, 7)
);

const enumerate_tree = tree => is_null(tree)
                                ? null
                                : !is_pair(tree)
                                ? list(tree)
                                : append(
                                        enumerate_tree(head(tree)),
                                        enumerate_tree(tail(tree))
                                    );

display_list(
    enumerate_tree(list(1, list(2, list(3, 4)), 5))
);

const sum_odd_sequence = tree => accumulate((a, b) => a + b, 0, map(x => x * x, filter(is_odd, tree)));

display_list(
    sum_odd_sequence(list(1, 2, 3))
);

const is_even = x => !is_odd(x);

const fib = n => n === 0
				? 0
				: n === 1
				? 1
				: fib(n-2) + fib(n-1);

const even_fib = n => accumulate(pair, null, filter(is_even, map(fib, enumerate_interval(0, n))));

display_list(
    map(fib, enumerate_interval(0, 10))
);

display_list(
    even_fib(10)
);