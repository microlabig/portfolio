<template lang="pug">
  .login
    .container
      form(
        @submit.prevent="login"
      ).login__form#form
        .login__close
          button(
            @click="close"
            type="button"
          ).login__close-btn
        .login__title-box
          h1.login__title Авторизация
        .form__wrapper
          .form__row           
            label.form__elem(data-text="Логин")
              .form__elem-container.form__elem-container--user
                input(
                  v-model="user.name"
                  type="text" 
                  placeholder="Terminator_2000" 
                ).form__elem-input
                .form__tooltip
                  .form__tooltip-text 
          .form__row
            label.form__elem(data-text="Пароль")
              .form__elem-container.form__elem-container--key
                input(
                  v-model="user.password"
                  type="password" 
                  placeholder="••••••••••"
                ).form__elem-input
                .form__tooltip
                  .form__tooltip-text 
          .form__row
            label.form__elem.form__elem--button
              button(type="submit").form__elem-button Отправить
</template>

<script>
import $axios from "@/requests";
import { mapActions } from "vuex";
import { good, bad } from "@/helpers/tooltipDispath";

export default {
  data() {
    return {
      user: {
        name: "bezmestin112018",
        password: "29031988"
      }
    }
  },
  methods: {
    ...mapActions("tooltip", ["showTooltip", "setColTooltip", "closeTooltip"]),
    
    // метод логина
    async login() {
      try {
        // axios возвращает объект с подобъектом dataЖ {token:токен, ttl:время токена}
        // при помощи конструкции деструктуризации создадим переменную token из объекта data
        const {
          data: {token}
        } = await $axios.post('/login', this.user);
        // далее, запишем token в localstorage браузера
        localStorage.setItem('token', token);
        // далее, установим заголовок (поле defaults в axios - устанавливает по-умолчанию для всех запросов)
        $axios.defaults.headers['Authorization'] = `Bearer ${token}`;
        // далее, в случае успешной авторизации редиректним в админку
        this.$router.replace('/');
        good(this, "Успешный вход");
      } catch (error) {
        bad(this, error);
      }      
    },

    close() {
      
    }

  }
}
</script>
