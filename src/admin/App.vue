<template lang="pug">
  .wrapper.wrapper--admin
    header.header
      .header__wrapper
        .header__logo
          .header__avatar
            .avatar
              .avatar__block                
                img(src='../images/content/user.jpg' alt="Аватар").avatar__image
          .header__name
            h1.header__name-title Игорь Безместин
          .header__typepanel
            p Панель администрирования
        .header__quit
          a.header__quit-link Выйти

    .main-menu
      nav.menu
        ul.menu__list
          - var menuList = ['Обо мне', 'Работы', 'Отзывы'];
          - for (var i=0; i<menuList.length; i++)
            li.menu__item
              a(href="#" title=`${menuList[i]}`).menu__link #{menuList[i]} 

    main.maincontent.maincontent--admin               

      section.about
        .about__title
          .title
            h2.title Блок «Обо мне»
          .about__button-add
            button(type="button").button.button--add +
            button(type="button").about__button Добавить группу
        .groups
          ul.groups__list
            li.groups__item.groups__item--addgroup 
                form.form
                  .form__wrapper
                    .form__header
                      lavel.form__elem
                        .form__elem-container
                          input(type="text" placeholder="Название новой группы").form__elem-input
                          .form__elem-btns
                            button(type="button").button.button--apply
                            button(type="button").button.button--discard 
                    .form__footer
                      lavel.form__elem
                        .form__elem-container
                          input(type="text" placeholder="Новый навык").form__elem-input
                          .form__elem-percent
                            input(type="number" min="0" max="100" placeholder="100" value="100").form__elem-input
                          button(type="button").button.button--add +
            -
              var skillsList = [
                  [
                    {type: "Workflow"},
                    [{text:"Git", value:"100"}, {text:"Terminal", value:"90"}, {text:"Gulp", value:"80"}, {text:"Webpack", value:"85"}]
                  ],
                  [
                    {type: "Frontend"},
                    [{text:"HTML5", value:"100"}, {text:"CSS", value:"90"}, {text:"JavaScript", value:"80"}, {text:"Jquery и Vue.js", value:"85"}]
                  ]
                ];            
            each skill in skillsList
              li.groups__item.groups__item--group
                form.form
                  .form__wrapper
                    .form__header
                      lavel.form__elem
                        .form__elem-container
                          input(type="text" placeholder="Название новой группы" value=`${skill[0].type}`).form__elem-input
                          .form__elem-btns
                            button(type="button").button.button--edit 
                    .form__container
                      lavel.form-elem
                        .skill
                          ul.skill__list                        
                            li.skill__item
                              table.skill__table
                                each row in skill[1]
                                  tr.skill__table-row
                                    td.skill__name #{row.text}
                                    td.skill__value #{row.value}
                                    td.skill__percent %                                      
                                    td.skill__button
                                      button(type="button").button.button--edit
                                    td.skill__button                                      
                                      button(type="button").button.button--delete  
                    .form__footer
                      lavel.form__elem
                        .form__elem-container
                          input(type="text" placeholder="Новый навык").form__elem-input
                          .form__elem-percent
                            input(type="number" min="0" max="100" placeholder="100" value="100").form__elem-input
                          button(type="button").button.button--add +
      
      section.works
        .container
          .works__title
            .title
              h2.title Блок «Работы»
          form.form-edit
            .form-edit__title-box
              h3.form-edit__title Редактирование работы
            .form-edit__wrapper
              .form-edit__side.works-edit__side--left
                .image-load
                  .image-load__title Перетащите или загрузите #[span.span-block] для загрузки изображения
                  button(type="button").button.image-load__button Загрузить
              .form-edit__side.works-edit__side--right
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
                    .works__title #{work.title}
                    .works__text #{work.desc}
                    a(href="#").works__link #{work.link}
                    .btns-wrap
                      .btns(data-text="Править")
                        button(type="button").button.button--edit                         
                      .btns(data-text="Удалить")
                        button(type="button").button.button--discard                         

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
                    //- img(src=`${work.photo}` alt="Аватар").avatar-load__icon 
                  button(type="button").button.avatar-load__button Добавить фото
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
                      lavel(data-text="Отзыв").form__elem
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
                  "photo": "review1.jpg",
                  "text": "Этот код выдержит любые испытания. Только пожалуйста, не загружайте сайт на слишком старых браузерах"
                },
                {
                  "id": 2,
                  "name": "Ковальчук Дмитрий",
                  "titul": "Основатель LoftSchool",
                  "photo": "review2.jpg",
                  "text": "Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!"
                },
                {
                  "id": 3,
                  "name": "Владимир Сабанцев",
                  "titul": "Преподаватель",
                  "photo": "review1.jpg",
                  "text": "Этот код выдержит любые испытания. Только пожалуйста, не загружайте сайт на слишком старых браузерах"
                },
                {
                  "id": 4,
                  "name": "Ковальчук Дмитрий",
                  "titul": "Основатель LoftSchool",
                  "photo": "review2.jpg",
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



<style lang="pcss">

@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";

@import "../styles/blocks/menu.pcss";

@import "../styles/admin/layout/base.pcss";
@import '../styles/admin/*.pcss';



</style>