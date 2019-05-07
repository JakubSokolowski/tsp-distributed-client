<template>
  <div>
    <Menu/>
    Jesteś zalogowany!
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
  padding: 5px;
}
</style>

