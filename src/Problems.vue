<template>
  <div>
    <Menu/>
    <div class="Content">
      <div v-for="Problem in problems" :key="Problem.id">
        <p>Data zlecenia: {{Problem.dateOfOrdering}}</p>
        <p>Typ algorytmu: {{Problem.algorithm}}</p>
        <div>
          Macierz:
          <p v-for="(Row,index) in Problem.graph.costMatrix" :key="'Row'+index">
            <span v-for="(City,index) in Row" :key="'Row City' + index">{{City}},</span>
          </p>
        </div>
        <div v-if="Problem.tour != null">
          Wynik:
          <p>Koszt: {{Problem.cost}}</p>
          <p>
            Trasa:
            <span
              v-for="(City,index) in Problem.tour"
              :key="'tour:' + Problem.id + 'City:' +index"
            >
              <span v-if="index != 0">->{{City}}</span>
              <span v-else>{{City}}</span>
            </span>
          </p>
        </div>
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

