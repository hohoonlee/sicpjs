const { list, error, set_head, head } = require("sicp");

const make_serializer = () => {
    const mutex = make_mutex();
    return f => {
        return (...aggs) => {
            mutex('acquire');
            const val = f(...args);
            mutex('release');
            return val;
        };
    };
};

const make_mutex = () => {
    const cell = list(false);
    const the_mutex = m => {
        return  m == 'acquire'
                ? test_and_set(cell)    //ture인 경우 무한 the_mutex 호출
                    ? the_mutex('acquire')
                    : true
                : m === 'release'
                ? clear(cell)
                : error(m, 'unknown request -- mutex');
    };
    return the_mutex;
};

const clear = cell => set_head(cell, false);
const test_and_set = cell => {
    if(head(cell)) {
        return true;
    }else {
        set_head(cell, true);
        return false;
    }
};