import login from "components/pages/login.vue";
import about from "components/pages/about.vue";
import reviews from "components/pages/reviews.vue";
import works from "components/pages/works.vue";


export default [
  {
    path: "/",
    component: about,
    meta: {
      title: "Блок «Обо мне»"
    }
  },
  {
    path: "/reviews",
    component: reviews,
    meta: {
      title: "Блок «Отзывы»"
    }
  },
  {
    path: "/login",
    component: login,
    meta: {
      public: true
    }
  },
  {
    path: "/works",
    component: works,
    meta: {
      title: "Блок «Работы»"
    }
  }
];


/* {
    path: "/work",
    component: work,
    meta: {
      title: "Блок «Работы»"
    }
  }  
  }, */