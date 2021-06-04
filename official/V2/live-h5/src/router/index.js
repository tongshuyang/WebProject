const Vue = Yox.Vue;
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Home = () => import("../pages/home");
const List = () => import("../pages/list");


const routes = [{
    path: "/",
    name: "list",
    component: List,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
];

const router = new VueRouter({
  mode: "hash",

  routes,
});



export default router;
