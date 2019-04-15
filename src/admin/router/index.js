import Vue from "vue";
import VueRouter from "vue-router";
import routes from '@/router/routes';
import axios from 'axios';
import store from '@/store';
import {CONSTS} from '../../helpers/consts'

Vue.use(VueRouter); // укажим Vue использовать методы Vuerouter

const router = new VueRouter({ routes });

//-----
// защитим админку путем проверки авторизации пользователя
//-----
const baseURL = CONSTS.BASEURL;
const guard = axios.create({ baseURL }); // создадим новый экземпляр axios и положим в него baseURL

router.beforeEach(async (to, from, next) => {
  // проверим публичный ли переход или нет и проверим маршруты в роутах по полю meta
  const isPublicRoute = to.matched.some(record => record.meta.public);// метод some для массивов говорит "удовлетворяет ли он условиям"
  const isUserLogged = store.getters["user/userIsLogged"];// вызов геттера:
                      // store.getters["ИМЯ_STORE_К_КОТОРОМУ_ПРИНАДЛЕЖИТ_ГЕТТЕР/ИМЯ_ГЕТТЕРА"]
    
  if (isPublicRoute === false && isUserLogged === false) { 
    // если пользователь не залогинен 
    // то отравим запрос на пользователя (спросим кто он (проверка токена))
    const token = localStorage.getItem('token');
    guard.defaults.headers['Autorezation'] = `Bearer ${token}`;
    // посылаем запрос
    try {
      const response = await guard.get('/user');
      store.commit('user/SET_USER', response.data.user); // поместим пользователя в store
      next(); // продолжить загрузку роута
    } catch (error) {
      // если ошибка
      router.replace('/login'); // редирект на login
      localStorage.removeItem('token'); // удалим токен из localstorage браузера
    }
  } else {
    next();
  }
});

export default router;
