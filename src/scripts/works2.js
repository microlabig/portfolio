// -------------
// "works2" - вторые версии JS b PUG, которые берут данные из JSON, т.к. сервер loftschool почему-то удаляет информацию о работах и многое чего (???)
// -------------

import Vue from 'vue';

const BASEURL = ''

// ----------
//  теги tags
// ----------
const tags = {
    template: "#slider-tags",
    props: {
        tagsArray: Array
    }
};

// -----------------
//  миниатюры thumbs
// ------------------
const thumbs = {
    template: "#slider-thumbs",
    
    props: { // для "связи" данных из data() экземпляра в шаблон
        works: Array,
        currentWork: Object,
        direction: String
    },

    computed: {
        splicedWorks() {
            return [...this.works];//.splice(0,3);         
        }
    },

    data() {
        return {
            baseURL: BASEURL
        }
    }    
};

// ----------------------
//  кнопки навигации btns
// ----------------------
const btns = {
    template: "#slider-btns"   
};

// -----------------
//  картинки display
// -----------------
const display = {
    template: "#slider-display",
    components: {
        btns,   // подключаем компонент btns
        thumbs    // подключаем компонент thumbs
    },
    props: {    // для "связи" данных из data() экземпляра в шаблон
        works: Array, // массив works 
        currentWork: Object,
        currentIndex: Number,
        direction: String
    },
    computed: {
        // перевернем список работ по вертикали (т.к. не по макету)
        reversedWorks() {
            const works = [...this.works]; // скопируем массив, т.к. он передается по ссылке
            return works.reverse();
        }
    },
    data() {
        return {
            baseURL: BASEURL
        }
    }
};

// ----------------
//  информация info
// ----------------
const info = {
    template: "#slider-info",
    components: {
        tags    // подключаем компонент tags
    },
    computed: {
        tagsArray() {
            return this.currentWork.techs.split(',');
        }
    },
    props: {
        currentWork: Object
    }
};

// ----------
//  экземпляр
// ----------
let worksSlider = new Vue ({
    el:"#slider-component",  // куда примонтировать

    template: "#slider-container", // откуда взять шаблон

    components: {
        display,    // подключаем компонент display
        info    // подключаем компонент info
    },

    data() {    // для данных
        return {
            works: [],   // для чтения JSON-файла works.json
            currentIndex: 0, // индекс текущей работы
            indexOffset: 3
        }
    },

    computed: { // для работы только с данными из data()
        // возвратим текущую работу currentWork по текущему индексу currentIndex
        currentWork() { // текущая показываемая работа
            return this.works[this.currentIndex];
        }
    },

    watch: { // слежение за свойствами из data()
        currentIndex(value) {
            this.makeInfiniteLoopForCurrentIndex(value);
        }
    },

    methods: { // ддя описания методов

        // закольцевание навигацию
        makeInfiniteLoopForCurrentIndex(value) {
            const worksAmount = this.works.length - 1; // индексы начинаются с нуля (zerobase)
            if (value > worksAmount) this.currentIndex = 0; // если больше количества работ в массиве works, то обнулим currentIndex
            if (value < 0) this.currentIndex = worksAmount;
        },

        //обработка нажатий кнопок 
        handleSlide(direction) {      
            switch (direction) {
                case 'next':
                    const lastItem = this.works[this.works.length-1];
                    this.works.unshift(lastItem);
                    this.works.pop();      
                    break;
                case 'prev':
                    this.works.push(this.works[0]);
                    this.works.shift();     
                    break;
            }
        },

        //обработка нажатий на миниатюры
        handleClickThumbs(arrayIndex) {   
            for (let i = 0; i < this.indexOffset - arrayIndex - 1; i++) {                
                setTimeout(() => {
                    this.works.push(this.works[0]);
                    this.works.shift(); 
                }, 25);
            }
        },

        // обработка путей к картинкам
        makeArrWithRequiredImages(data) {
            return data.map( item=>{ // метод map возвращает новый массив из перебранных и переработанных callback-функцией элементов массива data
                const requiredPic = require(`../images/content/work/${item.photo}`); // преобразует имена изображений в имена с хеш-суммами (на продакшн)
                item.photo = requiredPic;
                return item;
            })
        }
    },

    created() { // на стадии создания (не DOM-дерево)
        let index = 0;
        const data = require('../data/works.json');

        this.works = this.makeArrWithRequiredImages(data);

        this.currentIndex = this.works.length < this.indexOffset ? 0 : (this.works.length - this.indexOffset); 
        
        this.works = this.works.map( work => {
            index++;
            return {
                ...work,
                sliderIndex: index
            }                    
        });
    }
});

// автоматическая прокрутка слайдера 
const DELAY = 7000;

let timerWorkSliderId = setInterval( () => {
    worksSlider.handleSlide('prev');
}, DELAY)

