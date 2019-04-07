import Vue from 'vue';
import Flickity from 'vue-flickity';

new Vue({
    el:"#review",

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

                // any options from Flickity can be used
            }
        }
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
