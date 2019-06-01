<template>
  <div>
    <Menu/>
    <form>
        <input id="login" type="text" v-model="user.username" required>
        <label for="login">Login:</label>
        <input id="password" type="password" v-model="user.password" required>
        <label for="password">Hasło:</label>
        <input type="button" @click="register" value="Rejestruj">
    </form>
    <p
        v-for="(Comunicat,index) in comunicats"
        v-bind:key="'RegistrationByCustomer'+ index + Comunicat"
      >{{Comunicat}}</p>
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
label{
  position: absolute;
  transform: translate(0,-16px);
}
input:focus + label
{
  transform: translate(0,-40px);
  color: cornflowerblue;
}
input:valid + label
{
  transform: translate(0,-40px);
}
legend{
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
</style>
