import axios from 'axios';
import {CONSTS} from "../helpers/consts";

// возьмем токен из localstorage браузера
const token = localStorage.getItem('token');

// базовый URL
axios.defaults.baseURL = CONSTS.BASEURL;
// заголовок запроса
axios.defaults.headers['Authorization'] = `Bearer ${token}`;

// интерсепторы есть на response и request
// до того, как данные придут из промиса запроса от сервера (перехватим его)
// вызовем ф-ию обновления токена
// другим словом - добавим перехватчик ответа от сервера
axios.interceptors.response.use(
    function(response) {
        return response;
    }, 
    error => {
        const originalRequest = error.config; // данные неуспешного ответа

        if (error.response.status === 401) { // истекло время токена
            // отправим запрос на обновление токена
            return axios.post('/refreshToken').then( response => {
                const token = response.data.token;
                localstorage.setItem('token', token);
                // заменим заголовок запроса
                axios.defaults.headers['Authorization'] = `Bearer ${token}`;
                // повторим запрос
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                return axios(originalRequest); // вызовем функцию axios с параметрами неудачного запроса на сервер еще раз
            })
        }

        if (error.response.status === 422) { // необработанный объект от сервера
            // отправим запрос на обновление токена
            throw new Error('Не заполнены поля');
        }

        if (error.response.status === 403) { // необработанный объект от сервера
            // отправим запрос на обновление токена
            throw new Error('Неверное имя пользователя или пароль');
        }
        
    });


export default axios;