const { list, head, tail, is_null, equal, is_undefined, pair, set_tail, display, display_list } = require("sicp");

const make_table =  same_key => {
    const local_table = list('*table*');

    const assoc = (key, records) => is_null(records)
                                ? undefined
                                : same_key(key, head(head(records)))
                                ? head(records)
                                : assoc(key, tail(records));

    const lookup = (keys, table=local_table) => {
        const key = head(keys);
        keys = tail(keys);
        if(is_undefined(key)) return undefined;

        const subtable = assoc(key, tail(table));
        if(is_undefined(subtable)) return undefined;

        return is_null(keys)
                ? tail(subtable)
                : lookup(keys, subtable);
    };

    const insert = (keys, value, table=local_table) => {
        const key = head(keys);
        keys = tail(keys);

        const subtable = assoc(key, tail(table));
        if(is_undefined(subtable)) {
            if(is_null(keys)) {
                set_tail(table, pair(pair(key, value), tail(table)));
            }else {
                set_tail(table, pair(list(key), tail(table)));
                insert(keys, value, head(tail(table)));
            }
        }else {
            if(is_null(keys)) {
                set_tail(subtable, value);
            }else {
                insert(keys, value, subtable);
            }
        }
    };

    const dispatch = m => m === 'lookup'
                        ? lookup
                        : m === 'insert'
                        ? insert
                        : m === 'show'
                        ? () => display(local_table)
                        : error(m, 'unknown operation -- table');

    return dispatch;
};

const operation_table = make_table((a,b) => a === b);
const get = operation_table('lookup');
const put = operation_table('insert');
const show = operation_table('show');

put(list("math", '+', 'a'), 43);
put(list("math", '+', 'b'), 77);
show();
console.log(get(list("math", "+", "a")));

put(list("math", '+', 'a'), 10);
show();
console.log(get(list("math", "+", "a")));