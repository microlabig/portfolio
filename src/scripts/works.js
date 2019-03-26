import Vue from 'vue';

//  теги tags
const tags = {
    template: "#slider-tags"
};

//  миниатюры thumbs
const thumbs = {
    template: "#slider-thumbs",
    props: { // для "связи" данных из data() экземпляра в шаблон
        works: Array
    }
};

//  кнопки навигации btns
const btns = {
    template: "#slider-btns"
};

//  картинки display
const display = {
    template: "#slider-display",
    components: {
        btns,   // подключаем компонент btns
        thumbs    // подключаем компонент thumbs
    },
    props: {    // для "связи" данных из data() экземпляра в шаблон
        works: Array, // массив works 
        currentWork: Object
    }
};

//  информация info
const info = {
    template: "#slider-info",
    components: {
        tags    // подключаем компонент tags
    },
    props: {
        currentWork: Object
    }
};

//  экземпляр
new Vue ({
    el:"#slider-component",  // куда примонтировать
    template: "#slider-container", // откуда взять шаблон
    components: {
        display,    // подключаем компонент display
        info    // подключаем компонент info
    },
    data() {    // данные
        return {
            works: [],   // для чтения JSON-файла works.json
            currentWork: {}
        }
    },
    methods: {
        makeArrWithRequiredImages(data) {
            return data.map( item=>{ // метод map возвращает новый массив из перебранных и переработанных callback-функцией элементов массива data
                const requiredPic = require(`../images/content/work/${item.photo}`);
                item.photo = requiredPic;

                return item;
            })
        }
    },
    created() { // на стадии сохдания (не DOM-дерево)
        const data = require('../data/works.json');
        this.works = this.makeArrWithRequiredImages(data);

        this.currentWork = this.works[0];
    }
});



