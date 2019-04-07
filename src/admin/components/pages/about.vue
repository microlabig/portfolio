<template lang="pug">
    section.about
      .container
        .about__title
          .title
            h2.title Блок «Обо мне»
          div(
            v-if="showAddingForm === false"
            @click="showAddingForm = true"
          ).about__button-add
            button(type="button").button.button--add +
            button(type="button").about__button Добавить группу
        .groups
          ul.groups__list
            li.groups__item.groups__item--addgroup(v-if="showAddingForm")
              skillsAdd(
                
              )
            li.groups__item.groups__item--group(v-if="false")
              skillsGroup()            
</template>

<script>
export default {
    components: {
        skillsAdd: () => import('components/skills-add.vue'),
        skillsGroup: () => import('components/skills-group.vue'),
        
    },
    data() {
      return {
        showAddingForm: false
      }
    }  
}
</script>
