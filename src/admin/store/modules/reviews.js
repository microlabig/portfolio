import { packReviewToFormData } from '@/helpers/formDataPack';
import {CONSTS} from '../../../helpers/consts';

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
        },
        EDIT_REVIEW: (state, editedReview) => {
            state.reviews = state.reviews.map(review => review.id === editedReview.id ? editedReview : review);
        }
    },
    actions: {
        // метод добавления нового ревью
        async addReview({commit}, review) { 
            try {
                const response = await this.$axios.post('/reviews', packReviewToFormData(review));
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
                const response = await this.$axios.get(`/reviews/${CONSTS.MY_USER_ID}`);
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
        },

        // метод изменения отзыва
        async editReview({commit}, editedReview) {
            try {
                const response = await this.$axios.post(`/reviews/${editedReview.id}`, packReviewToFormData(editedReview));
                commit('EDIT_REVIEW', response.data.review); 
                
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