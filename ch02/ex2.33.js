const { accumulate, display_list, list, pair } = require("sicp");

const map = (f, sequence) => accumulate((x, y) => pair(f(x), y) , null, sequence);

display_list(
    map(x => x * x, list(1, 2, 3))
);

const append = (seq1, seq2) => accumulate(pair, seq2, seq1);

display_list(
    append(list(1, 2, 3), list(4, 5, 6))
);

const length = sequence => accumulate((a, b) => b + 1, 0, sequence);

display_list(
    length(list(1, 2, 3, 10))
);