<template>
  <div>
    <Menu/>
    <div class="Content">
      
    </div>
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

