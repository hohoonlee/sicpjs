const { is_null, pair, head, tail, set_tail, list, display_list, display } = require("sicp");

const append = (x, y) => is_null(x)
                        ? y
                        : pair(head(x), append(tail(x), y));


const append_mutator = (x, y) => {
    set_tail(last_pair(x), y);
    return x;
}

const last_pair = x => is_null(tail(x))
                    ? x
                    : last_pair(tail(x));


const x = list('a', 'b');
const y = list('c', 'd')
const z = append(x, y);

display(z);
display(tail(x));

const w = append_mutator(x, y);

display(w);
display(tail(x));