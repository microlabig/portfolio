// настройки пользователя
export default {
    namespaced: true,
    state: {
        user: {}
    },
    mutations: {
        SET_USER: (state, user) => {
            state.user = user
        },
        CLEAR_USER: (state) => {
            state.user = {}
        }
    },
    actions: {
        logout({commit}) {
            localStorage.removeItem('token');
            commit('CLEAR_USER');
        }
    },
    getters: { 
        userIsLogged: state => { // проверка объекта user
            const userObj = state.user; // возьмем объект user из store
            const userObjIsEmpty = 
                // условие:
                // 1 - есть ли поля в объекте user
                // 2 - является ли вообще типом Object
                Object.keys(userObj).length === 0 && userObj.constructor === Object;
            return userObjIsEmpty === false; // если "залогинен пользователь"
        }
    }
}