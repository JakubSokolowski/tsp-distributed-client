<template>
  <div id="app">
    <div v-if="isLoged" class="Menu">
      <router-link class="itemMenu" to="/przeslijPlik">Prześlij plik</router-link>
      <router-link class="itemMenu" to="/wprowadzDane">Rozwiąż instancje TSP</router-link>
      <router-link class="itemMenu" to="/edytujDane">Edytuj dane</router-link>
      <router-link class="itemMenu" to="/wyloguj">Wyloguj</router-link>
    </div>
    <div v-if="!isLoged" id="menuForEmployee" class="Menu">
      \<router-link class="itemMenu" to="/rejestracja">Rejestracja</router-link>
      <router-link class="itemMenu" to="/login">Zaloguj</router-link>
    </div>
    <div class="GapBar"></div>
  </div>
</template>

<script>
export default {
  name: "Menu",
  computed:{
    username() {
      return this.$store.getters.username;
    },
    isLoged() {
      return this.$store.getters.isLoged;
    }
  }
};
</script>


<style scoped>
.itemMenu {
  background-color: green;
  text-align: center;
  border-style: none solid none solid;
  border-color: darkgreen;
  color: white;
  display: block;
  text-decoration: none;
}
.itemMenu:hover {
  padding-top: 5vh;
}

.Menu {
  width: 100vw;
  height: 5vh;
  position: fixed;
  background-color: green;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5vh;
}
.GapBar {
  width: 100vw;
  height: 5vh;
}
</style>
