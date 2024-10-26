const make_accmulator = acc => i => {
    acc += i;
    return acc;
};

const a = make_accmulator(5);
console.log(a(10));
console.log(a(10));