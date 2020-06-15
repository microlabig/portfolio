import Vue from 'vue';
import Flickity from 'vue-flickity';
// import axios from 'axios';
import {CONSTS} from '../helpers/consts';

new Vue({
    el:"#review",
    template:"#reviews__template",

    components: {
        Flickity
    },

    data () {
        return {
            flickityOptions: {
                draggable: true,
                //initialIndex: 1,
                prevNextButtons: false,
                pageDots: false,
                //groupCells: 1,
                groupCells: true, //window.screen.width > 948 ? 2 : 1,
                //contain: document.querySelector('html').clientWidth > 320 ? true : false,
            },
            reviews: {},
            baseURL: CONSTS.BASEURL
        }
    },

    created() { // стадия создания       
        /* const items = await axios.get(CONSTS.BASEURL+'reviews/'+CONSTS.MY_USER_ID)
            .then(response => {
                this.reviews = { ...response.data };
            }); */
        const data = require('../data/reviews.json');
        this.reviews = this.makeArrWithRequiredImages(data);
    },

    methods: {
        next() {
            this.$refs.flickity.next();
        },

        previous() {
            this.$refs.flickity.previous();
        },

        // обработка путей к картинкам
        makeArrWithRequiredImages(data) {
            return data.map( item=>{ // метод map возвращает новый массив из перебранных и переработанных callback-функцией элементов массива data
                const requiredPic = require(`../images/content/reviews/${item.photo}`); // преобразует имена изображений в имена с хеш-суммами (на продакшн)
                item.photo = requiredPic;
                return item;
            })
        }
    }
});


