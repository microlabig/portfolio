<template lang="pug"> 
    form.form
        .form__wrapper
            .form__header
                label.form__elem
                    .form__elem-container
                        input(
                            v-model="skillGroupTitle" 
                            type="text"                             
                            placeholder="Название новой группы"
                        ).form__elem-input
                        .form__elem-btns
                            button(@click="addSkillGroup" type="button").button.button--apply
                            button(type="button").button.button--discard 
            .form__footer
                label.form__elem
                    .form__elem-container
                        input(type="text" placeholder="Новый навык" readonly).form__elem-input
                        .form__elem-percent
                            input(type="number" min="0" max="100" placeholder="100" value="100" readonly).form__elem-input
                        button(type="button").button.button--add +
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
            skillGroupTitle: ""
        }
    },

    methods: {
        ...mapActions('categories',['addNewSkillGroup']),
        ...mapActions("tooltip", ["showTooltip", "setColTooltip", "closeTooltip"]),

        async addSkillGroup() {
            try {
                await this.addNewSkillGroup(this.skillGroupTitle);
                this.skillGroupTitle = "";
                good(this, "Группа успешно загружена");
            } catch (error) {
                bad(this, error);
            }
            
        }
    }
}
</script>
