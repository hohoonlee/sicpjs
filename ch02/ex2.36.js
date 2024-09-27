const {list, pair, head, tail, is_null, is_pair, accumulate, map, display_list } = require('sicp');

const plus = (x, y) => x + y;
const times = (x, y) => x * y;

const accumulate_n = (op, init, seqs) => is_null(head(seqs))
                                        ? null
                                        : pair(accumulate(op, init, map(seq => head(seq), seqs)),
                                                accumulate_n(op, init, map(seq => tail(seq), seqs)));

const s = list(list(1,2,3), list(4,5,6), list(7,8,9), list(10,11,12));

// list(22, 26, 30)
console.log(accumulate_n(plus, 0, s));

// ex2.37
const matrix = list(
    list(1, 2, 3, 4),
    list(4, 5, 6, 7),
    list(6, 7, 8, 9)
);

const dot_product = (v, w) => accumulate(plus, 0, accumulate_n(times, 1, list(v, w)));
display_list(dot_product(matrix, matrix));