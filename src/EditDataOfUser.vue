<template>
  <div>
    <Menu/>
    <form>
      <fieldset>
      <legend>Zmiana hasła</legend>
      <div>
        Stare hasło:
        <input id="password" type="password" v-model="oldPassword">
      </div>
      <div>
        Nowe hasło:
        <input type="password" v-model="newPassword">
      </div>
      <div>
        <input type="button" value="Edytuj hasło" @click="changePassword">
      </div>
      </fieldset>
    </form>
    <p
        v-for="(Comunicat,index) in comunicats"
        v-bind:key="'EditDataByEmployee'+ index + Comunicat"
      >{{Comunicat}}</p>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import DataAccess from "@/components/DataAccess.js";
export default {
  name: "EditDataOfUser",
  components: {
    Menu
  },
  mounted() {
    
  },
  data: function() {
    return {
      oldPassword: "",
      newPassword: "",
      comunicats: []
    };
  },
  methods: {
    changePassword() {
      DataAccess.updatePassword(this.oldPassword, this.newPassword)
        .then(response => {
          this.comunicats = [];
          this.comunicats.push(response.data);
          this.$store.dispatch('changePassword',this.newPassword);
        })
        .catch(error => {
          this.comunicats = [];
          for (var propName in error.response.data) {
            this.comunicats.push(error.response.data[propName]);
          }
        });
    }
  }
};
</script>


<style scoped>
fieldset{
  border: none;
}
form{
  border: solid 2px darkblue;
  box-shadow: 0px 0px 10px darkblue;
  background-color: rgba(0,0,0,0.7);
  color: blue;
  width: 30%;
  margin-left:auto; 
  margin-right:auto;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
}
input[type="text"],input[type="password"]{
  border: none;
  border-bottom: 1px solid darkblue;
  background: transparent;
  width: 100%;
  color: white;
}
input[type="button"]
{
  margin-top: 10px;
  display: block;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(0,0,255,0.7);
  border: none;
}
*{
  outline: none;
}
</style>

