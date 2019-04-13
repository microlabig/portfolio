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
                    .button.avatar-load__button Добавить фото                
            .form-edit__right
                form.form
                    .form__wrapper
                        .form__row.form__row--inputs
                            label(data-text="Имя автора").form__elem
                                .form__elem-container
                                    input(type="text" v-model="review.author").form__elem-input
                            label(data-text="Титул автора").form__elem
                                .form__elem-container
                                    input(type="text" v-model="review.occ").form__elem-input
                        .form__row.form__row--textarea 
                            label(data-text="Отзыв").form__elem
                                .form__elem-container.form__elem-container--message                        
                                    textarea(type="textarea" v-model="review.text").form__elem-textarea                   
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

export default {
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
          // TODO: обработать ошибку
          alert(error);
        }
      }
    },
    async addNewReview() {
      try {
        await this.addReview(this.review);
        this.$emit("addNewReview");
      } catch (error) {
        // TODO: обработать ошибку
        alert("Произошла ошибка при загрузке отзыва");
      }
    }
  }
};
</script>
