export default {
    namespaced: true, 
    // сделано для того, чтобы в методах-помощниках (mapActions, ...) указывать первым параметром 
    // откуда берется метод, напр., mapActions('categories',['addNewSkillGroup'])
    // Если namespaced = true, то достаточно указать только название метода mapActions(['addNewSkillGroup'])

    state: {
        categories: []
    },
    mutations: { // для изменеия в state
        SET_CATEGORIES: (state, categories) => {
            state.categories = categories;
        },
        REMOVE_CATEGORY: (state, categoryId) => {
            state.categories = state.categories.filter(category => category.id !== categoryId)
        },
        EDIT_NAME_CATEGORY: (state, editedCategory) => {
            state.categories = state.categories.map(category => category.id !== editedCategory.id ? category : editedCategory)
        }
    },
    actions: {
        // метод добавления тайтла группы
        async addNewSkillGroup({commit}, groupTitle) { 
            // {commit} - метод из store (деструктуризация)
            try {                
                const response = await this.$axios.post('/categories', {
                    title: groupTitle
                });                
                return response;
            } catch (error) {
                throw new Error(error.response.data.error || error.response.data.message);
            }     
        },

        // метод получения категорий
        async fetchCategories({commit}) { 
            // {commit} - метод из store (деструктуризация)
            try {
                const response = await this.$axios.get('/categories');
                commit('SET_CATEGORIES', response.data.reverse()); // вызовим мутацию и получим ответ в response.data
                return response;
            } catch (error) {
                throw new Error(error.response.data.error || error.response.data.message);
            }     
        },

        // метод удаления категории с сервера и из store
        async removeCategory({commit}, categoryId) {
            try {
              const response = await this.$axios.delete(`/categories/${categoryId}`);
              commit('REMOVE_CATEGORY', categoryId); // categoryId (а не response.data) т.к. нам не нужен обрабатывать ответ от сервера
              return response;
            } catch (error) {
                throw new Error(error.response.data.error || error.response.data.message);
            }
        },

        // метод изменения имени категории на сервее и в store
        async editNameCategory({commit}, category) {
            try {
              const response = await this.$axios.post(`/categories/${category.id}`, {
                title: category.category
              });
              
              commit('EDIT_NAME_CATEGORY', category); // categoryId (а не response.data) т.к. нам не нужен обрабатывать ответ от сервера
              return response;
            } catch (error) {
                throw new Error(error.response.data.error || error.response.data.message);
            }
        }
    }

}