let balance = 100;

const withdraw = amount => {
    if(balance >= amount) {
        balance = balance - amount;
        return balance;
    }else {
        return 'Insufficient funds';
    }
};

console.log(withdraw(25));
console.log(withdraw(25));
console.log(withdraw(60));
console.log(withdraw(15));