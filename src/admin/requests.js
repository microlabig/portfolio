import axios from 'axios';

const token = localStorage.getItem('token');

// базовый URL
axios.defaults.baseURL = "https://webdev-api.loftschool.com/";
// заголовок запроса
axios.defaults.headers['Authorization'] = `Bearer ${token}`;


export default axios;