const up_split = (painter, n) => {
    if(n === 0) return painter;
    const smaller = up_split(painter, n-1);
    return below(beside(smaller, smaller), painter);
};

//ex2.45

const split = (main, sub) => (painter, n) => {
    if(n === 0) return painter;
    const smaller = split(main, sub)(painter, n-1);
    return main(sub(smaller, smaller), painter);
};