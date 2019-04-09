export default {
    namespaced: true, // для импорта по модулям store
    state: {
        skills: []
    },
    mutations: {
        //добавление скилов в store
        SET_SKILLS: (state, skills) => {
            state.skills = skills
        },
        ADD_SKILL: (state, newSkill) => {
            state.skills.push(newSkill)
        },        
        REMOVE_SKILL: (state, deletedSkillId) => {
            state.skills = state.skills.filter(skill => skill.id !== deletedSkillId)
        }
    },
    actions: {
        // метод добавления скилов на сервер и в store
        async addSkill({commit}, skill) {
            try {
              const response = await this.$axios.post('/skills', skill);
              commit('ADD_SKILL', response.data); // выполним мутацию добавления скила и в response.data получим новый скилл
              return response;
            } catch (error) {
                throw new Error(error.response.data.error || error.response.data.message);
            }
        },
        // метод запроса скилов с сервера и передача их в store
        async fetchSkills({commit}, skill) {
            try {
              const response = await this.$axios.get('/skills/120', skill); // 120 - мой id  на сервере
              commit('SET_SKILLS', response.data);
              return response;
            } catch (error) {
                throw new Error(error.response.data.error || error.response.data.message);
            }
        },
        // метод удаления скила с сервера и из store
        async removeSkill({commit}, skillId) {
            try {
              const response = await this.$axios.delete(`/skills/${skillId}`);
              commit('REMOVE_SKILL', skillId); // skillID (а не response.data) т.к. нам не нужен обрабатывать ответ от сервера
              return response;
            } catch (error) {
                throw new Error(error.response.data.error || error.response.data.message);
            }
        }
    }
};