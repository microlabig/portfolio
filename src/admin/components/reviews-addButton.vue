<template lang="pug">
    li.reviews__item.reviews__item--add
        .btn-container
            .btn-container__add(
                @click="addNewReviewGroup"
            )
                .btn-container__add-button +
                .btn-container__add-title Добавить отзыв
</template>

<script>
export default {
    methods: {
        addNewReviewGroup() {
            this.$emit('addNewReviewGroup');
        }
    }
}
</script>
