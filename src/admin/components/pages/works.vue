<template lang="pug">
    section.works
        .container
          .works__title
            .title
              h2.title Блок «Работы»  
          works-add(
            v-if="showAddingForm === true"
            @cancelAddNewGroup="cancelAddNewGroupForm" 
            @addNewWork="addNewWork"          
          )
          works-edit(
            v-if="showEditingForm === true"
            @cancelEditGroup="cancelEditExistedGroupForm" 
            :workEditedById="workEditedById" 
            @editExistedWork="editExistedWork"             
          )          

          .works__listwrapper
            ul.works__list 
              works-add-button(
                @addNewWorkGroup="addNewWorkGroupForm"
              )                         
              works-group(
                v-for="work in works"
                :key="work.id"
                :work="work"      
                @editWorkGroup="editExistedWorkGroupForm"                          
              )

</template>


<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { good, bad } from "@/helpers/tooltipDispath";

export default {
  components: {
    worksEdit: () => import("components/works-edit.vue"),
    worksAdd: () => import("components/works-add.vue"),
    worksGroup: () => import("components/works-group.vue"),
    worksAddButton: () => import("components/works-addButton.vue")
  },
  data() {
    return {
      showAddingForm: false,
      showEditingForm: false,
      workEditedById: {}
    };
  },
  computed: {
    ...mapGetters("works", ["getWorks"]),
    ...mapState("works", {
      // добавим дополнительное свойство из данных в store 'categories'
      works: state => state.works
    })
  },
  async created() {
    // получим список отзывов из сервера
    try {
      await this.fetchWorks();
      good(this, "Данные успешно загружены");
    } catch (error) {
      bad(this, error);
    }
  },
  methods: {
    ...mapActions("works", ["fetchWorks"]),
    ...mapActions("tooltip", ["showTooltip", "setColTooltip", "closeTooltip"]),

    addNewWorkGroupForm() {
      this.showAddingForm = true;
      this.showEditingForm = false;
    },
    cancelAddNewGroupForm() {
      this.showAddingForm = false;
    },
    editExistedWorkGroupForm(work_ID) {
      this.showAddingForm = false;
      this.showEditingForm = true;
      this.works.forEach(item => {
        if (item.id === work_ID) {
          this.workEditedById = item;
        }
      });
    },
    cancelEditExistedGroupForm() {
      this.showEditingForm = false;
    },

    addNewWork() {
      this.showAddingForm = false;
    },
    editExistedWork(work) {
      this.showEditingForm = false;
    }
  }
};
</script>
