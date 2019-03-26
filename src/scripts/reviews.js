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
                //wrapAround: true
                contain: true,

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