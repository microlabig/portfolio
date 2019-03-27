<template lang="pug">
  .wrapper
    .content
      header.header
        .header__logo
          .header__avatar
            .avatar
              .avatar__block
                //- +image(`../content/user.jpg`, 'avatar__image', 'Аватар') 
          .header__name
            h2.header__name-title Игорь Безместин
          .header__typepanel
            p Панель администрирования
        .header__quit
          a.header__quit-link Выйти

      nav.menu
        ul.menu__list
          li.menu__item.active
            a.menu__link Обо мне
          li.menu__item
            a.menu__link Работы
          li.menu__item
            a.menu__link Отзывы

      section.about
        h2.about__title Блок «Обо мне»
        .about__button-add
          button(type="button").about__button Добавить группу
        .groups
          ul.groups__list
            li.groups__item.groups__item--addgroup
              form.groups__form
                form.groups__form-wrapper
                  .groups__form-header
                    lavel.groups__form-elem
                      .groups__elem-container
                        input(type="text" placeholder="Название новой группы")
                        button(type="button").groups__button.apply
                        button(type="button").groups__button.discard  
                  .groups__form-container
                    lavel.groups__form-elem
                      ul.groups__skill-list
                        li.groups__skill-item
                          .groups__skill-name Git
                          .groups__skill-percent 100
                          button(type="button").groups__btn.groups__btn--edit
                          button(type="button").groups__btn.groups__btn--delete
                         
                  .groups__form-footer
                    lavel.groups__form-elem
                      .groups__elem-container
                        input(type="text" placeholder="Новый навык")
                        input(type="text" placeholder="100")
                        button(type="button").groups__button.add       

</template>