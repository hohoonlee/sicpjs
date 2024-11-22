const { tail, head, is_null, pair, display } = require("sicp");

const stream_tail = stream => tail(stream)();
const stream_ref = (stream, n) => n === 0
                                ? head(stream)
                                : stream_ref(stream_tail(stream), n-1);
const stream_map = (f, stream) => is_null(stream)
                                ? null
                                : pair(f(head(stream)), () => stream_map(f, stream_tail(stream)));
const stream_for_each = (f, stream) => {
    if(is_null(stream)) return true;
    f(head(stream));
    return stream_for_each(f, stream_tail(stream));
};
const display_stream = stream => stream_for_each(display, stream);

const stream_enumerate_interval = (low, high) => low > high
                                                ? null
                                                : pair(low, () => stream_enumerate_interval(low+1, high));
                                               
const stream_filter = (pred, stream) => is_null(stream)
                                        ? null
                                        : pred(head(stream))
                                        ? pair(head(stream), () => stream_filter(pred, stream_tail(stream)))
                                        : stream_filter(pred, stream_tail(stream));

display_stream(stream_enumerate_interval(10, 15));

const result = head(stream_tail(stream_filter(x => x % 2 === 0, stream_enumerate_interval(10,15))));
console.log(`>> ${result}`);
console.log(`----------------------`);
display_stream(stream_map(x => x * x, stream_enumerate_interval(1, 5)));

const memo = f => {
    let already_run = false;
    let result;
    return () => {
        if(already_run) {
            // console.log(`run memo : ${result}`);
            return result;
        }
        result = f();
        already_run = true;
        return result;
    };
};

const stream_map_optimized = (f, stream) => is_null(stream)
                                            ? null
                                            : pair(f(head(stream)), memo(() => stream_map_optimized(f, stream_tail(stream))));

console.log(`----------------------`);
display_stream(stream_map_optimized(x => x * x, stream_enumerate_interval(1, 5)));

console.log('ex 3.50 --------------------');
const stream_map_2 = (f, stream1, stream2) => is_null(stream1) || is_null(stream2)
                                            ? null
                                            : pair(f(head(stream1), head(stream2)), () => stream_map_2(f, stream_tail(stream1), stream_tail(stream2)));

const stream_map_2_optimized = (f, stream1, stream2) => is_null(stream1) || is_null(stream2)
                                            ? null
                                            : pair(f(head(stream1), head(stream2)), memo(() => stream_map_2_optimized(f, stream_tail(stream1), stream_tail(stream2))));
                                        
display_stream(stream_map_2(
    (a, b) => a + b,
    stream_enumerate_interval(0, 5),
    stream_enumerate_interval(5, 10)
));

display_stream(stream_map_2_optimized(
    (a, b) => a + b,
    stream_enumerate_interval(0, 5),
    stream_enumerate_interval(5, 10)
));

console.log('ex 3.51 -----------------------');
const ex1 = stream_map(display, stream_enumerate_interval(0, 10));
console.log('>>', stream_ref(ex1, 5));
console.log('>>', stream_ref(ex1, 7));

const ex2 = stream_map_optimized(display, stream_enumerate_interval(0, 10));
console.log('>>', stream_ref(ex2, 5));
console.log('>>', stream_ref(ex2, 7));
console.log('>>', stream_ref(ex2, 3));

console.log('ex 3.52 --------------------');
let sum = 0;
const accum = x => {
    sum = x + sum;
    return sum;
};

const seq = stream_map(accum, stream_enumerate_interval(1, 20));
const y = stream_filter(x => x % 2 == 0, seq);
const z = stream_filter(x => x % 5 == 0, seq);
console.log(`sum : ${sum}`);
console.log('>', stream_ref(y, 7));
console.log(`sum : ${sum}`);
display_stream(z);
console.log(`sum : ${sum}`);

console.log('무한 스트림:::::::::::::::::::::::::::::::::::');
const integers_starting_from = n => pair(n, () => integers_starting_from(n+1));

const integers = integers_starting_from(1);

const is_divisible = (x, y) => x % y === 0;
const no_sevens = stream_filter(x => !is_divisible(x, 7), integers);
console.log(stream_ref(no_sevens, 100));

const fibgen = (a, b) => pair(a, () => fibgen(b, a + b));
const fibs = fibgen(0, 1);
console.log(stream_ref(fibs, 1));
console.log(stream_ref(fibs, 2));
console.log(stream_ref(fibs, 3));
console.log(stream_ref(fibs, 4));
console.log(stream_ref(fibs, 5));

const sieve = stream => pair(
    head(stream),
    () => sieve(stream_filter(x => !is_divisible(x, head(stream)), stream_tail(stream)))
);
const primes = sieve(integers_starting_from(2));
console.log('prime 50 => ', stream_ref(primes, 50));

const ones = pair(1, () => ones);
console.log('ones 10 => ', stream_ref(ones, 10));

const add_streams = (s1, s2) => stream_map_2((x1, x2) => x1 + x2, s1, s2);
const ints = pair(0, () => add_streams(ones, ints));
console.log('ints 0 => ', stream_ref(ints, 0));
console.log('ints 1 => ', stream_ref(ints, 1));
console.log('ints 10 => ', stream_ref(ints, 10));

const scale_stream = (stream, factor) => stream_map(x => x * factor, stream);
const double = pair(1, () => scale_stream(double, 2));
console.log(`double : 1 => ${stream_ref(double, 1)}`);
console.log(`double : 2 => ${stream_ref(double, 2)}`);
console.log(`double : 10 => ${stream_ref(double, 10)}`);

console.log('ex 3.54 --------------------------');
const mul_streams = (s1, s2) => is_null(s1) || is_null(s2)
                                ? null
                                : pair( head(s1) * head(s2), () => mul_streams(stream_tail(s1), stream_tail(s2)));
const factorials = pair(1, () => mul_streams(integers_starting_from(1), factorials));
console.log(`factorials : 1 => ${stream_ref(factorials, 1)}`);
console.log(`factorials : 2 => ${stream_ref(factorials, 2)}`);
console.log(`factorials : 3 => ${stream_ref(factorials, 3)}`);
console.log(`factorials : 4 => ${stream_ref(factorials, 4)}`);
console.log(`factorials : 5 => ${stream_ref(factorials, 5)}`); 
console.log(`factorials : 10 => ${stream_ref(factorials, 10)}`);

console.log('ex 3.55 ------------------------------');
const partial_sums = stream => pair(head(stream), () => add_streams(partial_sum_integer, stream_tail(stream)));
const partial_sum_integer = partial_sums(integers_starting_from(1));
[0, 1, 4].forEach(i => {
    console.log(`partila_sums : ${i} => ${stream_ref(partial_sum_integer, i)}`);
});

console.log('ex 3.56 --------------------');
const merge = (s1, s2) => {
    if(is_null(s1)) return s2;
    if(is_null(s2)) return s1;

    const s1head = head(s1);
    const s2head = head(s2);
    return s1head < s2head
            ? pair(s1head, () => merge(stream_tail(s1), s2))
            : s1head > s2head
            ? pair(s2head, () => merge(s1, stream_tail(s2)))
            : pair(s1head, () => merge(stream_tail(s1), stream_tail(s2)));
};
const S = pair(
    1, 
    () => merge(
        scale_stream(integers_starting_from(1), 2), 
        merge(
            scale_stream(integers_starting_from(1), 3), 
            scale_stream(integers_starting_from(1), 5)
        )
    )
);
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(i => {
    console.log(`hamming : ${i} => ${stream_ref(S, i)}`);
});