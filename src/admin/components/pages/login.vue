<template lang="pug">
  .login
    .container
      form.login__form#form
        .login__close
          button(type="button").login__close-btn
        .login__title-box
          h1.login__title Авторизация
        .form__wrapper
          .form__row           
            label.form__elem(data-text="Логин")
              .form__elem-container.form__elem-container--user
                input(type="text" placeholder="Terminator_2000").form__elem-input
                .form__tooltip
                  .form__tooltip-text 
          .form__row
            label.form__elem(data-text="Пароль")
              .form__elem-container.form__elem-container--key
                input(type="password" placeholder="••••••••••").form__elem-input
                .form__tooltip
                  .form__tooltip-text 
          .form__row
            label.form__elem.form__elem--button
              button(type="submit").form__elem-button Отправить
</template>
