<template>
  <div>
    <Menu/>
    <div class="Content">
      <p>Zmiana hasła</p>
      <div>
        Stare hasło:
        <input type="password" v-model="oldPassword">
      </div>
      <div>
        Nowe hasło:
        <input type="password" v-model="newPassword">
      </div>
      <div>
        <input type="button" value="Edytuj hasło" @click="changePassword">
      </div>
      
    </div>
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
.Content {
  padding: 5px;
}
.Content p {
  display: block;
  border-style: none none solid none;
  border-bottom-color: darkgreen;
  color: darkgreen;
}
</style>

