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

    const call_the_cops = () => 'CALL THE COPS';

    const dispatch = m => m === 'withdraw'
                        ? withdraw
                        : m === 'deposit'
                        ? deposit
                        : error(m, 'unknown request -- make_acount');

    let incorrect_count = 0;
    return (input_password, m) => password !== input_password
                                ? () => {
                                    incorrect_count += 1;
                                    return (incorrect_count >= 8)
                                            ? call_the_cops()
                                            :'Incorrect password'
                                }
                                : (incorrect_count = 0, dispatch(m));
}

const acc = make_account(100, '비공개 패스워드');

console.log(acc('비공개 패스워드', 'withdraw')(40));
console.log(acc('다른 패스워드', 'deposit')(40));
console.log(acc('다른 패스워드', 'deposit')(40));
console.log(acc('다른 패스워드', 'deposit')(40));
console.log(acc('다른 패스워드', 'deposit')(40));
console.log(acc('다른 패스워드', 'deposit')(40));
console.log(acc('다른 패스워드', 'deposit')(40));
console.log(acc('다른 패스워드', 'deposit')(40));
console.log(acc('다른 패스워드', 'deposit')(40));