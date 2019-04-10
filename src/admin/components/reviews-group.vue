<template lang="pug">
    li.reviews__item
        .reviews__autor
            .reviews__autor-left
                .avatar
                    .avatar__block
                        img(src='../../images/content/reviews/review1.jpg' alt="Аватар").avatar__image
            .reviews__autor-right
                .reviews__name name
                .reviews__titul titul                  
        .reviews__description 
            .reviews__text text
            .btns-wrap
                .btns(data-text="Править")
                    button(type="button").button.button--edit                         
                .btns(data-text="Удалить")
                    button(type="button").button.button--discard 
</template>
