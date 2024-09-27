const {display_list, list, pair, head, tail, map, is_null} = require('sicp');

const square = x => x * x;

const square_list = items => {
    const iter = (things, answer) => {
        return is_null(things)
                ? answer
                // : iter(tail(things), pair(square(head(things)), answer))
                : iter(tail(things), pair(answer, square(head(things))))

    }
    return iter(items, null);
};


display_list(
    square_list(list(1, 2, 3, 4))
);