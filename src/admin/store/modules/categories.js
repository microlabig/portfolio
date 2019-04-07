export default {
    namespaced: true, 
    // сделано для того, чтобы в методах-помощниках (mapActions, ...) указывать первым параметром 
    // откуда берется метод, напр., mapActions('categories',['addNewSkillGroup'])
    // Если namespaced = true, то достаточно указать только название метода mapActions(['addNewSkillGroup'])

    state: {
        categories: []
    },

    actions: {
        // метод добавления тайтла группы
        async addNewSkillGroup(store, groupTitle) { 
            try {
                const response = await this.$axios.post('/categories', {
                    title: groupTitle
                });
                return response;
            } catch (error) {
                throw new Error(error.response.data.error || error.response.data.message);
            }     
        }
    }

}