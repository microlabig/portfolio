// настройки пользователя
export default {
    namespaced: true,
    state: {
        user: {}
    },
    mutations: {
        SET_USER: (state, user) => {
            state.user = user
        }
    },
    getters: { 
        userIsLogged: state => { // проверка объекта user
            const userObj = state.user; // возьмем объект user из store
            const userObjIsEmpty = 
                // условие:
                // 1 - есть ли поля в объекте user
                // 2 - является ли вообще типом Object
                Object.keys(userObj) === 0 && userObj.constructor === Object;
            return userObjIsEmpty === false; // если "залогинен пользователь"
        }
    }
}