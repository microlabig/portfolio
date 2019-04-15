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

            const percent = dashArray / 100 * (100 - this.skill.percent);
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
        skillList: Object,
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
            skillGroup: {},
            skillList: {}
        }
    },

    async created() { // стадия создания
       
        const categories = await axios.get(CONSTS.BASEURL+'categories/'+CONSTS.MY_USER_ID)
            .then(response => {
                this.skillGroup = { ...response.data };
            });
        const skills = await axios.get(CONSTS.BASEURL+'skills/'+CONSTS.MY_USER_ID)
            .then(response => {
                this.skillList = { ...response.data };
            });
         
    }
})
