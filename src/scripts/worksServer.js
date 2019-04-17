import Vue from 'vue';
import axios from 'axios';
import {CONSTS} from '../helpers/consts';

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
    },
    computed: {
        splicedWorks() {
            return window.screen.width < 1200 ? [...this.works].splice(0,3) : this.works;         
        }
    },
    data() {
        return {
            baseURL: CONSTS.BASEURL
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
        currentIndex: Number
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
            baseURL: CONSTS.BASEURL
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
            currentIndex: window.screen.width < 1200 ? 1 : 0, // индекс текущей работы
            idArray: []
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
                    /* const lastItem = this.works[this.works.length-1];
                    this.works.unshift(lastItem);
                    this.works.pop(); */
                    
                    this.currentIndex++;
                    break;
                case 'prev':
                    /* this.works.push(this.works[0]);
                    this.works.shift();
                     */
                    this.currentIndex--;
                    break;
            }
        },
        //обработка нажатий на миниатюры
        handleClickThumbs(currentIDthumbs) {
            /*           
             let curr = 0;
            let counter = 0;
            this.works.forEach( work => {
                if (work.id === currentIDthumbs) {
                    curr = counter;
                    return
                }
                counter++;
            });            

            
            for (let i=0; i < curr; i++) {
                let zeroElement = this.works.shift(); 
                this.works.push(zeroElement);
            } */


            let id = 0;

            this.idArray.forEach( element => {
                if (element.id === currentIDthumbs) {
                    id = element.index;
                    return;
                }
            });

            this.currentIndex = id;
            
        }
    },
    async created() { // на стадии создания (не DOM-дерево)
        const worksGroup = await axios.get(CONSTS.BASEURL+'works/'+CONSTS.MY_USER_ID)
            .then(response => {
                this.works = [...response.data];
            });
            
            // составим вспомогательный массив соответствующий work.id 
            // для кликов на thumbs
            let c = 0;
            const obj = {
                index: 0,
                id: 0                
            }
            this.works.forEach(work => {               
                obj.index = c;
                c++;
                obj.id = work.id;
                this.idArray.push({...obj});
            });
    }
});