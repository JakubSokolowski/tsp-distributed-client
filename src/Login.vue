<template>
  <div>
    <Menu/>
    <form>
      <input id="username" type="text" v-model="user.username" required>
      <label for="username">Login:</label>
      <input id="nickname" type="password" v-model="user.password" required>
      <label for="nickname">Hasło:</label>
      <input type="button" @click="login" value="Zaloguj">
    </form>
    <div v-if="comunicats.length > 0" class="Content">
      <div class="Comunicats">
        <p
          v-for="(Comunicat,index) in comunicats"
          v-bind:key="'AdministratorPanel'+ index + Comunicat"
        >{{Comunicat}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import DataAccess from "@/components/DataAccess.js"
import Menu from "@/components/Menu.vue";
import { error } from "util";
export default {
  name: "Logowanie",
  components: {
    Menu
  },
  data: function() {
    return {
      user: {
        username: "",
        password: ""
      },
      comunicats: []
    };
  },
  methods: {
    login() {
      DataAccess.login(this.user)
        .then(response => {
          console.log(response.data);
          
            this.$store.dispatch("loginAction", this.user);
            this.$store.dispatch("setRoleAction", response.data);
            this.comunicats = [];
            this.comunicats.push("Udało się zalogować!");
            this.$router.go();
        })
        .catch(error => {
          this.comunicats = [];
          this.comunicats.push("Nie udało się zalogować!");
        });
    }
  }
};
</script>


<style scoped>
label {
  position: absolute;
  transform: translate(0, -16px);
}
input:focus + label {
  transform: translate(0, -40px);
  color: cornflowerblue;
}
input:valid + label {
  transform: translate(0, -40px);
}
legend {
  text-align: center;
}
fieldset {
  border: none;
}
form {
  padding: 10px;
  border: solid 2px darkblue;
  box-shadow: 0px 0px 10px darkblue;
  background-color: rgba(0, 0, 0, 0.7);
  color: blue;
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
input[type="text"],
input[type="password"] {
  margin-top: 18px;
  font-size: 18px;
  cursor: none;
  border: none;
  border-bottom: 1px solid darkblue;
  background: transparent;
  width: 100%;
  color: white;
}
input[type="button"] {
  margin-top: 10px;
  display: block;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(0, 0, 255, 0.7);
  color: black;
  border: none;
}
input[type="button"]:hover {
  color: cornflowerblue;
}
* {
  outline: none;
}
.Comunicats {
  border: solid 2px darkblue;
  box-shadow: 0px 0px 10px darkblue;
  background-color: rgba(0, 0, 0, 0.7);
  color: blue;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
.Content {
  padding: 5px;
}
</style>

