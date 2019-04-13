<template lang="pug">  
  div.root-wrapper-container
    template(v-if="$route.meta.public")
        router-view 
    template(v-else)   
      app-header
      main-menu

      main.maincontent__admin
        router-view
    tooltip

</template>




<script>
  import login from './components/pages/login.vue';
  import appHeader from './components/header.vue';
  import mainMenu from './components/main-menu.vue';
  import tooltip from './components/tooltip.vue';


  export default {
    components: {
      appHeader, mainMenu, login, tooltip
    }
  }

</script>




<style lang="pcss">

@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";

@import "../styles/blocks/animations.pcss";
@import "../styles/blocks/menu.pcss";
@import "../styles/blocks/tooltip.pcss";
@import "../styles/blocks/modal.pcss";

@import "../styles/admin/**/*.pcss";

</style>