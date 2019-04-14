<template lang="pug"> 
    form.form
        .form__wrapper
            .form__header
                label(
                    :class="{'is-error': validation.hasError('skillGroupTitle')}"
                ).form__elem
                    .form__elem-container
                        input(
                            v-model="skillGroupTitle" 
                            type="text"                             
                            placeholder="Название новой группы"
                        ).form__elem-input
                        .form__tooltip
                            .form__tooltip-text {{validation.firstError('skillGroupTitle')}}
                        .form__elem-btns
                            button(
                                @click="addSkillGroup" 
                                type="button"
                            ).button.button--apply
                            button(
                                @click="cancelAddingSkillGroup"
                                type="button"
                            ).button.button--discard 
            
</template>


<script>
import { mapActions } from "vuex";
import { Validator } from "simple-vue-validator";
import { good, bad } from "@/helpers/tooltipDispath";

export default {
  mixins: [require("simple-vue-validator").mixin],

  validators: {
    skillGroupTitle(value) {
      return Validator.value(value).required("Поле не должно быть пустым");
    }
  },

  props: {
    skill: Object
  },

  data() {
    return {
      skillGroupTitle: ""
    };
  },

  methods: {
    ...mapActions("categories", ["addNewSkillGroup","fetchCategories"]),
    ...mapActions("tooltip", ["showTooltip", "setColTooltip", "closeTooltip"]),

    async addSkillGroup() {
      if ((await this.$validate()) === false) return;

      try {
        await this.addNewSkillGroup(this.skillGroupTitle);
        this.skillGroupTitle = "";
        this.validation.reset();

        try {
          await this.fetchCategories();
        } catch (error) {
          bad(this, error);
        }

        good(this, "Группа успешно создана"); 

        this.$emit("addSkillGroup");
      } catch (error) {
        bad(this, error);
      }
    },

    cancelAddingSkillGroup() {
      this.$emit("cancelAddingSkillGroup");
    }
  }
};
</script>
