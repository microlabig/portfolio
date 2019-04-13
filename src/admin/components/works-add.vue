<template lang="pug">
    form.form-edit
        .form-edit__title-box
            h3.form-edit__title Редактирование работы
        .form-edit__wrapper
            .form-edit__side.form-edit__side--left
                label(
                    :class="{'is-dragged': isDrag}"
                    @dragover.prevent="isDrag = true"
                    @dragleave.prevent="isDrag = false"
                    @drop.prevent="dropCb"
                ).image-load
                    input(
                        @change="appendFileAndRenderPhoto"
                        type='file'
                    ).image-load__file
                    .image-load__title Перетащите или загрузите #[span.span-block] для загрузки изображения
                    .image-loaded
                        .image-icon(
                            :class="{'filled' : this.renderedPhotoUrl.length}",
                            :style="{'backgroundImage' : `url(${this.renderedPhotoUrl})`}"
                        )                        
                    .button.image-load__button Загрузить                
            .form-edit__side.form-edit__side--right
                form.form.form--works
                    .form__wrapper
                        .form__row
                            label(data-text="Название").form__elem
                                .form__elem-container
                                    input(type="text" v-model="work.title").form__elem-input
                        .form__row
                            label(data-text="Ссылка").form__elem
                                .form__elem-container
                                    input(type="text" v-model="work.link").form__elem-input
                        .form__row.form__row--textarea
                            label(data-text="Описание").form__elem
                                .form__elem-container
                                    textarea(type="textarea" v-model="work.description").form__elem-textarea
                        .form__row.form__row--tags
                            label(data-text="Добавление тега").form__elem
                                .form__elem-container
                                    input(type="text" v-model="work.techs").form__elem-input
                                    ul(
                                        v-if="tags.length>0"
                                    ).form__list.form__list--tags                                    
                                        li(                                            
                                            v-for="tag in tags"
                                            v-if="tag"
                                        ).form__item
                                            button(type="button").button.button--tag {{tag}}
                                            .button-tagdelete
                                                button(
                                                    @click="tagDelete(tag)"
                                                    type="button"
                                                ).button.button--discard
                        .form__row.form__row--btns
                            label(data-text="").form__elem
                            .form__elem-container.form__elem-container--btns
                                button(
                                    @click="cancelAddNewGroup"
                                    type="button"
                                ).button.button--cancel Отмена
                                button(
                                    @click="addNewWork"
                                    type="submit"
                                ).button.button--save Сохранить
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      work: {
        title: "",
        techs: "",
        link: "",
        photo: "",
        description: ""
      },
      renderedPhotoUrl: "",
      isDrag: false
    };
  },
  computed: {
    tags() {
      return this.work.techs.split(" ");
    }
  },
  methods: {
    ...mapActions("works", ["addWork"]),

    cancelAddNewGroup() {
      this.$emit("cancelAddNewGroup");
    },

    appendFileAndRenderPhoto(e) {
      this.uploadFile(e.target.files[0]);
    },

    async addNewWork() {
      try {
        await this.addWork(this.work);
        this.$emit("addNewWork");
      } catch (error) {
        // TODO: обработать ошибку
        alert("Произошла ошибка при загрузке отзыва");
      }
    },

    tagDelete(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      this.work.techs = this.tags.join(" ");
    },

    dropCb(e) {
      this.isDrag = false;
      this.uploadFile(e.dataTransfer.files[0]);
    },

    uploadFile(file) {
      // метод заливки файла
      this.work.photo = file;

      if (file) {
        // если выбрали файл
        // отрендерим файл
        const reader = new FileReader(); // создадим экземпляр чтения файла
        try {
          if (file.type !== "image/png" && file.type !== "image/jpeg") { // проверим тип файла
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
    }
  }
};
</script>
