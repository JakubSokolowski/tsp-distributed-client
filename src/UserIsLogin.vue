<template>
  <div>
    <Menu/>
    <div class="Content">Jesteś zalogowany!</div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
export default {
  name: "UserIsLogin",
  components: {
    Menu
  }
};
</script>


<style scoped>
.Content {
  margin-top: 10px;
  padding: 10px;
  border: solid 2px darkblue;
  box-shadow: 0px 0px 10px darkblue;
  background-color: rgba(0, 0, 0, 0.7);
  color: blue;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
</style>

