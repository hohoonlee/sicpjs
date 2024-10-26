const { is_null, set_tail, tail, list, display } = require("sicp");

const mystery = x => {
    const loop = (x, y) => {
        if(is_null(x)) {
            return y;
        }else {
            const temp = tail(x);
            set_tail(x, y);
            return loop(temp, x);
        }

    };
    return loop(x, null);
};

const v = list('a', 'b', 'c', 'd');
display(v);

const w = mystery(v);
display(w);