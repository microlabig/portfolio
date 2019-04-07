<template lang="pug">
    section.works
        .container
          .works__title
            .title
              h2.title Блок «Работы»
          form.form-edit
            .form-edit__title-box
              h3.form-edit__title Редактирование работы
            .form-edit__wrapper
              .form-edit__side.form-edit__side--left
                .image-load
                  .image-load__title Перетащите или загрузите #[span.span-block] для загрузки изображения
                  button(type="button").button.image-load__button Загрузить
                .image-edit
                  .image-edit__image
                    img(src='../images/content/work/slider-image1.jpg' alt="Изображение работы").image-edit__icon 
                  button(type="button").button.image-edit__button Изменить превью
              .form-edit__side.form-edit__side--right
                form.form.form--works
                  .form__wrapper
                    .form__row
                      label(data-text="Название").form__elem
                        .form__elem-container
                          input(type="text" placeholder="Дизайн сайта для авто салона Porshe").form__elem-input
                    .form__row
                      label(data-text="Ссылка").form__elem
                        .form__elem-container
                          input(type="text" placeholder="https://www.porshe-pulkovo.ru").form__elem-input
                    .form__row.form__row--textarea
                      label(data-text="Описание").form__elem
                        .form__elem-container
                          textarea(type="textarea" placeholder="Порше Центр Пулково - является официальным дилером марки Порше в Санкт-Петербурге и предоставляет полный цикл услуг по продаже и сервисному обслуживанию автомобилей").form__elem-textarea
                    .form__row.form__row--tags
                      label(data-text="Добавление тега").form__elem
                        .form__elem-container
                          input(type="text" placeholder="JQuery, Vue.js, HTML5").form__elem-input
                          ul.form__list.form__list--tags
                            - var tagList = ['JQuery', 'Vue.js', 'HTML5'];
                            - for (i=0; i<tagList.length; i++)
                              li.form__item
                                button(type="button").button.button--tag #{tagList[i]}
                                .button-tagdelete
                                  button(type="button").button.button--discard
                    .form__row.form__row--btns
                      label(data-text="").form__elem
                        .form__elem-container.form__elem-container--btns
                          button(type="button").button.button--cancel Отмена
                          button(type="submit").button.button--save Сохранить

          -
            var worksList = 
            [
              {
                "id": 1,
                "title": "Лендинг бургерной Mr. Burger",
                "skills": "HTML, Sass, JQuery, YandexAPI, FlexBox",
                "photo": "slider-image3.jpg",
                "link": "//rambler.ru",
                "desc": "Дипломная работа. Сайт адаптивен для всех устройств. Здесь реализованы такие технологии, как OnePageScroll, Api-медиа (работа с видео), Yandex-Maps и форма обратной связи"
              },
              {
                "id": 2,
                "title": "Сайт компании AirLines",
                "skills": "HTML, CSS",
                "photo": "slider-image1.jpg",
                "link": "//google.com",
                "desc": "Это первый проект"
              },
              {
                "id": 3,
                "title": "Сайт коворкинга",
                "skills": "HTML, CSS",
                "photo": "slider-image2.jpg",
                "link": "//yandex.ru",
                "desc": "Это второй проект"
              },   
              {
                  "id": 4,
                  "title": "Заголовок",
                  "skills": "HTML, CSS, JavaScript, JQuery",
                  "photo": "slider-image4.jpg",
                  "link": "//rambler.ru",
                  "desc": "Описание"
                }
            ];
          .works__listwrapper
            ul.works__list 
              li.works__item.works__item--add
                .btn-container
                  .btn-container__add
                    .btn-container__add-button +
                    .btn-container__add-title Добавить #[span.span-block] работу
              each work in worksList            
                li.works__item
                  .works__image
                    img(src=`../images/content/work/${work.photo}` alt="Изображение работы").works__icon 
                    .works__tags
                      ul.works__tag-list
                        li.works__tag-item
                          .works__tag #{work.skills}
                  .works__description 
                    .works__description-box
                      .works__title #{work.title}
                      .works__text #{work.desc}
                      a(href="#").works__link #{work.link}
                    .btns-wrap
                      .btns(data-text="Править")
                        button(type="button").button.button--edit                         
                      .btns(data-text="Удалить")
                        button(type="button").button.button--discard   

</template>
