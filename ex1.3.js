//연습문제3

function square_mid_max(a, b, c) {
    return  a < b && a < c
            ? b * b + c * c
            : b < a && b < c
            ? a * a + c * c
            : a * a + b * b;
} 

square_mid_max(1, 2, 3); // 13