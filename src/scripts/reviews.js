import Vue from 'vue';
import Flickity from 'vue-flickity';
import axios from 'axios';

new Vue({
    el:"#review",
    template:"#reviews__template",

    components: {
        Flickity
    },

    data () {
        return {
            flickityOptions: {
                //initialIndex: 1,
                prevNextButtons: false,
                pageDots: false,
                //groupCells: 1,
                groupCells: window.screen.width > 948 ? 2 : 1,
                //contain: document.querySelector('html').clientWidth > 320 ? true : false,
            },
            reviews: {}
        }
    },

    async created() { // стадия создания       
        const items = await axios.get('https://webdev-api.loftschool.com/reviews/120')
            .then(response => {
                this.reviews = { ...response.data };
            });          
    },

    methods: {
        next() {
            this.$refs.flickity.next();
        },

        previous() {
            this.$refs.flickity.previous();
        }
    }
});


