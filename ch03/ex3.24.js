const { list, head, tail, is_null, equal, is_undefined, pair, set_tail, display } = require("sicp");

const make_table =  same_key => {
    const local_table = list('*table*');

    const assoc = (key, records) => is_null(records)
                                ? undefined
                                : same_key(key, head(head(records)))
                                ? head(records)
                                : assoc(key, tail(records));

    const lookup = (key_1, key_2) => {
        const subtable = assoc(key_1, tail(local_table));
        if(is_undefined(subtable)) return undefined;

        const record = assoc(key_2, tail(subtable));
        return is_undefined(record)
                ? undefined
                : tail(record);
    };

    const insert = (key_1, key_2, value) => {
        const subtable = assoc(key_1, tail(local_table));
        if(is_undefined(subtable)) {
            set_tail(local_table, pair(list(key_1, pair(key_2, value)), tail(local_table)));
        }else {
            const record = assoc(key_2, tail(subtable));
            if(is_undefined(record)) {
                set_tail(subtable, pair(pair(key_2, value), tail(subtable)));
            }else {
                set_tail(record, value);
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

const operation_table = make_table((a,b) => a.toUpperCase() === b.toUpperCase());
const get = operation_table('lookup');
const put = operation_table('insert');
const show = operation_table('show');

put("math", '+', 43);
show();
put("math", '-', 45);
put("math", '*', 42);
put('letters', 'a', 97);
put('letters', 'b', 98);

console.log(get("letters", 'a'));
put('letters', 'A', 7);
console.log(get("letters", 'a'));