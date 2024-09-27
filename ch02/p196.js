const {display_list, pair, list, accumulate, append, map} = require('sicp');

const enumerate_interval = (low, high) => low > high
                                        ? null
                                        : pair(low, enumerate_interval(low + 1, high));

display_list(
    enumerate_interval(1, 3)
);

const unique_pairs = n => accumulate(append, null, 
    map(
        i => map(
                j => list(i,j), 
                enumerate_interval(1,n -1)), 
        enumerate_interval(1, n)
    )
);

display_list(unique_pairs(3));

const flatmap = (f, seq) => accumulate(append, null, map(f, seq));