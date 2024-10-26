const { pair, is_null, display, list, head, tail, set_head, set_tail, error } = require("sicp");
////////////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////
const make_wrie = () => {
    let signal_value = 0;
    let action_functions = null;

    const set_my_signal = new_value => {
        if(signal_value !== new_value) {
            signal_value = new_value;
            return call_each(action_functions);
        }else {
            return 'done';
        }
    };

    const accept_action_function = f => {
        action_functions = pair(f, action_functions);
        f();
    }

    return m => m === 'get_signal'
                ? signal_value
                : m === 'set_signal'
                ? set_my_signal
                : m === 'add_action'
                ? accept_action_function
                : error(m, 'unknown operation -- wire');
};

const call_each = functions => {
    if(is_null(functions)) return 'done';
    head(functions)();
    return call_each(tail(functions));
};

const get_signal = wire => wire('get_signal');
const set_signal = (wire, new_value) => wire('set_signal')(new_value);
const add_action = (wire, f) => wire('add_action')(f);
const after_delay = (delay, f) => {
    add_to_agenda(delay + current_time(the_agenda), f, the_agenda);
};

const propagate = () => {
    if (is_empty_agenda(the_agenda)) return 'done';

    const first_item = first_agenda_item(the_agenda);
    first_item();
    remove_first_agenda_item(the_agenda);
    return propagate();
};

const probe = (name, wire) => {
    add_action(wire, () => display(`${name} ${current_time(the_agenda)}, new value = ${get_signal(wire)}`));
};

const make_time_segment = (time, queue) => pair(time, queue);
const segment_time = segments => head(segments);
const segment_queue = segments => tail(segments);

const make_agenda = () => list(0);
const current_time = agenda => head(agenda);
const set_current_time = (agenda, time) => set_head(agenda, time);
const segments = agenda => tail(agenda);
const set_segments = (agenda, segs) => set_tail(agenda, segs);
const first_segment = agenda => head(segments(agenda));
const rest_segments = agenda => tail(segments(agenda));
const is_empty_agenda = agenda => is_null(segments(agenda));

const add_to_agenda = (time, action, agenda) => {
    const belongs_before = segs => is_null(segs) || time < segment_time(head(segs));
    const make_new_item_segment = (time, action) => {
        const q = make_queue();
        insert_queue(q, action);
        return make_time_segment(time, q);
    };
    const add_to_segments = segs => {
        if(segment_time(head(segs)) === time) {
            insert_queue(segment_queue(head(segs)), action);
        }else {
            const rest = tail(segs);
            if(belongs_before(rest)) {
                set_tail(segs, pair(make_new_item_segment(time, action), tail(segs)));
            }else {
                add_to_segments(rest);
            }
        }
    };

    const segs = segments(agenda);
    if(belongs_before(segs)) {
        set_segments(agenda, pair(make_new_item_segment(time, action), segs));
    }else {
        add_to_segments(segs);
    }
};

const remove_first_agenda_item = agenda => {
    const q = segment_queue(first_segment(agenda));
    delete_queue(q);
    if(is_empty_queue(q)) {
        set_segments(agenda, rest_segments(agenda));
    }
};

const first_agenda_item = agenda => {
    if(is_empty_agenda(agenda)) {
        error('agenda is empty -- first_agenda_item');
    }else {
        const first_seg = first_segment(agenda);
        set_current_time(agenda, segment_time(first_seg));
        return front_queue(segment_queue(first_seg));
    }
};

const the_agenda = make_agenda();
const inverter_delay = 2;
const and_gate_delay = 3;
const or_gate_delay = 5;

////////////////////////////////////////////////////////////////////////////////
const half_adder = (a, b, s, c) => {
    const d = make_wrie();
    const e = make_wrie();

    or_gate(a, b, d);
    and_gate(a, b, c);
    inverter(c, e);
    and_gate(d, e, s);

    return 'ok';
};

const inverter = (input, output) => {
    const invert_input = () => {
        const new_value = logical_not(get_signal(input));
        after_delay(inverter_delay, () => set_signal(output, new_value));
    };
    add_action(input, invert_input);
    return 'ok';
};

const logical_not = s => s === 0
                        ? 1
                        : s === 1
                        ? 0
                        : error(s, 'invalid signal');


const and_gate = (a1, a2, output) => {
    const and_action_function = () => {
        const new_value = logical_and(get_signal(a1), get_signal(a2));
        after_delay(and_gate_delay, () => set_signal(output, new_value));
    };
    add_action(a1, and_action_function);
    add_action(a2, and_action_function);
    return 'ok';
};

const logical_and = (a, b) => a === 1 && b === 1
                            ? 1
                            : 0;

const or_gate = (a1, a2, output) => {
    const or_action_function = () => {
        const new_value = logical_or(get_signal(a1), get_signal(a2));
        after_delay(or_gate_delay, () => set_signal(output, new_value));
    };
    add_action(a1, or_action_function);
    add_action(a2, or_action_function);
    return 'ok';
};

const logical_or = (a, b) => a === 1 || b === 1
                            ? 1
                            : 0;
////////////////////////////////////////////////////////////////////////////////

const input_1 = make_wrie();
const input_2 = make_wrie();
const sum = make_wrie();
const carray = make_wrie();

probe('sum', sum);

probe('carray', carray);

half_adder(input_1, input_2, sum, carray);

set_signal(input_1, 1);
propagate();

// set_signal(input_2, 1);
// propagate();