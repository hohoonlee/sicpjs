const pascals = (row, col) => row <= 0
							? 1
							: col <= 0 || col === row
							? 1
							: pascals(row-1, col -1) + pascals(row-1,col)

console.log(pascals(0,0));
console.log(pascals(1,0), pascals(1,1));
console.log(pascals(2,0), pascals(2,1), pascals(2,2));
console.log(pascals(3,0), pascals(3,1), pascals(3,2), pascals(3,3));
console.log(pascals(4,0), pascals(4,1), pascals(4,2), pascals(4,3), pascals(4,4));