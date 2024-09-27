const { list, pair, head, tail, append, is_null, error, display_list, length } = require("sicp");

const make_leaf = (symbol, weight) => list('leaf', symbol, weight);
const is_leaf = object => 'leaf' === head(object);
const symbol_leaf = leaf => head(tail(leaf));
const weight_leaf = leaf => head(tail(tail(leaf)));

const make_code_tree = (left, right) => list(
    'code_tree',
    left,
    right,
    append(symbols(left), symbols(right)),
    parseInt(weight(left)) + parseInt(weight(right))
);
const left_branch = tree => head(tail(tree));
const right_branch = tree => head(tail(tail(tree)));
const symbols = tree => is_leaf(tree)
                        ? list(symbol_leaf(tree))
                        : head(tail(tail(tail(tree))));
const weight = tree => is_leaf(tree)
                        ? list(weight_leaf(tree))
                        : head(tail(tail(tail(tail(tree)))));

const decode = (bits, tree) => {
    const decode_1 = (bits, current_branch) => {
        if(is_null(bits)) return null;
        const next_branch = choose_branch(head(bits), current_branch);
        return is_leaf(next_branch)
            ? pair(symbol_leaf(next_branch), decode_1(tail(bits), tree))
            : decode_1(tail(bits), next_branch);
    };
    return decode_1(bits, tree);
};

const choose_branch = (bit, branch) => bit === 0
                                    ? left_branch(branch)
                                    : bit === 1
                                    ? right_branch(branch)
                                    : error(bit, 'bad bit --- choose_branch');

const adjoin_set = (x, set) => is_null(set)
                            ? list(x)
                            : weight(x) < weight(head(set))
                            ? pair(x, set)
                            : pair(head(set), adjoin_set(x, tail(set)));

const make_leaf_set = pairs => {
    if(is_null(pairs)) return null;
    const first_pair = head(pairs);
    return adjoin_set(
        make_leaf(head(first_pair), head(tail(first_pair))),
        make_leaf_set(tail(pairs))
    );
};

const pairs = list(list('A', 4), list('B', 2), list('C', 1), list('D', 1));
const leaf_set = make_leaf_set(pairs);
display_list(leaf_set);

console.log('ex.2.67-------------------------------');
const sample_tree = make_code_tree(
    make_leaf('A', 4),
    make_code_tree(
        make_leaf('B', 2),
        make_code_tree(
            make_leaf('C', 1),
            make_leaf('D', 1)
        )
    )
);

display_list(sample_tree);
const sample_message = list(0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0);
display_list(decode(sample_message, sample_tree));

console.log('ex.2.68------------------------------');
const encode = (message, tree) => is_null(message)
                                ? null
                                : append(encode_symbol(head(message), tree), encode(tail(message), tree));

const has_symbol = (symbol, symbols) => is_null(symbols)
                                        ? false
                                        : symbol === head(symbols)
                                        ? true
                                        : has_symbol(symbol, tail(symbols));
                                        
const encode_symbol = (msg, tree) => {
    const left = left_branch(tree);
    const left_symbols = symbols(left);
    const right = right_branch(tree);
    const right_symbols = symbols(right);

    return has_symbol(msg, left_symbols)
            ? is_leaf(left)
            ? list(0)
            : append(list(0), encode_symbol(msg, left))
            : has_symbol(msg, right_symbols)
            ? is_leaf(right)
            ? list(1)
            : append(list(1), encode_symbol(msg, right))
            : error('encode error : ' + msg );
};

const sample_msg = list("A", "C", "A", "B", "B", "D", "A");
console.log('list(0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0)');
display_list(encode(sample_msg, sample_tree));

console.log('ex.2.69------------------------------');
const generate_huffman_tree = pairs => successive_merge(make_leaf_set(pairs));
const successive_merge = leaf_set => {
    if(is_code_tree(leaf_set)) return leaf_set;
    const code_tree = make_code_tree(head(leaf_set), head(tail(leaf_set)));
    const remain = tail(tail(leaf_set));
    if(is_null(remain)) return code_tree;
    return successive_merge(adjoin_list(code_tree, remain));
};
const is_code_tree = object => 'code_tree' === head(object);
const adjoin_list = (x, array) => is_null(array)
                            ? list(x)
                            : weight(x) < head(tail(tail(head(array))))
                            ? pair(x, array)
                            : pair(head(array), adjoin_list(x, tail(array)));

display_list(generate_huffman_tree(pairs));

console.log('ex.2.70------------------------------');
const song = list(list('A', 2), list('GET', 2), list('NA', 16), list('YIP', 9), list('BOOM', 1), list('JOB', 2), list('SHA', 3), list('WAH', 1));
const song_message = `Get a job
Sha na na na na na na na na
Get a job
Sha na na na na na na na na
Wah yip yip yip yip yip yip yip yip yip
Sha boom`;

const song_code_tree = generate_huffman_tree(song);
console.log(song_message.toUpperCase().replace(/\n/g, ' ').split(' '));
const result = encode(list(...song_message.toUpperCase().replace(/\n/g, ' ').split(' ')), song_code_tree);
display_list(result);
console.log(length(result));