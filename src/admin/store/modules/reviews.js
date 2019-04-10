export default {
    namespaced: true,
    state: {
        reviews: []
    },
    mutations: {
        SET_REVIEW: (state, review) => {
            state.reviews.push(review);
        },
        SET_ALL_REVIEWS: (state, reviews) => {
            state.reviews = reviews;
        },
        REMOVE_REVIEW: (state, reviewID) => {
            state.reviews = state.reviews.filter(review => review.id !== reviewID)
        }

    },
    actions: {
        // метод добавления нового ревью
        async addReview({commit}, review) { 
            try {
                // создадим объект FormData
                const formData = new FormData();
                // упакуем review
                formData.append('text', review.text);
                formData.append('occ', review.occ);
                formData.append('author', review.author);
                formData.append('photo', review.photo);

                const response = await this.$axios.post('/reviews', formData);
                commit('SET_REVIEW', response.data);                
                return response;
            } catch (error) {
                throw new Error(error.response.data.error || error.response.data.message);
            }     
        },

        // метод получения всех отзывов
        async fetchReviews({commit}) { 
            // {commit} - метод из store (деструктуризация)
            try {
                const response = await this.$axios.get('/reviews/120');
                commit('SET_ALL_REVIEWS', response.data.reverse()); // вызовим мутацию и получим ответ в response.data
                return response;
            } catch (error) {
                throw new Error(error.response.data.error || error.response.data.message);
            }     
        },

        // метод удаления отзыва
        async removeReview({commit}, reviewId) {
            try {
              const response = await this.$axios.delete(`/reviews/${reviewId}`);
              commit('REMOVE_REVIEW', reviewId); // categoryId (а не response.data) т.к. нам не нужен обрабатывать ответ от сервера
              return response;
            } catch (error) {
                throw new Error(error.response.data.error || error.response.data.message);
            }
        }
    }, 
    getters: {
        // получить список всех отзывов
        getReviews: state => {
            return state.reviews;
        }
    }
}