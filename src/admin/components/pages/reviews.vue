<template lang="pug">
    section.reviews
        .container
          .reviews__title
            .title
              h2.title Блок «Отзывы»
          form.form-edit.form-edit--reviews
            .form-edit__title-box
              h3.form-edit__title Новый отзыв
            .form-edit__wrapper
              .form-edit__left
                .avatar-load
                  .avatar-load__image
                  button(type="button").button.avatar-load__button Добавить фото
                .avatar-edit
                  .avatar-edit__image
                    .avatar__block
                      img(src=`../images/content/reviews/review2.jpg` alt="Аватар").avatar__image
                  button(type="button").button.avatar-edit__button Изменить фото
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
                          button(type="button").button.button--cancel Отмена
                          button(type="submit").button.button--save Сохранить         

          -
            var reviewList =
              [
                {
                  "id": 1,
                  "name": "Владимир Сабанцев",
                  "titul": "Преподаватель",
                  "photo": "review2.jpg",
                  "text": "Этот код выдержит любые испытания. Только пожалуйста, не загружайте сайт на слишком старых браузерах"
                },
                {
                  "id": 2,
                  "name": "Ковальчук Дмитрий",
                  "titul": "Основатель LoftSchool",
                  "photo": "review1.jpg",
                  "text": "Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!"
                },
                {
                  "id": 3,
                  "name": "Владимир Сабанцев",
                  "titul": "Преподаватель",
                  "photo": "review2.jpg",
                  "text": "Этот код выдержит любые испытания. Только пожалуйста, не загружайте сайт на слишком старых браузерах"
                },
                {
                  "id": 4,
                  "name": "Ковальчук Дмитрий",
                  "titul": "Основатель LoftSchool",
                  "photo": "review1.jpg",
                  "text": "Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!"
                }
              ];
              
          .reviews__listwrapper
            ul.reviews__list
              li.reviews__item.reviews__item--add
                .btn-container
                  .btn-container__add
                    .btn-container__add-button +
                    .btn-container__add-title Добавить отзыв
              each review in reviewList            
                li.reviews__item
                  .reviews__autor
                    .reviews__autor-left
                      .avatar
                        .avatar__block
                          img(src=`../images/content/reviews/${review.photo}` alt="Аватар").avatar__image
                    .reviews__autor-right
                      .reviews__name #{review.name}
                      .reviews__titul #{review.titul}                  
                  .reviews__description 
                    .reviews__text #{review.text}
                    .btns-wrap
                      .btns(data-text="Править")
                        button(type="button").button.button--edit                         
                      .btns(data-text="Удалить")
                        button(type="button").button.button--discard                             
    
</template>
