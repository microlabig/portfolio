<template lang="pug">
    section.about
      .container
        .about__title
          .title
            h2.title Блок «Обо мне»
          .about__button-add
            button(type="button").button.button--add +
            button(type="button").about__button Добавить группу
        .groups
          ul.groups__list
            li.groups__item.groups__item--addgroup 
                form.form
                  .form__wrapper
                    .form__header
                      label.form__elem
                        .form__elem-container
                          input(type="text" placeholder="Название новой группы").form__elem-input
                          .form__elem-btns
                            button(type="button").button.button--apply
                            button(type="button").button.button--discard 
                    .form__footer
                      label.form__elem
                        .form__elem-container
                          input(type="text" placeholder="Новый навык").form__elem-input
                          .form__elem-percent
                            input(type="number" min="0" max="100" placeholder="100" value="100").form__elem-input
                          button(type="button").button.button--add +
            //                
              //-
                var skillsList = [
                    [
                      {type: "Workflow"},
                      [{text:"Git", value:"100"}, {text:"Terminal", value:"90"}, {text:"Gulp", value:"80"}, {text:"Webpack", value:"85"}]
                    ],
                    [
                      {type: "Frontend"},
                      [{text:"HTML5", value:"100"}, {text:"CSS", value:"90"}, {text:"JavaScript", value:"80"}, {text:"Jquery и Vue.js", value:"85"}]
                    ]
                  ];            
              each skill in skillsList

              li.groups__item.groups__item--group
                form.form
                  .form__wrapper
                    .form__header
                      label.form__elem
                        .form__elem-container
                          input(type="text" placeholder="Название новой группы" value=`${skill[0].type}`).form__elem-input
                          .form__elem-btns
                            button(type="button").button.button--edit 
                    .form__container
                      label.form-elem
                        .skill
                          ul.skill__list                        
                            li.skill__item
                              table.skill__table
                                each row in skill[1]
                                  tr.skill__table-row
                                    td.skill__name 
                                      .skill__name-input-wrapper.no-edit
                                        label.form__elem
                                          input(type="text" placeholder="Навык" value=`${row.text}` readonly).form__elem-input
                                    td.skill__value 
                                      .skill__name-input-wrapper.no-edit
                                        label.form__elem.form__elem--number
                                          input(type="number" min="0" max="100" placeholder="100" value=`${row.value}` readonly).form__elem-input                                                                           
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
