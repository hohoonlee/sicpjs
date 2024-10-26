const { pair, head, tail, set_head, set_tail, is_null, error, display } = require("sicp");

const make_queue = () => {
    let front_ptr = null;
    let rear_ptr = null;

    const set_front_ptr = item => front_ptr = item;
    const set_rear_ptr = item => rear_ptr = item;
    const is_empty_queue = () =>  front_ptr === null;
    const front_queue = () => is_empty_queue()
                            ? error('front_queue called with an empty queue')
                            : head(front_ptr);
    const insert_queue = item => {
        const new_pair = pair(item, null);
        if(is_empty_queue()) {
            set_front_ptr(new_pair);
        }else {
            set_tail(rear_ptr, new_pair);
        }
        set_rear_ptr(new_pair);
    };
    const delete_queue = () => {
        if(is_empty_queue()) {
            error('delete_queue called with an empty queue.');
        }else {
            set_front_ptr(tail(front_ptr));
        }
    };

    const dispatch = m =>  m === 'front_ptr'
                        ? () => front_ptr
                        : m === 'rear_ptr'
                        ? () => rear_ptr
                        : m === 'set_front_ptr'
                        ? set_front_ptr
                        : m === 'set_rear_ptr'
                        ? set_rear_ptr
                        : m === 'is_empty_queue'
                        ? is_empty_queue
                        : m === 'front_queue'
                        ? front_queue
                        : m === 'insert_queue'
                        ? insert_queue 
                        : m === 'delete_queue'
                        ? delete_queue 
                        : error('unknown msg : ' + m);
    return dispatch;
};

const q = make_queue();
q('insert_queue')('A');
q('insert_queue')('B');
// display(q);
display(q('front_queue')());
q('delete_queue')();
display(q('front_queue')());