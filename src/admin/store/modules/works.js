export default {
    namespaced: true,
    state: {
        works: []
    },
    mutations: {
        SET_WORK: (state, work) => {
            state.works.push(work);
        },
        SET_ALL_WORKS: (state, works) => {
            state.works = works;
        },
        REMOVE_WORK: (state, workID) => {
            state.works = state.works.filter(work => work.id !== workID)
        },
        EDIT_WORK: (state, editedWork) => {
            state.works = state.works.map(work => work.id === editedWork.id ? editedWork : work);
        }
    },
    actions: {
        // метод добавления нового ревью
        async addWork({commit}, work) { 
            try {
                // создадим объект FormData
                const formData = new FormData();
                // упакуем work
                formData.append('title', work.title);
                formData.append('techs', work.techs);
                formData.append('link', work.link);
                formData.append('photo', work.photo);
                formData.append('description', work.description);

                const response = await this.$axios.post('/works', formData);
                commit('SET_WORK', response.data); 
                               
                return response;
            } catch (error) {
                throw new Error(error.response.data.error || error.response.data.message);
            }     
        },

        // метод получения всех отзывов
        async fetchWorks({commit}) { 
            // {commit} - метод из store (деструктуризация)
            try {
                const response = await this.$axios.get('/works/120');
                commit('SET_ALL_WORKS', response.data.reverse()); // вызовим мутацию и получим ответ в response.data
                return response;
            } catch (error) {
                throw new Error(error.response.data.error || error.response.data.message);
            }     
        },

        // метод удаления отзыва
        async removeWork({commit}, worksId) {
            try {
              const response = await this.$axios.delete(`/works/${worksId}`);
              commit('REMOVE_WORK', worksId); // categoryId (а не response.data) т.к. нам не нужен обрабатывать ответ от сервера
              return response;
            } catch (error) {
                throw new Error(error.response.data.error || error.response.data.message);
            }
        },

        // метод изменения отзыва
        async editWork({commit}, editedWork) {
            try {
                // создадим объект FormData
                const formData = new FormData();
                // упакуем work
                formData.append('title', editedWork.title);
                formData.append('techs', editedWork.techs);
                formData.append('link', editedWork.link);
                formData.append('photo', editedWork.photo);
                formData.append('description', editedWork.description);

                const response = await this.$axios.post(`/works/${editedWork.id}`, formData);
                commit('EDIT_WORK', response.data.work); 

                return response;
            } catch (error) {
                throw new Error(error.response.data.error || error.response.data.message);
            }
        }
    }, 
    getters: {
        // получить список всех отзывов
        getWorks: state => {
            return state.works;
        }
    }
}