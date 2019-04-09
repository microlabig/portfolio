<template lang="pug">
    tr.skill__table-row
        td.skill__name 
            .skill__name-input-wrapper
            label.form__elem
                .form__elem-read {{skill.title}}
            label.form__elem
                input(type="text" placeholder="Навык" value=`` readonly).form__elem-input
        td.skill__value 
            .skill__name-input-wrapper
            label.form__elem.form__elem--number
                .form__elem-read {{skill.percent}} %                                                                          
            label.form__elem.form__elem--number
                input(type="number" min="0" max="100" placeholder="100" value=`` readonly).form__elem-input                                                                           
        td.skill__button
            button(type="button").button.button--edit
        td.skill__button                                      
            button(
                @click="removeExistedSkill"
                type="button"
            ).button.button--delete 
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: {
        skill: Object
    },
    methods: {
        ...mapActions('skills',['removeSkill']),
        async removeExistedSkill() {
            try {
                await this.removeSkill(this.skill.id);
            } catch (error) {
                //TODO: обработать ошибку
                console.log();
                
                alert('Произошла ошибка при удалении скила\n'+error.message);
            }
        }
    }
}
</script>
