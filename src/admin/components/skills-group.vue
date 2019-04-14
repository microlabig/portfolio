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
                        input(type="text" v-model="category.category").form__elem-input                        
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
                        .form__tooltip(
                                :class="{'is-error': validation.hasError('skill.title')}"
                            )
                                .form__tooltip-text {{validation.firstError('skill.title')}}
                        .form__elem-percent
                            input(
                                type="number" 
                                min="0" max="100" 
                                placeholder="100" 
                                value="100" 
                                v-model="skill.percent"                                
                            ).form__elem-input
                            .form__tooltip(
                                :class="{'is-error': validation.hasError('skill.percent')}"
                            )
                                .form__tooltip-text {{validation.firstError('skill.percent')}}
                        button(
                            @click="addNewSkill"
                            type="button" 
                        ).button.button--add +
</template>

<script>
import { mapActions } from 'vuex';
import { Validator } from 'simple-vue-validator';
import { good, bad } from "@/helpers/tooltipDispath";

export default {
    mixins: [require('simple-vue-validator').mixin],

    validators: {
        'skill.title'(value) {
            return Validator.value(value).required('Поля не должны быть пустыми');
        },
        'skill.percent'(value) {
            return Validator.value(value).required('Поля не должны быть пустыми').integer('Поле должно содержать число от 0 до 100');
        },
    },

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
        ...mapActions("tooltip", ["showTooltip", "setColTooltip", "closeTooltip"]),

        async addNewSkill() {
            if ((await this.$validate()) === false) return;
           
            try {
                await this.addSkill(this.skill);
                this.skill = { // обнулим поля input.title и input.percent после добавления нового скила
                    ...this.skill,
                    title:"",
                    percent:""
                }
                good(this, "Навык успешно добавлен");
                 this.validation.reset();
            } catch (error) {
                bad(this, error);
            }
        },

        async removeExistedCategory() {
            try {
                await this.removeCategory(this.category.id);
                good(this, "Группа успешно удалена");
            } catch (error) {
                bad(this, error);
            }
        },

        async save() {
            try {
                await this.editNameCategory(this.category);
                this.editmode = false;
                good(this, "Группа успешно переименована");
            } catch (error) {
                bad(this, error);
            }
        }
    }
}
</script>
