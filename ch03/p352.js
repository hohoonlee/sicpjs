const { pair, is_null } = require("sicp");

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

const half_adder = (a, b, s, c) => {
    const d = make_wrie();
    const e = make_wrie();

    or_gate(a, b, d);
    and_gate(a, b, c);
    inverter(c, e);
    and_gate(d, e, s);

    return 'ok';
};

const full_adder = (a, b, c_in, sum, c_out) => {
    const s = make_wrie();
    const c1 = make_wrie();
    const c2 = make_wrie();

    half_adder(b, c_in, s, c1);
    half_adder(a, s, sum, c2);
    or_gate(c1, c2, c_out);

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
                            ? true
                            : false;

// ex3.28 //////////////////////////////////////////////////////////////////
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
                            ? true
                            : false;
///////////////////////////////////////////////////////////////////////////
// ex3.29 //////////////////////////////////////////////////////////////////
const or_gate2 = (a1, a2, output) => {
    const or_action_function = () => {
        after_delay(and_gate_delay + inverter_delay * 2, () => set_signal(output, get_signal(o4)));
    };
    const o1 = new_wire();
    const o2 = new_wire();
    const o3 = new_wire();
    const o4 = new_wire();

    inverter(a1, o1);
    inverter(a2, o2);
    and_gate(o1, o2, o3);
    inverter(o3, o4);

    add_action(a1, or_action_function);
    add_action(a2, or_action_function);
    return 'ok';
}
///////////////////////////////////////////////////////////////////////////
// ex3.30 //////////////////////////////////////////////////////////////////
const ripple_carry_adder = (inputs, sum, carry) => {
    const a1 = head(inputs);
    const b1 = head(tail(inputs));
    const c_out1 = new_wire();
    const s_out1 = new_wire();
    full_adder(a1, b1, carray, s_out1, c_out1);

    const a2 = head(tail(tail(inputs)));
    const b2 = head(tail(tail(tail(inputs))));
    const c_out2 = new_wire();
    const s_out2 = new_wire();
    full_adder(a2, b2, c_out1, s_out2, c_out2);
};
///////////////////////////////////////////////////////////////////////////