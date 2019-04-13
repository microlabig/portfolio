<template lang="pug">
    section.reviews
        .container
          .reviews__title
            .title
              h2.title Блок «Отзывы»
          reviews-add(
            v-if="showAddingForm === true"            
            @cancelAddNewGroup="cancelAddNewGroupForm"
            @addNewReview="addNewReview"
          )   
          reviews-edit(
            v-if="showEditingForm === true"            
            @cancelEditGroup="cancelEditExistedGroupForm"
            :reviewEditedById="reviewEditedById"
            @editExistedReview="editExistedReview"
          )               
          .reviews__listwrapper            
            ul.reviews__list
              reviews-add-button(
                @addNewReviewGroup="addNewReviewGroupForm"
              )
              reviews-group(
                v-for="review in getReviews"
                :key="review.id"
                :review="review"
                @editReviewGroup="editExistedReviewGroupForm"
              )                            
    
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  components: {
    reviewsAdd: () => import('components/reviews-add.vue'),
    reviewsEdit: () => import('components/reviews-edit.vue'),
    reviewsAddButton: () => import('components/reviews-addButton.vue'),
    reviewsGroup: () => import('components/reviews-group.vue')
  },
  data() {
    return {      
      showAddingForm: false,
      showEditingForm: false,
      reviewEditedById: {}
    }
  },
  computed: {
    ...mapGetters('reviews',['getReviews']),
    ...mapState('reviews', { // добавим дополнительное свойство из данных в store 'categories'
        reviews: state => state.reviews
      })
  },
  async created() { 
    // получим список отзывов из сервера  
    try {
      await this.fetchReviews();   
    } catch (error) {
      // TODO: обработать ошибку
      alert('Произошла ошибка при загрузке категорий');
    }
  },
  methods: {
    ...mapActions('reviews',['fetchReviews']),

    addNewReviewGroupForm() {
      this.showAddingForm = true;
      this.showEditingForm = false;
    },
    cancelAddNewGroupForm() {
      this.showAddingForm = false;
    },
    editExistedReviewGroupForm(review_ID) {      
      this.showAddingForm = false;
      this.showEditingForm = true;
      this.reviews.forEach(review => (review.id === review_ID ? this.reviewEditedById = review : undefined));
    },
    cancelEditExistedGroupForm() {
      this.showEditingForm = false;
    },

    addNewReview() {
      this.showAddingForm = false;
    },
    editExistedReview() {
      this.showEditingForm = false;
    }
  }
}
</script>
