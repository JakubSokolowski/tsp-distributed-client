<template>
  <div>
    <Menu/>
    <div class="Content">
      <div v-for="Problem in problems" :key="Problem.id">
        <p>Data zlecenia: {{Problem.dateOfOrdering}}</p>
        <p>Typ algorytmu: {{Problem.algorithm}}</p>
        <div>
          Macierz:
          <Matrix :matrix="Problem.graph.costMatrix"/>
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
          Postęp rozwiązywania: {{Problem.percentageOfProgress}}%
          <RoundProgressBar :progres="Problem.percentageOfProgress" :tour="Problem.tour"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Matrix from "@/components/Matrix.vue"
import Menu from "@/components/Menu.vue";
import DataAccess from "@/components/DataAccess.js";
import RoundProgressBar from "@/components/RoundProgressBar.vue";
export default {
  name: "EditDataOfUser",
  components: {
    Menu,
    RoundProgressBar,
    Matrix
  },
  mounted() {
    this.getData();
    //Period 1s
    this.timer = setInterval(this.getData, 1000);
  },
  data: function() {
    return {
      problems: [],
      comunicats: [],
      timer: "",
      prog: 10
    };
  },
  methods: {
    getData() {
      DataAccess.getProblems().then(response => {
        this.problems = response.data;
      });
      this.prog += 1;
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>


<style scoped>
.Content {
  padding: 5px;
}
</style>

