import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Process from "../views/Process.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/process/:name",
    name: "Process",
    component: Process,
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
