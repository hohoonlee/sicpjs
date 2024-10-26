const { pair, head, tail, set_head, set_tail, is_null, error, display } = require("sicp");

const make_queue = () => pair(null, null);
const front_ptr = queue => head(queue);
const rear_ptr = queue => tail(queue);
const set_front_ptr = (queue, item) => set_head(queue, item);
const set_rear_ptr = (queue, item) => set_tail(queue, item);
const is_empty_queue = queue => is_null(front_ptr(queue));
const front_queue = queue => is_empty_queue(queue)
                            ? error(queue, 'front_queue called with an empty queue')
                            : head(front_ptr(queue));
const insert_queue = (queue, item) => {
    const new_pair = pair(item, null);
    if(is_empty_queue(queue)) {
        set_front_ptr(queue, new_pair);
    }else {
        set_tail(rear_ptr(queue), new_pair);
    }
    set_rear_ptr(queue, new_pair);

    return queue;
};
const delete_queue = queue => {
    if(is_empty_queue(queue)) {
        error(queue, 'delete_queue called with an empty queue.');
    }else {
        set_front_ptr(queue, tail(front_ptr(queue)));
        return queue;
    }
};

const q = make_queue();
insert_queue(q, 'A');
insert_queue(q, 'B');
display(q);
display(front_queue(q));
delete_queue(q);
display(front_queue(q));

//ex3.21
console.log('-- ex3.21 ----------------------------');
const print_queue = queue => display(front_ptr(queue));
const q1 = make_queue();

insert_queue(q1, 'a');
display(q1);
print_queue(q1);

insert_queue(q1, 'b');
display(q1);
print_queue(q1);

delete_queue(q1);
display(q1);
print_queue(q1);

delete_queue(q1);
display(q1);
print_queue(q1);