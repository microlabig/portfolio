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
                @addSkillGroup="showAddingForm = false"
                @cancelAddingSkillGroup="showAddingForm = false"           
              )              
            li.groups__item.groups__item--group(
              v-for="category in categories"
              :key="category.id"
            )
              skillsGroup(
                :category="category"
                :skills="filterSkillsByCategoryId(category.id)"
              )            
</template>

<script>
import { mapActions, mapState } from "vuex";
import { good, bad } from "@/helpers/tooltipDispath";

export default {
  components: {
    skillsAdd: () => import("components/skills-add.vue"),
    skillsGroup: () => import("components/skills-group.vue")
  },

  data() {
    return {
      showAddingForm: false
    };
  },

  computed: {
    ...mapState("categories", {
      // добавим дополнительное свойство из данных в store 'categories'
      categories: state => state.categories
    }),
    ...mapState("skills", {
      // добавим дополнительное свойство из данных в store 'categories'
      skills: state => state.skills
    })
  },

  methods: {
    ...mapActions("categories", ["fetchCategories"]),
    ...mapActions("skills", ["fetchSkills"]),
    ...mapActions("tooltip", ["showTooltip", "setColTooltip", "closeTooltip"]),

    // метод сортировки принятых скилов в зависимости от id категории
    filterSkillsByCategoryId(categoryId) {
      return this.skills.filter(skill => skill.category === categoryId);
    }
  },

  async created() {
    try {
      await this.fetchCategories();
      good(this, "Данные успешно загружены");
    } catch (error) {
      bad(this, error);
    }

    try {
      await this.fetchSkills();
      good(this, "Данные успешно загружены");
    } catch (error) {
      bad(this, error);
    }
  }
};
</script>
