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

    const dispatch = m => m === 'withdraw'
                        ? withdraw
                        : m === 'deposit'
                        ? deposit
                        : error(m, 'unknown request -- make_acount');

    return (input_password, m) => password !== input_password
                                ? () => 'Incorrect password'
                                : dispatch(m);
}

const acc = make_account(100, '비공개 패스워드');

console.log(acc('비공개 패스워드', 'withdraw')(40));
console.log(acc('다른 패스워드', 'deposit')(40));