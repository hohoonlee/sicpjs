const {error, display, list, is_null, member, pair, head, tail} = require('sicp');

const make_connector = () => {
    let value = false;
    let informant = false;
    let constraints = null;

    const set_my_value = (newval, setter) => {
        if(!has_value(me)) {
            value = newval;
            informant = setter;
            return for_each_except(setter, inform_about_value, constraints);
        }else if(value !== newval) {
            error(list(value, newval), 'contradiction');
        }else {
            return 'ignore';
        }
    };

    const forget_my_value = retractor => {
        if(retractor === informant) {
            informant = false;
            return for_each_except(retractor, inform_about_no_value, constraints);
        }else {
            return 'ignore';
        }
    };

    const connect = new_constraints => {
        if(is_null(member(new_constraints, constraints))) {
            constraints = pair(new_constraints, constraints);
        }
        if(has_value(me)) inform_about_value(new_constraints);
        return 'done';
    };

    const me = request => request === 'has_value'
                            ? informant !== false
                            : request === 'value'
                            ? value
                            : request === 'set_value'
                            ? set_my_value
                            : request === 'forget'
                            ? forget_my_value
                            : request === 'connect'
                            ? connect
                            : error(request, 'unknown operation -- connector');
    return me;
};

const for_each_except = (exception, f, list) => {
    const loop = items => {
        if(is_null(items)) return 'done';
        if(head(items) !== exception) f(head(items));
        return loop(tail(items));
    };
    return loop(list);
};

const has_value = connector => connector('has_value');
const get_value = connector => connector('value');
const set_value = (connector, new_value, informant) => connector('set_value')(new_value, informant);
const forget_value = (connector, retractor) => connector('forget')(retractor);
const connect = (connector, new_constraint) => connector('connect')(new_constraint);

const constant = (value, connector) => {
    const me = request => error(request, 'unknown request --- constant');

    connect(connector, me);
    set_value(connector, value, me);
    return me;
};

const inform_about_value = constraint => constraint('I have a value.');
const inform_about_no_value = constraint => constraint('I lost my value.');

const adder = (a1, a2, sum) => {
    const process_new_value = () => {
        if(has_value(a1) && has_value(a2)) {
            set_value(sum, get_value(a1) + get_value(a2), me);
        }else if(has_value(a1) && has_value(sum)) {
            set_value(a2, get_value(sum) - get_value(a1), me);
        }else if(has_value(a2) && has_value(sum)) {
            set_value(a1, get_value(sum) - get_value(a2), me);
        }
    };

    const process_fogot_value = () => {
        forget_value(sum, me);
        forget_value(a1, me);
        forget_value(a2, me);
        process_new_value();
    };

    const me = request => request === 'I have a value.'
                            ? process_new_value()
                            : request === 'I lost my value.'
                            ? process_fogot_value()
                            : error(request, 'unknown request --- adder');

    connect(a1, me);
    connect(a2, me);
    connect(sum, me);
    return me;
};

const multiplier = (m1, m2, product) => {
    const process_new_value = () => {
        if((has_value(m1) && get_value(m1) === 0) || (has_value(m2) && get_value(m2) === 0)) {
            set_value(product, 0, me);
        }else if(has_value(m1) && has_value(m2)) {
            set_value(product, get_value(m1) * get_value(m2), me);
        }else if(has_value(m1) && has_value(product)) {
            set_value(m2, get_value(product) / get_value(m1), me);
        }else if(has_value(m2) && has_value(product)) {
            set_value(m1, get_value(product) / get_value(m2), me);
        }
    };

    const process_fogot_value = () => {
        forget_value(product, me);
        forget_value(m1, me);
        forget_value(m2, me);
        process_new_value();
    };

    const me = request => request === 'I have a value.'
                            ? process_new_value()
                            : request === 'I lost my value.'
                            ? process_fogot_value()
                            : error(request, 'unknown request --- multiplier');

    connect(m1, me);
    connect(m2, me);
    connect(product, me);
    return me;
};

const probe = (name, connector) => {
    const print_probe = value => display(`Probe: ${name} = ${value}`);
    const process_new_value = () => print_probe(get_value(connector));
    const process_fogot_value = () => print_probe('?');

    const me = request => request === 'I have a value.'
                            ? process_new_value()
                            : request === 'I lost my value.'
                            ? process_fogot_value()
                            : error(request, 'unknown request --- probe');

    connect(connector, me);
    return me;
};

// 9C = 5(F - 32)
const celsius_fahrenheit_converter = (c, f) => {
    const u = make_connector();
    const v = make_connector();
    const w = make_connector();
    const x = make_connector();
    const y = make_connector();

    multiplier(c, w, u);
    multiplier(v, x, u);
    adder(v, y, f);
    constant(9, w);
    constant(5, x);
    constant(32, y);
    return 'ok';
};

const C = make_connector();
const F = make_connector();
celsius_fahrenheit_converter(C,F);

probe('Celsius temp', C);
probe('Fahrenheit temp', F);

set_value(C, 25, 'user');