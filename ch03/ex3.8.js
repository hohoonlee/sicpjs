let firstRun = -1;
const f = i => {
    if(firstRun === 0) return 0;
    firstRun = i;
    return i;
};

console.log(f(0) + f(1));