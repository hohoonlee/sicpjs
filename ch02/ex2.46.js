const {pair, head, tail, list} = require('sicp');

// ex.2.46
const make_vect = pair;
const xcor_vect = head; 
const ycor_vect = tail;

const add_vect = (v1, v2) => make_vect(xcor_vect(v1) + xcor_vect(v2), ycor_vect(v1) + ycor_vect(v2));
const sub_vect = (v1, v2) => make_vect(xcor_vect(v1) - xcor_vect(v2), ycor_vect(v1) - ycor_vect(v2));
const scale_vect = (s, v) => make_vect(s * xcor_vect(v), s * ycor_vect(v));

const v1 = make_vect(1, 2);
const v2 = make_vect(3, 4);

console.log(add_vect(v1, v2));
console.log(sub_vect(v2, v1));
console.log(scale_vect(2, v2));

// ex.2.47
const make_frame = (origin, edge1, edge2) => list(origin, edge1, edge2);
const origin_frame = frame => head(frame);
const edge1_frame = frame => head(tail(frame));
const edge2_frame = frame => head(tail(tail(frame)));

const frame1 = make_frame(make_vect(0,0), make_vect(0,1), make_vect(1,0));
console.log(origin_frame(frame1));
console.log(edge1_frame(frame1));
console.log(edge2_frame(frame1));

const make_frame_pair = (origin, edge1, edge2) => pair(origin, pair(edge1, edge2));
const origin_frame_pair = frame => head(frame);
const edge1_frame_pair = frame => head(tail(frame));
const edge2_frame_pair = frame => tail(tail(frame));

const frame2 = make_frame_pair(make_vect(0,0), make_vect(0,1), make_vect(1,0));
console.log(origin_frame_pair(frame2));
console.log(edge1_frame_pair(frame2));
console.log(edge2_frame_pair(frame2));

//p211
const frame_coord_map = frame => v => add_vect(
                                            origin_frame(frame),
                                            add_vect(
                                                scale_vect(xcor_vect(v), edge1_frame(frame)),
                                                scale_vect(ycor_vect(v), edge2_frame(frame))
                                            )
                                        );

//p213
const segments_to_painter = (segment_list) => frame => for_each(
    segment => draw_line(
        frame_coord_map(frame)(start_segment(segment)),
        frame_coord_map(frame)(end_segment(segment))
    ),
    segment_list
);

//ex 2.46
const make_segment = (start, end) => pair(start, end);
const start_segment = segment => head(segment);
const end_segment = segment => tail(segment);

//ex 2.49
//a
const edige_painter = segments_to_painter(
    list(
        make_segment(make_vect(0,0), make_vect(0, 1)),
        make_segment(make_vect(0,1), make_vect(1, 1)),
        make_segment(make_vect(1,1), make_vect(1, 0)),
        make_segment(make_vect(1,0), make_vect(0, 0))
    )
);

//b
const x_painter = segments_to_painter(
    list(
        make_segment(make_vect(0,0), make_vect(1,1)),
        make_segment(make_vect(0,1), make_vect(1,0))
    )
);

//c
const diamond_painter = segments_to_painter(
    list(
        make_segment(make_vect(0,0.5), make_vect(0.5, 1)),
        make_segment(make_vect(0.5,1), make_vect(1, 0.5)),
        make_segment(make_vect(1,0.5), make_vect(0.5, 0)),
        make_segment(make_vect(0.5,0), make_vect(0, 0.5))
    )
);

//p215
const transform_painter = (painter, origin, corner1, corner2) => frame => {
    const m = frame_coord_map(frame);
    const new_orign = m(origin);
    return painter(
        make_frame(
            new_orign,
            sub_vect(m(corner1), new_orign),
            sub_vect(m(corner2), new_orign)
        )
    );
};

const flip_vert = painter => transform_painter(
    painter,
    make_vert(0,1),
    make_vert(1,1),
    make_vert(0,0)
);