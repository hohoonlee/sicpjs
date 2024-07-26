const {pair, head: x_point, tail: y_point} = require('../lib/common');

const make_point = (x, y) => pair(x, y);

const make_segment = (p1, p2) => pair(p1, p2);
const start_segment = x_point;
const end_segment = y_point;
const midpoint_segment = segment => {
	const p1 = start_segment(segment);
	const p2 = end_segment(segment);

	return make_point((x_point(p2) + x_point(p1))/2, (y_point(p2) + y_point(p1)) /2);
};

const stringify = x => String(x);
const display = console.log;
const print_point =  p => display(`(${stringify(x_point(p))}, ${stringify(y_point(p))})`);

const p1 = make_point(3, 4);
const p2 = make_point(30, 4);
print_point(p1);
print_point(p2);

const segment = make_segment(p1, p2);
print_point(midpoint_segment(segment));

// ex2.3
const make_rectangle = (p1, p2) => pair(p1, p2);
const lefttop_rectangel = x_point;
const rightbottom_rectangel = y_point;
const length_rectangle = rectangel => {
	const lefttop = lefttop_rectangel(rectangel);
	const rightbottom = rightbottom_rectangel(rectangel);
	return Math.abs(x_point(lefttop) - x_point(rightbottom)) * 2
	+ Math.abs(y_point(lefttop) - y_point(rightbottom)) * 2
}