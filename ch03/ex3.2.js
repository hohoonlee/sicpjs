const { math_sqrt } = require("sicp");

const make_monitored = f => {
    let call_count = 0;
    
    const how_many_calls = () => call_count;
    const reset_count = () => call_count = 0;

    return m => m === 'how many calls'
                ? how_many_calls()
                : m === 'reset count'
                ? reset_count()
                : (call_count += 1, f(m));
};

const s = make_monitored(math_sqrt);
console.log(s(100));
console.log(s('how many calls'));

s('reset count');
console.log(s(100));
console.log(s(4));
console.log(s('how many calls'));