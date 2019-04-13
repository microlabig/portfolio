<template lang="pug">
    tr.skill__table-row
        td.skill__name 
            .skill__name-input-wrapper
            label(v-if="editmode === false").form__elem
                .form__elem-read {{skill.title}}
            label(v-else).form__elem
                input(type="text" placeholder="Навык" v-model="editedskill.title").form__elem-input
        td.skill__value 
            .skill__name-input-wrapper
            label(v-if="editmode === false").form__elem.form__elem--number
                .form__elem-read {{skill.percent}} %                                                                          
            label(v-else).form__elem.form__elem--number
                input(type="number" min="0" max="100" placeholder="100" v-model="editedskill.percent").form__elem-input
                .form__elem-read.form__elem-read--percent % 
        td(v-if="editmode === false").skill__button
            button(
                @click="editmode = true"
                type="button"
            ).button.button--edit
            button(
                @click="removeExistedSkill"
                type="button"
            ).button.button--delete
        td(v-else).skill__button    
            button(
                @click="save"
                type="button"
            ).button.button--apply
            button(                
                @click="editmode = false"
                type="button"
            ).button.button--discard                                  
             
</template>

<script>
import { mapActions } from 'vuex';
import { good, bad } from "@/helpers/tooltipDispath";

export default {    
    props: {
        skill: Object
    },
    
    data() {
        return {
            editmode: false,
            editedskill: {...this.skill} // для редактирования (работаем с копией)
        }
    },

    methods: {
        ...mapActions('skills',['removeSkill','editSkill']),
        ...mapActions("tooltip", ["showTooltip", "setColTooltip", "closeTooltip"]),

        async removeExistedSkill() {
            try {
                await this.removeSkill(this.skill.id);
                good(this, "Данные успешно удалены");
            } catch (error) {
                bad(this, error);
            }
        },

        async save() {
            try {
                await this.editSkill(this.editedskill);
                this.editmode = false;
                good(this, "Данные успешно отредактированы");
            } catch (error) {
                bad(this, error);
            }
        }
    }
}
</script>
