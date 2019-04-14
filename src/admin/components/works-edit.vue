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
                ).image-edit
                    input(
                        @change="appendFileAndRenderPhoto"
                        type='file'
                    ).image-load__file
                    .image-edit__image   
                        img(
                            v-if="renderedPhotoUrl.length === 0"
                            :src="urlPhoto"
                            alt="Работа"
                        ).image-icon 
                        .image-icon.filled(
                            v-else                           
                            :style="{'backgroundImage' : `url(${this.renderedPhotoUrl})`}"
                        )  
                    .button.image-edit__button Изменить превью
            .form-edit__side.form-edit__side--right
                form.form.form--works
                    .form__wrapper
                        .form__row
                          label(data-text="Название").form__elem
                            .form__elem-container
                              input(type="text" v-model="workCopy.title").form__elem-input
                              .form__tooltip(
                                :class="{'is-error': validation.hasError('workCopy.title')}"
                              )
                                .form__tooltip-text {{validation.firstError('workCopy.title')}}
                        .form__row
                          label(data-text="Ссылка").form__elem
                            .form__elem-container
                              input(type="text" v-model="workCopy.link").form__elem-input
                              .form__tooltip(
                                :class="{'is-error': validation.hasError('workCopy.link')}"
                              )
                                .form__tooltip-text {{validation.firstError('workCopy.link')}}
                        .form__row.form__row--textarea
                          label(data-text="Описание").form__elem
                            .form__elem-container
                              textarea(type="textarea" v-model="workCopy.description").form__elem-textarea
                              .form__tooltip.form__tooltip--textarea(
                                :class="{'is-error': validation.hasError('workCopy.description')}"
                              )
                                .form__tooltip-text {{validation.firstError('workCopy.description')}}
                        .form__row.form__row--tags
                          label(data-text="Добавление тега (разделение запятая \",\")").form__elem
                            .form__elem-container
                              input(type="text" v-model="workCopy.techs").form__elem-input
                              .form__tooltip(
                                :class="{'is-error': validation.hasError('workCopy.techs')}"
                              )
                                .form__tooltip-text {{validation.firstError('workCopy.techs')}}
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
                                    @click="cancelEditGroup"
                                    type="button"
                                ).button.button--cancel Отмена
                                button(
                                    @click="editExistedWork"
                                    type="submit"
                                ).button.button--save Сохранить
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
import { good, bad } from "@/helpers/tooltipDispath";
import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],

  validators: {
    'workCopy.title'(value) {
      return Validator.value(value).required("Поле не должно быть пустым");
    },
    'workCopy.link'(value) {
      return Validator.value(value).required("Поле не должно быть пустым");
    },
    'workCopy.description'(value) {
      return Validator.value(value).required("Поле не должно быть пустым");
    },
    'workCopy.techs'(value) {
      return Validator.value(value).required("Поле не должно быть пустым");
    }

  },

  props: {
    workEditedById: Object
  },

  data() {
    return {
      workCopy: {},
      renderedPhotoUrl: "",
      isDrag: false
    };
  },

  computed: {
    urlPhoto() {
      return axios.defaults.baseURL + this.workEditedById.photo;
    },

    tags() {
      return this.workCopy.techs.split(",");
    }
  },

  created() {
    this.workCopy = { ...this.workEditedById };
  },

  methods: {
    ...mapActions("works", ["editWork"]),
    ...mapActions("tooltip", ["showTooltip", "setColTooltip", "closeTooltip"]),

    cancelEditGroup() {
      this.$emit("cancelEditGroup");
    },

    appendFileAndRenderPhoto(e) {
      this.uploadFile(e.target.files[0]);
    },

    uploadFile(file) {
      // метод заливки файла
      this.workCopy.photo = file;
      if (file) {
        // если выбрали файл
        // отрендерим файл
        const reader = new FileReader(); // создадим экземпляр чтения файла
        try {
          if (file.type !== "image/png" && file.type !== "image/jpeg") {
            // проверим тип файла
            throw new Error(
              "Для загрузки используйте файлы изображений (PNG, JPG)"
            );
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

    async editExistedWork() {
      if ((await this.$validate()) === false) return;

      try {
        await this.editWork(this.workCopy);

        good(this, "Данные успешно отредактированы");

        this.$emit("editExistedWork");
      } catch (error) {
        bad(this, error);
      }
    },

    tagDelete(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      this.workCopy.techs = this.tags.join(",");
    },

    dropCb(e) {
      this.isDrag = false;
      this.uploadFile(e.dataTransfer.files[0]);
    }
  }
};
</script>
