const { pair, head, tail, set_head, set_tail, is_null, error, display, display_list } = require("sicp");
/*
    pair ( front_ptr, rear_ptr )
    ptr => pair(pair(item, pre_ptr), next_ptr)
*/

const make_deque = () => pair(null, null);
const front_ptr = deque => head(deque);
const rear_ptr = deque => tail(deque);
const set_front_ptr = (deque, ptr) => set_head(deque, ptr);
const set_rear_ptr = (deque, ptr) => set_tail(deque, ptr);
const is_empty_deque = deque => is_null(front_ptr(deque)) || is_null(rear_ptr(deque));
const front_deque = deque => is_empty_deque(deque)
                            ? error(deque, 'front_deque called with an empty deque')
                            : head(head(front_ptr(deque)));
const rear_deque = deque => is_empty_deque(deque)
                            ? error(deque, 'rear_deque called with an empty deque')
                            : head(head(rear_ptr(deque)));

const front_insert_deque = (deque, item) => {
    const new_ptr = pair(pair(item, null), null);
    if(is_empty_deque(deque)) {
        set_rear_ptr(deque, new_ptr);
    }else {
        set_tail(new_ptr, front_ptr(deque));
        set_tail(head(front_ptr(deque)), new_ptr);
    }
    set_front_ptr(deque, new_ptr);

    return deque;
};
const front_delete_deque = deque => {
    if(is_empty_deque(deque)) {
        error(deque, 'front_delete_deque called with an empty deque.');
    }else {
        if(is_null(tail(front_ptr(deque)))) {
            set_front_ptr(deque, null);
            set_rear_ptr(deque, null);
        }else{
            set_tail(head(tail(front_ptr(deque))), null);
            set_front_ptr(deque, tail(front_ptr(deque)));
        }
        return deque;
    }
};
const rear_insert_deque = (deque, item) => {
    const new_ptr = pair(pair(item, null), null);
    display(new_ptr);
    if(is_empty_deque(deque)) {
        set_front_ptr(deque, new_ptr);
    }else {
        set_tail(head(new_ptr), rear_ptr(deque));
        set_tail(rear_ptr(deque), new_ptr);
    }
    set_rear_ptr(deque, new_ptr);

    return deque;
};
const rear_delete_deque = deque => {
    if(is_empty_deque(deque)) {
        error(deque, 'rear_delete_deque called with an empty deque.');
    }else {
        if(is_null(tail(head(rear_ptr(deque))))) {
            set_front_ptr(deque, null);
            set_rear_ptr(deque, null);
        }else{
            set_tail(tail(head(rear_ptr(deque))), null);
            set_rear_ptr(deque, tail(head(rear_ptr(deque))));
        }
        return deque;
    }
};

const q = make_deque();
rear_insert_deque(q, 'A');
rear_insert_deque(q, 'B');
// display(q);
display(front_deque(q));
front_delete_deque(q);
display(front_deque(q));
front_delete_deque(q);
console.log('---------------');

front_insert_deque(q, 'X');
display(front_deque(q));
display(rear_deque(q));
rear_delete_deque(q);
display(rear_deque(q));