const { list, head, tail, is_null, equal, is_undefined, pair, set_tail } = require("sicp");

const assoc = (key, records) => is_null(records)
                                ? undefined
                                : equal(key, head(head(records)))
                                ? head(records)
                                : assoc(key, tail(records));

const make_table = () => {
    const local_table = list('*table*');

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
                        : error(m, 'unknown operation -- table');

    return dispatch;
};

const operation_table = make_table();
const get = operation_table('lookup');
const put = operation_table('insert');

put("math", '+', 43);
put("math", '-', 45);
put("math", '*', 42);
put('letters', 'a', 97);
put('letters', 'b', 98);

console.log(get("letters", 'a'));