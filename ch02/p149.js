const {display} = require('../lib/common');
const {make_rat, numer, denom, add_rat, mul_rat} = require('./rat');

const print_rat = x => display(`${numer(x)} / ${denom(x)}`);

const one_half = make_rat(1, 2);
print_rat(one_half);

const one_third = make_rat(1, 3);
print_rat(add_rat(one_half, one_third));
print_rat(mul_rat(one_half, one_third));
print_rat(add_rat(one_third, one_third));

console.log('EX 2.1');
print_rat(make_rat(-1, -2));
print_rat(make_rat(1, -2));
print_rat(make_rat(-1, 2));