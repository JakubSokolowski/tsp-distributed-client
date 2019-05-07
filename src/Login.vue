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
        <input type="button" @click="login" value="Zaloguj"/>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import { error } from 'util';
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
      }
    };
  },
  methods: {
      login(){
        this.$store.dispatch('login',this.user).then( () => {
            this.$router.go();
        }).catch(error => {

        });
      }
  }
};
</script>


<style scoped>
.Content {
  padding: 5px;
}
</style>

