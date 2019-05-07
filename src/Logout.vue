<template>
  <div>
    <Menu/>
    
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
export default {
  name: "Logout",
  components: {
    Menu
  },
  mounted(){
      this.$store.commit('logout');
      this.$router.go()
  }
};
</script>


<style scoped>

</style>

