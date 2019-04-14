import Vue from 'vue';

const mobileMenuBtn = document.querySelector('#mobile-nav');

new Vue ({
    el: "#navigation_menu",    
    template: "#navigation",   
    
    data() {    // данные
        return {
            menuList: [
                { text:'Главная', href: '#section_1' },
                { text:'Обо мне', href: '#section_2' },
                { text:'Навыки', href: '#section_3' },
                { text:'Работы', href: '#section_4' },
                { text:'Отзывы', href: '#section_5' },
                { text:'Связаться', href: '#section_6' }
            ]           
        }
    }
   
});

new Vue ({
    el: "#navigation_menu--footer",    
    template: "#navigation--footer",   
    
    data() {    // данные
        return {
            menuList: [
                { text:'Главная', href: '#section_1' },
                { text:'Обо мне', href: '#section_2' },
                { text:'Навыки', href: '#section_3' },
                { text:'Работы', href: '#section_4' },
                { text:'Отзывы', href: '#section_5' },
                { text:'Связаться', href: '#section_6' }
            ]           
        }
    }
   
});


const menuMobileVue = new Vue ({
    el: "#navigation_menu--mobile",    
    template: "#navigation--mobile",   
    
    data() {    // данные
        return {
            menuList: [
                { text:'Главная', href: '#section_1' },
                { text:'Обо мне', href: '#section_2' },
                { text:'Навыки', href: '#section_3' },
                { text:'Работы', href: '#section_4' },
                { text:'Отзывы', href: '#section_5' },
                { text:'Связаться', href: '#section_6' }
            ],
            showMenu: false,
            showH1: true   
        }
    }   
});

mobileMenuBtn.addEventListener('click', e => {
    e.preventDefault();

    menuMobileVue.$data.showMenu = true;
}); 