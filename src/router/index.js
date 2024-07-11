import Vue from "vue";
import Router from "vue-router";
// import ConsentForm from "../components/document/ConsentForm.vue";

//import Home from "./views/Home.vue";

Vue.use(Router);

const Home = () => import(/* webpackChunkName: "home" */ "@/views/Home.vue");
const About = () => import(/* webpackChunkName: "about" */ "@/views/About.vue");
const ConsentForm = () =>
  import(/* webpackChunkName: "ConsentForm" */ "@/views/ConsentForm.vue");
const Admin = () => import(/* webpackChunkName: "admin" */ "@/views/Admin.vue");
// const CovidOffice = () => import(/* webpackChunkName: "covidoffice" */ "@/views/CovidOffice.vue");
const NpForm = () =>
  import(/* webpackChunkName: "NpForm" */ "@/views/NpForm.vue");

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/consentform",
      name: "consentform",
      component: ConsentForm
    },
    {
      path: "/consentform/:id",
      name: "consentformid",
      component: ConsentForm
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin
    },
    // {
    //   path: "/covidoffice",
    //   name: "covidoffice",
    //   component: CovidOffice
    // },
    {
      path: "/npform",
      name: "npform",
      component: NpForm
    }
  ]
});
