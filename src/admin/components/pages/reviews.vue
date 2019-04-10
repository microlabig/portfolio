<template lang="pug">
    section.reviews
        .container
          .reviews__title
            .title
              h2.title Блок «Отзывы»
          reviews-add(
            v-if="showAddingForm === true"            
            @cancelAddNewGroup="cancelAddNewGroupForm"
          )   
          reviews-edit(
            v-if="showEditingForm === true"
            @cancelEditGroup="cancelEditExistedGroupForm"
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
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    reviewsAdd: () => import('components/reviews-add.vue'),
    reviewsEdit: () => import('components/reviews-edit.vue'),
    reviewsAddButton: () => import('components/reviews-addButton.vue'),
    reviewsGroup: () => import('components/reviews-group.vue')
  },
  data() {
    return {
      reviews: [],
      showAddingForm: false,
      showEditingForm: false
    }
  },
  computed: {
    ...mapGetters('reviews',['getReviews'])
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
    editExistedReviewGroupForm() {
      this.showAddingForm = false;
      this.showEditingForm = true;
    },
    cancelEditExistedGroupForm() {
      this.showEditingForm = false;
    }    
  }
}
</script>
