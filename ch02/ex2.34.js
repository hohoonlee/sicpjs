const { accumulate, display_list, list, pair, head, tail, length } = require("sicp");

const horner_eval = (x, coefficient_sequence) => accumulate((this_coeff, higher_terms) => {
                                                    return higher_terms * x + this_coeff;
                                                },
                                                0,
                                                coefficient_sequence);
// 1 + 6 + 40 + 32
console.log(horner_eval(2, list(1, 3, 0, 5, 0 ,1)));