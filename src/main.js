import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Login from "./Login.vue";
import NotAccess from "./NotAccess.vue";
import Logout from "./Logout.vue";
import UserIsLogin from "./UserIsLogin.vue";
import UserIsLogout from "./UserIsLogout.vue";
import EditDataOfUser from "./EditDataOfUser.vue";
import RegistrationUser from "./RegistrationUser.vue";
import { store } from "./store.js"

Vue.use(VueRouter);

const routes = [
  {
    path: "/login", get component() {
      if (store.getters.isLoged != true) {
        return Login;
      } else {
        return UserIsLogin;
      }
    }
  },
  {
    path: "/wyloguj", get component() {
      if (store.getters.isLoged != true) {
        return UserIsLogout;
      } else {
        return Logout;
      }
    }
  },
  {
    path: "/", get component() {
      if (store.getters.isLoged == true) {
        return EditDataOfUser;
      } else {
        return NotAccess;
      }
    }
  },
  {
    path: "/edytujDane", get component() {
      if (store.getters.isLoged == true) {
        return EditDataOfUser;
      } else {
        return NotAccess;
      }
    }
  },
  {
    path: "/rejestracja", get component() {
      if (store.getters.isLoged == true) {
        return NotAccess;
      } else {
        return RegistrationUser;
      }
    }
  }
];
const router = new VueRouter({
  routes,
  mode: "history"
})


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
