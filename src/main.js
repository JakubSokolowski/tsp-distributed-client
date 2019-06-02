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
import AdministratorPanel from "./AdministratorPanel.vue";
import Problems from "./Problems.vue";
import FileUpload from "./FileUpload.vue"
import { store } from "./store.js"

Vue.use(VueRouter);

const routes = [
  {
    path: "/login", get component() {
      if (store.getters.role === "UNREGISTER") {
        return Login;
      } else {
        return UserIsLogin;
      }
    }
  },
  {
    path: "/wyloguj", get component() {
      if (store.getters.role === "UNREGISTER") {
        return UserIsLogout;
      } else {
        return Logout;
      }
    }
  },
  {
    path: "/", get component() {
      if (store.getters.role === "ADMIN") {
        return AdministratorPanel;
      }else if(store.getters.role === "USER")
      {
        return Problems;
      }
      else {
        return Login;
      }
    }
  },
  {
    path: "/edytujDane", get component() {
      if (store.getters.role === "UNREGISTER") {
        return NotAccess;
      } else {
        return EditDataOfUser;
      }
    }
  },
  {
    path: "/problemy", get component() {
      if (store.getters.role === "USER") {
        return Problems;
      } else {
        return NotAccess;
      }
    }
  },
  {
    path: "/panel", get component() {
      if (store.getters.role === "ADMIN") {
        return AdministratorPanel;
      } else {
        return NotAccess;
      }
    }
  },
  {
    path: "/przeslijPlik", get component() {
      if (store.getters.role === "USER") {
        return FileUpload;
      } else {
        return NotAccess;
      }
    }
  },
  {
    path: "/rejestracja", get component() {
      if (store.getters.role === "UNREGISTER") {
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
