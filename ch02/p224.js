const {is_string, is_number, list, is_pair, head, tail, display_list, error, accumulate} = require('sicp');

const number_equal = (exp, num) => is_number(exp) && exp === num;
const is_variable = is_string;
const is_same_variable = (v1, v2) => is_variable(v1) && is_variable(v2) && v1 === v2;
// const make_sum = (a1, a2) => list('+', a1, a2);
const make_sum = (a1, a2) => number_equal(a1, 0)
                            ? a2
                            : number_equal(a2, 0)
                            ? a1
                            : is_number(a1) && is_number(a2)
                            ? a1 + b1
                            : list('+', a1, a2);
// const make_product = (m1, m2) => list('*', m1, m2);
const make_product = (m1, m2) => number_equal(m1, 0) || number_equal(m2, 0)
                                ? 0
                                : number_equal(m1, 1)
                                ? m2
                                : number_equal(m2, 1)
                                ? m1
                                : is_number(m1) && is_number(m2)
                                ? m1 * m2
                                : list('*', m1, m2);
const make_exp = (base, exponent) => number_equal(base, 0)
                                    ?0
                                    :number_equal(exponent, 0)
                                    ?1
                                    :number_equal(exponent, 1)
                                    ?base
                                    :is_number(base) && is_number(exponent)
                                    ? base ** exponent
                                    : list('**', base, exponent);
const is_sum = exp => is_pair(exp) && head(exp) === '+';
const addend = exp => head(tail(exp));
const augend = exp => accumulate(make_sum, 0, tail(tail(exp)));
const is_product = exp => is_pair(exp) && head(exp) === '*';
const multiplier = exp => head(tail(exp));
// const multiplicand = exp => make_product(head(tail(tail(exp))), tail(tail(tail(exp))) || 1);
const multiplicand = exp => accumulate(make_product, 1, tail(tail(exp)));
const is_exp = exp => is_pair(exp) && head(exp) === '**';
const base = exp => head(tail(exp));
const exponent = exp => head(tail(tail(exp)));

const deriv = (exp, variable) => is_number(exp)
                                ? 0
                                : is_variable(exp)
                                ? is_same_variable(exp, variable) ? 1 : 0
                                : is_sum(exp)
                                ? make_sum( deriv(addend(exp), variable),
                                            deriv(augend(exp), variable))
                                : is_product(exp)
                                ? make_sum(
                                    make_product(multiplier(exp), deriv(multiplicand(exp), variable)),
                                    make_product(deriv(multiplier(exp), variable), multiplicand(exp))
                                )
                                : is_exp(exp)
                                ? make_product(
                                    make_product(exponent(exp), make_exp(base(exp), exponent(exp) -1)),
                                    deriv(base(exp), variable)
                                )
                                : error(exp, 'unknown expression type -- deriv');

display_list(
    deriv(list('+', 'x', 3), 'x')
);

display_list(
    deriv(list('*', 'x', 'y'), 'x')
);
console.log('---ex 2.56----');
display_list(
    deriv(list('**', 'x', 2), 'x')
);
console.log('---ex 2.57----');
display_list(
    deriv(list('*', 'x', 'y', list('+', 'x', 3)), 'x') // x * y * (x + 3) 
);