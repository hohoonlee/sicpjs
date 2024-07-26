const countChange = amount => cc(amount, 5);

const cc = (amount, kindOfCoins) => amount === 0
									? 1
									: amount < 0 || kindOfCoins === 0
									? 0
									: cc(amount, kindOfCoins -1) + cc(amount - firstDenomination(kindOfCoins), kindOfCoins);

const firstDenomination = kindOfCoins => kindOfCoins === 1 ? 1
										:kindOfCoins === 2 ? 5
										:kindOfCoins === 3 ? 10
										:kindOfCoins === 4 ? 25
										:kindOfCoins === 5 ? 50
										: 0;

console.log(countChange(100));