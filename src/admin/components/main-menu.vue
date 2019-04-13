<template lang="pug">
    .main-menu
      nav.menu
        ul.menu__list          
          li.menu__item(v-for="tab in tabs")
            router-link(
              :data-text="tab.title" 
              :to="tab.href"
              exact-active-class="active"
            ).menu__link {{tab.title}}
</template>

<script>
  export default {
    data() {
      return {
        tabs: [
          { title: "Обо мне", href: "/" },          
          { title: "Работы", href: "/works" },
          { title: "Отзывы", href: "/reviews" }
        ]
      };
    }
  };
</script>
