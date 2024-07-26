const {list, head, tail, display} = require('sicp');

// const us_coins = list(50, 25, 10, 5, 1);
const us_coins = list(1, 5, 10, 25, 50);
const uk_coins = list(100, 50, 20, 10, 5, 2, 1);

const no_more = items => !items;
const except_first_denomination = tail;
const first_denomination = head;

const cc = (amount, coin_values) => amount === 0
									? 1
									: amount < 0 || no_more(coin_values)
									? 0
									: 	cc(amount, except_first_denomination(coin_values)) +
										cc(amount - first_denomination(coin_values), coin_values);


display(cc(100, us_coins));