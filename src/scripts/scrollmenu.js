import Vue from 'vue';

const mobileMenuBtn = document.querySelector('#mobile-nav');

/* -------------------------------

    метод плавной прокрутки к нужному элементу страницы
    ```smoothScrollTo(scrollTo, 300);```
    где scrollTo - это до чего нужно прокрутить(координаты элемента относительно окна)
    300 - магическое число которое делает прокрутку быстрее, медленнее
    https://gist.github.com/YohannParis/110a913c481c7d4b3b38026934f3730a

    или можно так:

    Element​.scroll​Into​View() делает это в одну строку
    документация https://developer.mozilla.org/ru/docs/Web/API/Element/scrollIntoView

------------------------------- */

window.smoothScrollTo = (function () {
    let timer, start, factor;

    return function (target, duration) {
        let offset = window.pageYOffset,
            delta = target - window.pageYOffset; // Y-offset difference
        duration = duration || 1000;              // default 1 sec animation
        start = Date.now();                       // get start time
        factor = 0;

        if (timer) {
            clearInterval(timer); // stop any running animations
        }

        function step() {
            let y;
            factor = (Date.now() - start) / duration; // get interpolation factor
            if (factor >= 1) {
                clearInterval(timer); // stop animation
                factor = 1;           // clip to max 1.0
            }
            y = factor * delta + offset;
            window.scrollBy(0, y - window.pageYOffset);
        }

        timer = setInterval(step, 10);
        return timer;
    };
}());


//---------------
// меню основное
//----------------
new Vue({
    el: "#navigation_menu",
    template: "#navigation",

    data() {    // данные
        return {
            menuList: [
                { text: 'Главная', href: 'section_1' },
                { text: 'Обо мне', href: 'section_2' },
                { text: 'Навыки', href: 'section_3' },
                { text: 'Работы', href: 'section_4' },
                { text: 'Отзывы', href: 'section_5' },
                { text: 'Связаться', href: 'section_6' }
            ],
            showMenu: false
        }
    },

    methods: {
        scrollToSection(href) {
            this.showMenu = false;
            const section = document.getElementById(href);
            section.scrollIntoView({ behavior: "smooth" });
            //smoothScrollTo(section.getBoundingClientRect().y);            
        }
    }

});

//---------------
// меню в футере
//----------------
new Vue({
    el: "#navigation_menu--footer",
    template: "#navigation--footer",

    data() {    // данные
        return {
            menuList: [
                { text: 'Главная', href: 'section_1' },
                { text: 'Обо мне', href: 'section_2' },
                { text: 'Навыки', href: 'section_3' },
                { text: 'Работы', href: 'section_4' },
                { text: 'Отзывы', href: 'section_5' },
                { text: 'Связаться', href: 'section_6' }
            ],
            showMenu: false
        }
    },

    methods: {
        scrollToSection(href) {
            this.showMenu = false;
            const section = document.getElementById(href);
            section.scrollIntoView({ behavior: "smooth" });
        }
    }
});

//---------------
// мобильное меню
//----------------

const listItem = {
    template: "#list-item",
    props: {
        item: Object,
        showMenu: Boolean
    }
}


const menuMobileVue = new Vue({
    el: "#navigation_menu--mobile",
    template: "#navigation--mobile",

    components: {
        listItem
    },

    data() {    // данные
        return {
            menuList: [
                { text: 'Главная', href: 'section_1' },
                { text: 'Обо мне', href: 'section_2' },
                { text: 'Навыки', href: 'section_3' },
                { text: 'Работы', href: 'section_4' },
                { text: 'Отзывы', href: 'section_5' },
                { text: 'Связаться', href: 'section_6' }
            ],
            showMenu: false
        }
    },

    methods: {
        scrollToSection(href) {
            this.showMenu = false;
            const section = document.getElementById(href);
            section.scrollIntoView({ behavior: "smooth" });
        }
    }
});


const mobileMenu = document.querySelector('#menuMobile');

// показать мобильное меню при клике
mobileMenuBtn.addEventListener('click', e => {
    e.preventDefault();
    menuMobileVue.$data.showMenu = true;
});



//--------------
//кнопка скролл
//--------------

const scrollButton = document.querySelector('.scroll__block');

const sectionAbout = document.querySelector('#section_2');

scrollButton.addEventListener('click', e => {
    sectionAbout.scrollIntoView({ behavior: "smooth" });
});



//--------------
// header на Главной и прогресс прокрутки страницы
//--------------
const scrollBegin = 100;
const header = document.querySelector('.header');
const scrollProgressUnder = header.querySelector('.header__scroll-progress--under');
// определим максимальную высоту страницы путем "подбора"
const maxBodyHeight = Math.round(document.body.scrollHeight-(4.5*document.body.scrollHeight/100));
let widthBorder = 100;

scrollProgressUnder.style.width = `${widthBorder}%`;

if (window.pageYOffset > scrollBegin) header.classList.add('scrolled');

window.addEventListener("scroll", e => {
  if (window.pageYOffset > scrollBegin) {
      header.classList.add('scrolled');
      scrollProgressUnder.classList.add('scrolled');
  }
  else {
      header.classList.remove('scrolled');
      scrollProgressUnder.classList.remove('scrolled');
  }
  
  widthBorder = 100 - Math.round(window.pageYOffset*100/maxBodyHeight),maxBodyHeight,window.pageYOffset;
  scrollProgressUnder.style.width = `${widthBorder}%`;

}, false);



