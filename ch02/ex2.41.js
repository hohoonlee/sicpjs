const {list, pair, filter, is_null, display_list, accumulate, append, map, head, tail} = require('sicp');

const remove = (item, seq) => filter(s => s != item, seq);

display_list(
    remove(3, list(1, 2, 3, 4, 5))
);

const flatmap = (f, seq) => accumulate(append, null, map(x => f(x), seq));

const permutations = s => is_null(s)
                        ? list(null)
                        : flatmap(x => map(p => list(x, p), permutations(remove(x, s))), s);

display_list(
    permutations(list(1, 2, 4))
);

const enumerate_interval = (low, high) => low > high
                                        ? null
                                        : pair(low, enumerate_interval(low + 1, high));

const triple = (n, s) => {
    const t = enumerate_interval(1, n);
    return flatmap(
        v => tail(v),
        filter(
            v => head(v) === s,
            flatmap( i => flatmap(j => map(k => list(i + j + k, list(i, j, k)),
                    remove(j, remove(i, t))
                ),
                remove(i, t)
            ), t)
        )
    );
};

display_list(
    triple(4, 9)
);
