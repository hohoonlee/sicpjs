const make_account = balance => {
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

    return dispatch;
}

const acc = make_account(100);

console.log(acc('withdraw')(50));
console.log(acc('withdraw')(60));
console.log(acc('deposit')(40));
console.log(acc('withdraw')(60));