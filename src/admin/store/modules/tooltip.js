export default {
    namespaced: true,

    state: {
        text: "",
        show: false,
        col: "red"
    },
    mutations: {
        SET_TEXT: (state, text) => {
            state.text = text
        },
        SET_SHOW: (state, show) => {
            state.show = show
        },
        SET_COLOR: (state, color) => {
            state.col = color
        }
    },
    actions: {
        showTooltip({commit}, text) {
            commit('SET_TEXT',text);
            commit('SET_SHOW',true);             
        },
        setColTooltip({commit}, color) {
            commit('SET_COLOR',color);
        },
        closeTooltip({commit}) {
            commit('SET_TEXT','');
            commit('SET_SHOW',false);
        }
    }
};