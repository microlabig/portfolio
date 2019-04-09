<template lang="pug">
    form.form
        .form__wrapper
            .form__header
                label.form__elem
                    .form__elem-container(v-if="editmode === false")
                        .form__elem-read {{category.category}}             
                        .form__elem-btns
                            button(type="button" @click="editmode=true").button.button--edit 
                            button(type="button" @click="removeExistedCategory").button.button--delete                                                         
                    .form__elem-container(v-else)
                        input(type="text" placeholder="Название новой группы" v-model="category.category").form__elem-input                        
                        .form__elem-btns
                            button(type="button" @click="save").button.button--apply 
                            button(type="button" @click="editmode=false").button.button--discard
                                                        
            .form__container
                label.form-elem
                    .skill
                        ul.skill__list                        
                            li.skill__item
                                table.skill__table
                                    skills-item(
                                        v-for="skill in skills"
                                        :key="skill.id"
                                        :skill="skill"
                                    )
            .form__footer
                label.form__elem
                    .form__elem-container
                        input(type="text" placeholder="Новый навык" v-model="skill.title").form__elem-input
                        .form__elem-percent
                            input(type="number" min="0" max="100" placeholder="100" value="100" v-model="skill.percent").form__elem-input
                        button(type="button" @click="addNewSkill").button.button--add +
</template>

<script>
import {mapActions} from 'vuex';

export default {
    components: {
        skillsItem: () => import('components/skills-item.vue')
    },
    props: {
        category: Object,
        skills: Array
    },
    data() {
        return {
            skill: {
                category: this.category.id, 
                title: "",
                percent: ""
            },
            editmode: false
        }
    },
    methods: {
        ...mapActions('categories',['removeCategory', 'editNameCategory']),
        ...mapActions('skills',['addSkill']),
        async addNewSkill() {
            try {
                await this.addSkill(this.skill);
                this.skill = { // обнулим поля input.title и input.percent после добавления нового скила
                    ...this.skill,
                    title:"",
                    percent:""
                }
            } catch (error) {
                // TODO: обработать ошибку
                alert('Произошла ошибка при загрузке скилов');
            }
        },
        async removeExistedCategory() {
            try {
                await this.removeCategory(this.category.id);
            } catch (error) {
                // TODO: обработать ошибку
                alert('Произошла ошибка при удалении категории');
            }
        },
        async save() {
            try {
                await this.editNameCategory(this.category);
                this.editmode = false;
            } catch (error) {
                // TODO: обработать ошибку
                alert('Произошла ошибка при изменении имени категории');
            }
        }
    }
}
</script>
