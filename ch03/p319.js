const { math_sqrt, gcd } = require("sicp");

const estimae_pi = trials => math_sqrt(6 / monte_carlo(trials, dirichlet_test));

const dirichlet_test = gcd(rnad(), rand()) === 1;

const monte_calo = (trials, experiment) => {
    const iter = (trials_remaining, trials_passed) => {
        return trials_remaining === 0
                ? trials_passed / trials
                : experiment()
                ? iter(trials_remaining -1, trials_passed +1)
                : iter(trials_remaining -1, trials_passed );
    }

    return iter(trials, 0);
};