const state = {
    user: null,
    token: null,
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
    SET_TOKEN(state, token) {
        state.token = token;
    },
    LOGOUT(state) {
        state.user = null;
        state.token = null;
    },
};

const actions = {
    login({ commit }, user) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (user.email === 'test@example.com' && user.password === 'password') {
                    const token = 'fake-jwt-token';
                    commit('SET_USER', user);
                    commit('SET_TOKEN', token);
                    localStorage.setItem('token', token);
                    resolve();
                } else {
                    reject(new Error('Geçersiz e-posta veya şifre'));
                }
            }, 1000);
        });
    },
    register({ commit }, user) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const token = 'fake-jwt-token';
                commit('SET_USER', user);
                commit('SET_TOKEN', token);
                localStorage.setItem('token', token);
                resolve();
            }, 1000);
        });
    },
    logout({ commit }) {
        commit('LOGOUT');
        localStorage.removeItem('token');
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};