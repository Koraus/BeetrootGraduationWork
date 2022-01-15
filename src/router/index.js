import Vue from "vue";
import VueRouter from "vue-router";
import CataloguePage from "../pages/CataloguePage"


Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/CataloguePage",
    name: "catalogue",
    component: CataloguePage,
  },

];

const router = new VueRouter({
  routes,
});

export default router;
