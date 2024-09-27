const { head, tail, math_sqrt, square, math_atan2, pair, math_cos, math_sin} = require("sicp");

const real_part = z => head(z);
const imag_part = z => tail(z);
const magnitude = z => math_sqrt(square(real_part(z)) + square(imag_part(z)));
const angle = z => math_atan2(imag_part(z), real_part(z));
const make_from_real_imag = (real, imag) => pair(real, imag);
const make_from_mag_ang = (mag, ang) => pair(mag * math_cos(ang), mag * math_sin(ang));
///////////////////////////////////////////////////////////////////////////////////////

const real_part = z => magnitude(z) * math_cos(angle(z));
const imag_part = z => magnitude(z) * math_sin(angle(z));
const magnitude = z => head(z);
const angle = z => tail(z);
const make_from_real_imag = (x, y) => pair(math_sqrt(square(x) + square(y)), math_atan2(y, x));
const make_from_mag_ang = (r, a) => pair(r, a);
///////////////////////////////////////////////////////////////////////////////////////

const add_complex = (z1, z2) => make_from_real_imag(real_part(z1) + real_part(z2), imag_part(z1) + imag_part(z2));

const sub_complex = (z1, z2) => make_from_real_imag(real_part(z1) - real_part(z2), imag_part(z1) - imag_part(z2));

const mul_complex = (z1, z2) => make_from_mag_ang(magnitude(z1) * magnitude(z2), angle(z1) + angle(z2));

const div_complex = (z1, z2) => make_from_mag_ang(magnitude(z1) / magnitude(z2), angle(z1) - angle(z2));