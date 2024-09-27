/***
 * Excerpted from "The Pragmatic Programmer, 20th Anniversary Edition",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/tpp20 for more book information.
***/
const { start, dispatch, stop, spawn, spawnStateless } = require('nact');

const router = (module, state, msg, ctx) => {
    const action = module[msg.type];
    return (typeof action === 'function')
            ? action(msg, ctx, state) || state
            : console.log(`${context.name} 모르는 메세지 무시:`, msg), state;

};

const start_actor = (actors, name, module, initial_state={}) => spawn(
    actors,
    (state, msg, context) => router(module, state, msg, context),
    name,
    { initialState: initial_state }
);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

////////////////////////////////////////////////////////////////////////////////////////
const pieCaseActor = {
    '한 조각 꺼내기': (msg, ctx, state) => {
        if(state.slices.length) {
            const slice = `${state.slices.shift()} 파이 조각`;
            dispatch(msg.customer, {type: '테이블에 놓다', food: slice});
            dispatch(msg.waiter, {type: '주문서에 추가', food: slice, customer: msg.customer});
        }else {
            dispatch(msg.waiter, {type: 'error', msg:'남은 파이 없음', customer: msg.customer});
        }
        return state;
    }
};

const waiterActor = {
    "주문": (msg, ctx, state) => {
        if (msg.wants == "pie") {
            dispatch(state.pieCase,
                    { type: "한 조각 꺼내기", customer: msg.customer, waiter: ctx.self })
        }else {
            console.dir(`Don't know how to order ${msg.wants}`);
        }
    },
    "주문서에 추가": (msg, ctx) => console.log(`Waiter 는 ${msg.food} 을 ${msg.customer.name}의 주문서에 추가한다`),
    "error": (msg, ctx) => {
        dispatch(msg.customer, { type: '남은 파이가 없다', msg: msg.msg });
        console.log(`\n${msg.customer.name}에게 사과한다: ${msg.msg}`)
    }
};

const customerActor = {
    '파이가 먹고 싶다': (msg, ctx, state) => dispatch(state.waiter,
                                                { type: "주문", customer: ctx.self, wants: 'pie' }
                                        ),
    '테이블에 놓다': (msg, ctx, _state) => console.log(`${ctx.self.name}은 테이블 위의 "${msg.food}"을 본다`),
    '남은 파이가 없다': (_msg, ctx, _state) => console.log(`${ctx.self.name} ㅠㅠ`)
}

/////////////////////////////////////////////////////////////////////////////////

const actorSystem = start();

const pieCase = start_actor(
    actorSystem,
    'pie-case',
    pieCaseActor,
    { slices: ["apple", "peach", "cherry"] });

const waiter = start_actor(
    actorSystem,
    'waiter',
    waiterActor,
    { pieCase: pieCase });

const c1 = start_actor(actorSystem,   'customer1',
                     customerActor, { waiter: waiter });
const c2 = start_actor(actorSystem,   'customer2',
                     customerActor, { waiter: waiter });

dispatch(c1, { type: '파이가 먹고 싶다'});
dispatch(c2, { type: '파이가 먹고 싶다'});
dispatch(c1, { type: '파이가 먹고 싶다'});
dispatch(c2, { type: '파이가 먹고 싶다'});
dispatch(c1, { type: '파이가 먹고 싶다'});
sleep(500)
    .then(() => {
        stop(actorSystem);
    });