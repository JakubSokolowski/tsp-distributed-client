<template>
  <div>
    <Menu/>
    <div class="Content">
      <div>
        Login:
        <input type:text v-model="user.username">
      </div>

      <div>
        Hasło:
        <input type="password" v-model="user.password">
      </div>

      <div>
        <input type="button" @click="register" value="Rejestruj">
      </div>
      <p
        v-for="(Comunicat,index) in comunicats"
        v-bind:key="'RegistrationByCustomer'+ index + Comunicat"
      >{{Comunicat}}</p>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import DataAccess from "@/components/DataAccess.js";
export default {
  name: "RegistrationUser",
  components: {
    Menu
  },
  data: function() {
    return {
      user: {
        username: "",
        password: "",
        enabled: true
      },
      comunicats: []
    };
  },
  methods: {
    register() {
      DataAccess.addUser(this.user)
        .then(response => {
          this.comunicats = [];
          this.registerComplete();
          this.comunicats.push(response.data);
        })
        .catch(error => {
          this.comunicats = [];
          for (var propName in error.response.data) {
            this.comunicats.push(error.response.data[propName]);
          }
        });
    },
    registerComplete() {
      this.user = {
        username: "",
        password: "",
        enabled: true
      };
    }
  }
};
</script>


<style scoped>
.Content {
  padding: 5px;
}
</style>

