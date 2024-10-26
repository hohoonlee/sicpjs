const make_withdraw_balance_100 = () => {
    let balance = 100;

    return amount => {
        if(balance >= amount) {
            balance = balance - amount;
            return balance;
        }else {
            return 'Insufficient funds';
        }
    };
}

const new_withdraw = make_withdraw_balance_100();

console.log(new_withdraw(25));
console.log(new_withdraw(25));
console.log(new_withdraw(60));
console.log(new_withdraw(15));