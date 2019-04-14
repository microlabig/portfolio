import Vue from 'vue';
import axios from 'axios';

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
        currentWork: Object
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
        currentIndex: Number
    },
    computed: {
        // перевернем список работ по вертикали (т.к. не по макету)
        reversedWorks() {
            const works = [...this.works]; // скопируем массив, т.к. он передается по ссылке
            return works.reverse();
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
new Vue ({
    el:"#slider-component",  // куда примонтировать
    template: "#slider-container", // откуда взять шаблон
    components: {
        display,    // подключаем компонент display
        info    // подключаем компонент info
    },
    data() {    // для данных
        return {
            works: [],   // для чтения JSON-файла works.json
            currentIndex: 0 // индекс текущей работы
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
        /* // метод, возвращающий массив с адресами картинок
        makeArrWithRequiredImages(data) {
            return data.map( item=>{ // метод map возвращает новый массив из перебранных и переработанных callback-функцией элементов массива data
                const requiredPic = require(`../images/content/work/${item.photo}`);
                item.photo = requiredPic;

                return item;
            })
        }, */
        //обработка нажатий кнопок 
        handleSlide(direction) {
            switch (direction) {
                case 'next':
                    this.currentIndex++;
                    break;
                case 'prev':
                    this.currentIndex--;
                    break;
            }
        },
        //обработка нажатий на миниатюры
        handleClickThumbs(currentIDthumbs) {
            let arr = [], min = 0, i=0;
            for (let work in this.works) {                
                arr.push(this.works[work].id);
            }
            min = arr[0];
            for (i=1; i< arr.length-1; i++) {
                if (arr[i] < min) min = arr[i];
            }            
            this.currentIndex = currentIDthumbs-min;  
        }
    },
    async created() { // на стадии создания (не DOM-дерево)
        const worksGroup = await axios.get('https://webdev-api.loftschool.com/works/120')
            .then(response => {
                this.works = [...response.data];
            });
    }
});



