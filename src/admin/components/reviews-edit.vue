<template lang="pug">
    form.form-edit.form-edit--reviews
        .form-edit__title-box
            h3.form-edit__title Новый отзыв
        .form-edit__wrapper
            .form-edit__left
                label.avatar-edit
                    .avatar-edit__image
                        input(
                            @change="appendFileAndRenderPhoto"
                            type='file'
                        ).avatar-change__file
                        .avatar__block--reviews
                            img(
                                v-if="renderedPhotoUrl.length === 0"
                                :src="photoURL" 
                                alt="Аватар"
                            ).avatar__image
                            .avatar__image.filled(
                                v-else                           
                                :style="{'backgroundImage' : `url(${this.renderedPhotoUrl})`}"
                            ) 
                    .form__tooltip.form__tooltip--photo(
                      :class="{'is-error': validation.hasError('reviewCopy.photo')}"
                    )
                      .form__tooltip-text {{validation.firstError('reviewCopy.photo')}}
                    .button.avatar-edit__button Изменить фото
            .form-edit__right
                form.form
                    .form__wrapper
                        .form__row.form__row--inputs
                            label(data-text="Имя автора").form__elem
                                .form__elem-container
                                    input(type="text" v-model="reviewCopy.author").form__elem-input
                                    .form__tooltip(
                                      :class="{'is-error': validation.hasError('reviewCopy.author')}"
                                    )
                                      .form__tooltip-text {{validation.firstError('reviewCopy.author')}}
                            label(data-text="Титул автора").form__elem
                                .form__elem-container
                                    input(type="text" v-model="reviewCopy.occ").form__elem-input
                                    .form__tooltip(
                                      :class="{'is-error': validation.hasError('reviewCopy.occ')}"
                                    )
                                      .form__tooltip-text {{validation.firstError('reviewCopy.occ')}}
                        .form__row.form__row--textarea 
                            label(data-text="Отзыв").form__elem
                                .form__elem-container.form__elem-container--message                        
                                    textarea(type="textarea" v-model="reviewCopy.text").form__elem-textarea 
                                    .form__tooltip.form__tooltip--textarea(
                                      :class="{'is-error': validation.hasError('reviewCopy.text')}"
                                    )
                                      .form__tooltip-text {{validation.firstError('reviewCopy.text')}}                    
                        .form__row.form__row--btns
                            label(data-text="").form__elem
                                .form__elem-container
                                    button(
                                        @click="cancelEditGroup"
                                        type="button"
                                    ).button.button--cancel Отмена
                                    button(
                                        @click="editExistedReview"
                                        type="submit"
                                    ).button.button--save Сохранить
</template>

<script>
import axios from "axios";
import { Validator } from "simple-vue-validator";
import { mapActions } from "vuex";
import { good, bad } from "@/helpers/tooltipDispath";

export default {
  mixins: [require("simple-vue-validator").mixin],

  validators: {
    'reviewCopy.author'(value) {
      return Validator.value(value).required("Поле не должно быть пустым");
    },
    'reviewCopy.occ'(value) {
      return Validator.value(value).required("Поле не должно быть пустым");
    },
    'reviewCopy.photo'(value) {
      return Validator.value(value).required("Изображение не должно быть пустым");
    },
    'reviewCopy.text'(value) {
      return Validator.value(value).required("Поле не должно быть пустым");
    }
  },

  props: {
    reviewEditedById: Object
  },

  data() {
    return {
      reviewCopy: {},
      renderedPhotoUrl: ""
    };
  },

  computed: {
    photoURL() {
      return axios.defaults.baseURL + this.reviewEditedById.photo;
    }
  },

  created() {
    this.reviewCopy = { ...this.reviewEditedById };
  },

  methods: {
    ...mapActions("reviews", ["editReview"]),
    ...mapActions("tooltip", ["showTooltip", "setColTooltip", "closeTooltip"]),

    cancelEditGroup() {
      this.$emit("cancelEditGroup");
    },

    async editExistedReview() {
      if ((await this.$validate()) === false) return;

      try {
        await this.editReview(this.reviewCopy);
        good(this, "Данные успешно отредактированы");
        this.$emit("editExistedReview");
      } catch (error) {
        bad(this, error);
      }
    },

    appendFileAndRenderPhoto(e) {
      this.uploadFile(e.target.files[0]);
    },

    uploadFile(file) {
      // метод заливки файла

      this.reviewCopy.photo = file;
      if (file) {
        // если выбрали файл
        // отрендерим файл
        const reader = new FileReader(); // создадим экземпляр чтения файла
        try {
          if (file.type !== "image/png" && file.type !== "image/jpeg") {
            // проверим тип файла
            throw new Error("Для загрузки используйте файлы изображений (PNG, JPG)");
          }
          if (file.size / 1024 / 1024 > 1.5) {
            // если файл больше 1.5 Мб
            throw new Error("Загружаемый файл больше 1.5 Мб");
          }
          reader.readAsDataURL(file); // прочитаем файл
          reader.onload = () => {
            this.renderedPhotoUrl = reader.result; // все что отрендерили - положить в renderedPhotoUrl
          };
        } catch (error) {
          bad(this, error);
        }
      }
    }
  }
};
</script>
