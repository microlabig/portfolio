<template lang="pug">
    form.form-edit.form-edit--reviews
        .form-edit__title-box
            h3.form-edit__title Новый отзыв
        .form-edit__wrapper
            .form-edit__left
                label.avatar-edit
                    .avatar-edit__image
                        input(type='file').avatar-change__file
                        .avatar__block
                            img(src=`../../images/content/reviews/review2.jpg` alt="Аватар").avatar__image
                    .button.avatar-edit__button Изменить фото
            .form-edit__right
                form.form
                    .form__wrapper
                        .form__row.form__row--inputs
                            label(data-text="Имя автора").form__elem
                                .form__elem-container
                                    input(type="text" placeholder="Ковальчук Дмитрий").form__elem-input
                            label(data-text="Титул автора").form__elem
                                .form__elem-container
                                    input(type="text" placeholder="Основатель LoftSchool").form__elem-input
                        .form__row.form__row--textarea 
                            label(data-text="Отзыв").form__elem
                                .form__elem-container.form__elem-container--message                        
                                    textarea(type="textarea" placeholder="Этот парень проходил обучение веб-разработке не где-то, а в LoftShool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!").form__elem-textarea                   
                        .form__row.form__row--btns
                            label(data-text="").form__elem
                                .form__elem-container
                                    button(
                                        @click="cancelEditGroup"
                                        type="button"
                                    ).button.button--cancel Отмена
                                    button(type="submit").button.button--save Сохранить
</template>

<script>
    export default {
        methods: {
            cancelEditGroup() {
                this.$emit('cancelEditGroup');
            }
        }
    }
</script>
