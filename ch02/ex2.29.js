const {list, head, tail, pair, display_list, is_null, is_list, append, display} = require('sicp');

const make_mobile = (left, right) => list(left, right);

const make_branch = (length, structure) => list(length, structure);


//a.
const left_branch = mobile => head(mobile);

const right_branch = mobile => head(tail(mobile));

const branch_length = branch => head(branch);

const branch_structure = branch => head(tail(branch));

//b.
const is_structure = mobile => is_list(mobile);

const total_weight = mobile => {
    const left = left_branch(mobile);
    const right = right_branch(mobile);

    const left_structure = branch_structure(left) || 0;
    const right_structure = branch_structure(right) || 0;

    return (is_structure(left_structure)
            ?total_weight(left_structure)
            :left_structure)
           +
           (is_structure(right_structure)
            ?total_weight(right_structure)
            :right_structure);
};

//c.

const total_torque = branch => {
    const length = branch_length(branch);
    const structure = branch_structure(branch);

    return is_structure(structure)
            ?  '' //토크의 정으로 이해 못하겠음.
            : length * structure;
};

const is_balanced = mobile => {
    const left = left_branch(mobile);
    const right = right_branch(mobile);

    return total_torque(left) === total_torque(right);
};

/// test ////////////////////////////////////////////////////
const m1 = make_mobile(
    make_branch(4, 5),
    make_branch(5,
        make_mobile(
            make_branch(3, 7),
            make_branch(9, 8)
        )
    )
);

display_list(m1);
console.log(total_weight(m1));
// console.log(is_balanced(m1));