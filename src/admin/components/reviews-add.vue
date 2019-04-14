<template lang="pug">
    form.form-edit.form-edit--reviews
        .form-edit__title-box
            h3.form-edit__title Новый отзыв
        .form-edit__wrapper
            .form-edit__left
                label.avatar-load
                    .avatar-load__image
                        input(
                            @change="appendFileAndRenderPhoto"
                            type='file'
                        ).avatar-change__file                        
                        .avatar__block--reviews
                            .avatar__image(
                                :class="{'filled' : this.renderedPhotoUrl.length}",
                                :style="{'backgroundImage' : `url(${this.renderedPhotoUrl})`}"
                            )                    
                    .form__tooltip.form__tooltip--photo(
                      :class="{'is-error': validation.hasError('review.photo')}"
                    )
                      .form__tooltip-text {{validation.firstError('review.photo')}}
                    .button.avatar-load__button Добавить фото 
                                   
            .form-edit__right
                form.form
                    .form__wrapper
                        .form__row.form__row--inputs
                            label(data-text="Имя автора").form__elem
                                .form__elem-container
                                    input(type="text" v-model="review.author").form__elem-input
                                    .form__tooltip(
                                      :class="{'is-error': validation.hasError('review.author')}"
                                    )
                                      .form__tooltip-text {{validation.firstError('review.author')}}
                            label(data-text="Титул автора").form__elem
                                .form__elem-container
                                    input(type="text" v-model="review.occ").form__elem-input
                                    .form__tooltip(
                                      :class="{'is-error': validation.hasError('review.occ')}"
                                    )
                                      .form__tooltip-text {{validation.firstError('review.occ')}}
                        .form__row.form__row--textarea 
                            label(data-text="Отзыв").form__elem
                                .form__elem-container.form__elem-container--message                        
                                    textarea(type="textarea" v-model="review.text").form__elem-textarea
                                    .form__tooltip.form__tooltip--textarea(
                                      :class="{'is-error': validation.hasError('review.text')}"
                                    )
                                      .form__tooltip-text {{validation.firstError('review.text')}}                   
                        .form__row.form__row--btns
                            label(data-text="").form__elem
                                .form__elem-container
                                    button(
                                        @click="cancelAddNewGroup"
                                        type="button"
                                    ).button.button--cancel Отмена
                                    button(
                                        @click="addNewReview"
                                        type="submit"
                                    ).button.button--save Сохранить
</template>

<script>
import { mapActions } from "vuex";
import { Validator } from "simple-vue-validator";
import { good, bad } from "@/helpers/tooltipDispath";

export default {

  mixins: [require("simple-vue-validator").mixin],

  validators: {
    'review.author'(value) {
      return Validator.value(value).required("Поле не должно быть пустым");
    },
    'review.occ'(value) {
      return Validator.value(value).required("Поле не должно быть пустым");
    },
    'review.photo'(value) {
      return Validator.value(value).required("Изображение не должно быть пустым");
    },
    'review.text'(value) {
      return Validator.value(value).required("Поле не должно быть пустым");
    }
  },

  data() {
    return {
      review: {
        photo: "",
        author: "",
        occ: "",
        text: ""
      },
      renderedPhotoUrl: ""
    };
  },

  methods: {
    ...mapActions("reviews", ["addReview"]),
    ...mapActions("tooltip", ["showTooltip", "setColTooltip", "closeTooltip"]),

    cancelAddNewGroup() {
      this.$emit("cancelAddNewGroup");
    },

    // кодирование изображения в base64, его рендер
    appendFileAndRenderPhoto(e) {
      // возьмем данные из файла
      const file = e.target.files[0];
      this.review.photo = file;

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
    },

    async addNewReview() {
      if ((await this.$validate()) === false) return;

      try {
        await this.addReview(this.review);
        good(this, "Отзыв успешно загружен");
        this.$emit("addNewReview");                
      } catch (error) {
        bad(this, error);
      }
    }
  }
};
</script>
