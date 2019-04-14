import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; 
import requests from './requests';
import simpleVueValidator from 'simple-vue-validator';

Vue.use(simpleVueValidator);

store.$axios = requests; // для того, чтобы использовать в store 
// store - обычный объект => добавим в него еще одно поле 
// и мы можем в store обращаться как this.$axios

new Vue({
  el: "#app-root",
  router,
  store,
  render: h => h(App)
});