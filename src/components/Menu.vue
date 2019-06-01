<template>
  <div id="app">
    <div v-if="isLoged" class="Menu">
      <router-link class="itemMenu" to="/przeslijPlik">Prześlij plik</router-link>
      <router-link class="itemMenu" to="/problemy">Instancje problemów</router-link>
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
  text-align: center;
  display: block;
  text-decoration: none;
  color: blue;
  padding: 5px;
}
.itemMenu:hover {
  padding-top: 5vh;
}

.Menu {
  width: 100vw;
  height: 5vh;
  position: fixed;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5vh;
  border-bottom: 1px darkblue solid;
}
.GapBar {
  width: 100vw;
  height: 5vh;
}
</style>
