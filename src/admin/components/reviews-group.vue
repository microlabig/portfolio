<template lang="pug">
    li.reviews__item
        .reviews__autor        
            .reviews__autor-left
                .avatar
                    .avatar__block.avatar__block--reviews
                        img(:src="`${baseURL}${review.photo}`" alt="Аватар").avatar__image
            .reviews__autor-right
                .reviews__name {{review.author}}
                .reviews__titul {{review.occ}}                  
        .reviews__description
            .reviews__text {{review.text}}            
            .btns-wrap
                .btns(
                    @click="editReviewGroup"
                    data-text="Править"
                )
                    button(type="button").button.button--edit                         
                .btns(data-text="Удалить")
                    button(
                        @click="removeExistedReview(review.id)"
                        type="button"
                    ).button.button--discard 
</template>

<script>
    import axios from 'axios';
    import { mapActions } from 'vuex';
    import { good, bad } from "@/helpers/tooltipDispath";

    export default {
        data() {
            return {
                baseURL: axios.defaults.baseURL
            }
        },
        props: {
            review: Object
        },
        methods: {
            ...mapActions('reviews',['removeReview']),
            ...mapActions("tooltip", ["showTooltip", "setColTooltip", "closeTooltip"]),

            editReviewGroup() {
                this.$emit('editReviewGroup',this.review.id);
            },

            async removeExistedReview(reviewId) {
                try {
                    await this.removeReview(reviewId);
                    good(this, "Данные успешно удалены");
                    this.$emit('removeReview');
                } catch (error) {
                    bad(this, error);
                }
            }
        }
    }
</script>
