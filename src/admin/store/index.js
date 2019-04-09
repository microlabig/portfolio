import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); // укажим Vue использовать методы Vuex

import categories from './modules/categories';
import skills from './modules/skills';
import user from './modules/user';

export default new Vuex.Store({
    modules: {
        categories, skills, user
    }
});