<template lang="pug">
    form.form
        .form__wrapper
            .form__header
                label.form__elem
                    .form__elem-container
                        input(type="text" placeholder="Название новой группы" value=``).form__elem-input
                        .form__elem-btns
                            button(type="button").button.button--edit 
            .form__container
                label.form-elem
                    .skill
                        ul.skill__list                        
                            li.skill__item
                                table.skill__table
                                    tr.skill__table-row
                                        td.skill__name 
                                            .skill__name-input-wrapper.no-edit
                                            label.form__elem
                                                input(type="text" placeholder="Навык" value=`` readonly).form__elem-input
                                        td.skill__value 
                                            .skill__name-input-wrapper.no-edit
                                            label.form__elem.form__elem--number
                                                input(type="number" min="0" max="100" placeholder="100" value=`` readonly).form__elem-input                                                                           
                                        td.skill__button
                                            button(type="button").button.button--edit
                                        td.skill__button                                      
                                            button(type="button").button.button--delete 
            .form__footer
                label.form__elem
                    .form__elem-container
                        input(type="text" placeholder="Новый навык").form__elem-input
                        .form__elem-percent
                            input(type="number" min="0" max="100" placeholder="100" value="100").form__elem-input
                        button(type="button").button.button--add +
</template>
