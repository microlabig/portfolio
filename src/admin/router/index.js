import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";

import login from "components/pages/login.vue";
import about from "components/pages/about.vue";
//import work from "components/pages/work.vue";
//import reviews from "components/pages/reviews.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: about,
    meta: {
      title: "Блок «Обо мне»"
    }
  },
  {
    path: "/login",
    component: login,
    meta: {
      public: true
    }
  }
];

const router = new VueRouter({ routes });

export default router;



/* {
    path: "/work",
    component: work,
    meta: {
      title: "Блок «Работы»"
    }
  },
  {
    path: "/reviews",
    component: reviews,
    meta: {
      title: "Блок «Отзывы»"
    }
  }, */