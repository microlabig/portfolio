<template lang="pug">
    li.works__item      
      .works__image
          img(:src="`${urlPhoto}`" alt="Изображение работы").works__icon 
          .works__tags
              ul.works__tag-list
                  li(
                    v-for="tag in tags"
                  ).works__tag-item
                      .works__tag {{tag}}
      .works__description 
          .works__description-box
              .works__title {{work.title}}
              .works__text {{work.description}}
              a(:href="work.link" target="blank").works__link {{work.link}}
          .btns-wrap
              .btns(
                  @click="editWorkGroup"
                  data-text="Править"
              )
                  button(type="button").button.button--edit                         
              .btns(data-text="Удалить")
                  button(
                    @click="removeExistedWork(work.id)"
                    type="button"
                  ).button.button--discard   
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  props: {
    work: Object
  },  
  computed: {
    urlPhoto() {
      return axios.defaults.baseURL+this.work.photo
    },
    tags() {
      return this.work.techs.split(' ');
    }
  },
  methods: {
    ...mapActions("works", ["removeWork"]),

    editWorkGroup() {
      this.$emit("editWorkGroup",this.work.id);
    },
    
    async removeExistedWork(workId) {
      try {
        await this.removeWork(workId);
      } catch (error) {
        // TODO: обработать ошибку
        alert("Произошла ошибка при удалении ревью");
      }
    }
  }
};
</script>
