<template>
  <div>
    <Menu/>
    <div class="Content">
      <div v-for="Problem in problems" :key="Problem.id">
        <p>Koszt: {{Problem.cost}}</p>
        <p>Trasa: 
        <b v-for="(City,index) in Problem.tour" :key="'tour:' + Problem.id + 'City:' +index">
          <b v-if="index != 0">->{{City}}</b>
          <b v-else>{{City}}</b>
        </b>
        </p>
      </div>
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
    DataAccess.getProblems().then(response => {
      this.problems = response.data;
      console.log(response.data);
    });
  },
  data: function() {
    return {
      problems: [],
      comunicats: []
    };
  },
  methods: {}
};
</script>


<style scoped>
.Content {
  padding: 5px;
}
</style>

