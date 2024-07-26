const {list, head, tail} = require('sicp');

const plus_curried = x => y => x + y;

console.log(plus_curried(3)(4));

const brooks = (f, items) => (!tail(items))
							? f(head(items))
							: brooks(f(head(items)), tail(items));

console.log(brooks(plus_curried, list(3, 4)));

const brooks_curried = items => brooks(head(items), tail(items));

console.log(brooks_curried(list(plus_curried, 3, 4)));

console.log('------------------');
console.log(
	brooks_curried(list(brooks_curried, list(plus_curried, 3, 4)))
);
console.log(
	brooks_curried(list(brooks_curried,
						list(brooks_curried,
							list(plus_curried, 3, 4))))
);