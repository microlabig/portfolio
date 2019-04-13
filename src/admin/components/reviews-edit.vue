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
                    .button.avatar-edit__button Изменить фото
            .form-edit__right
                form.form
                    .form__wrapper
                        .form__row.form__row--inputs
                            label(data-text="Имя автора").form__elem
                                .form__elem-container
                                    input(type="text" v-model="reviewCopy.author").form__elem-input
                            label(data-text="Титул автора").form__elem
                                .form__elem-container
                                    input(type="text" v-model="reviewCopy.occ").form__elem-input
                        .form__row.form__row--textarea 
                            label(data-text="Отзыв").form__elem
                                .form__elem-container.form__elem-container--message                        
                                    textarea(type="textarea" v-model="reviewCopy.text").form__elem-textarea                   
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
import { mapActions } from "vuex";

export default {
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

    cancelEditGroup() {
      this.$emit("cancelEditGroup");
    },

    async editExistedReview() {
      try {
        await this.editReview(this.reviewCopy);
        this.$emit("editExistedReview");
      } catch (error) {
        // TODO: обработать ошибку
        alert("Произошла ошибка при изменении отзыва");
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
          if (file.type !== "image/png" && file.type !== "image/jpeg") { // проверим тип файла
            throw new Error(
              "Для загрузки используйте файлы изображений (PNG, JPG)"
            );
          }
          if (file.size / 1024 / 1024 > 1.5) { // если файл больше 1.5 Мб
            throw new Error("Загружаемый файл больше 1.5 Мб");
          }
          reader.readAsDataURL(file); // прочитаем файл
          reader.onload = () => {
            this.renderedPhotoUrl = reader.result; // все что отрендерили - положить в renderedPhotoUrl
          };
        } catch (error) {
          // TODO: обработать ошибку
          alert(error);
        }
      }
    }
  }
};
</script>
