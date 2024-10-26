const make_account = (balance, password) => {
    const withdraw = amount => {
        if(balance >= amount) {
            balance = balance - amount;
            return balance;
        }else {
            return 'Insufficient funds';
        }
    };

    const deposit = amount => {
        balance = balance + amount;
        return balance;
    }

    const valid = pw => password === pw;

    const dispatch = m => m === 'withdraw'
                        ? withdraw
                        : m === 'deposit'
                        ? deposit
                        : error(m, 'unknown request -- make_acount');

    return (input_password, m) => !valid(input_password)
                                ? () => 'Incorrect password'
                                : dispatch(m);
};

const make_joint = (acc, acc_password, new_password) => {
    return acc(acc_password, 'deposit')(0) === 'Incorrect password'
            ? 'Incorrect Password'
            : (pw, m) => pw === new_password
                        ? acc(acc_password, m)
                        : () => 'incorrect password';
};

const peter_acc = make_account(100, 'open sesame');
const paul_acc = make_joint(peter_acc, 'open sesame', 'rosebud');

console.log(peter_acc('open sesame', 'withdraw')(40));
console.log(paul_acc('rosebud', 'deposit')(40));

console.log(paul_acc('rosebud', 'withdraw')(40));
console.log(peter_acc('open sesame', 'deposit')(40));