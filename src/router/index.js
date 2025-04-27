import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/todo",
    name: "todo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/todoList.vue"),
  },
  {
    path: "/project",
    name: "project",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/projectManagement.vue"),
  },
  {
    path: "/finance",
    name: "finance",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/moneyTracker.vue"),
  },
  {
    path: "/mail",
    name: "mail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/mail.vue"), 
  },
  {
    path: "/chat",
    name: "chat",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/chat.vue"), 
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
