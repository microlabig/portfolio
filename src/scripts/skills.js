import Vue from 'vue';
import axios from 'axios';
import {CONSTS} from '../helpers/consts';

// компонент skill
const skillItem = {
    template: "#skill",
    props: {    // регистрируем принимаемые св-ва skillName и skillPercent из компонента skillsRow
        skill: Object
    },
    methods: {
        drawColoredCircle() {
            const circle = this.$refs['color-circle']; //получим атрибут ref
            const dashArray = parseInt(getComputedStyle(circle).getPropertyValue('stroke-dasharray'));

            const percent = dashArray / 100 * (100 - this.skill.value);
            circle.style.strokeDashoffset = percent;
        }
    },
    mounted() { // стадия монтирования в DOM-дерево
        this.drawColoredCircle();
    }
}

// компонент строки скиллов
const skillsRow = {
    template: "#skills-row",
    components: { // положим компонент skill
        skillItem
    },

    props: {    // регистрируем принимаемое св-во skill из основного Vue-экземпляра  
        group: Object
    },

    computed: {
        getNameSkill() {
            return {}
        }
    }
}

new Vue({
    el: "#skills-component",    //найдем в DOM-nodes элемент с ID="skills-component"
    template: "#skills-list",   //используем шаблон skills-list
    components: {   //в основной Vue-экземпляр положим skillsRow
        skillsRow
    },
    data() {    // данные
        return {
            skillGroup: {}
        }
    },

    created() { // стадия создания
        const data = require('../data/skills.json');
        this.skillGroup = data;
    }
})
