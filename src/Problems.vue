<template>
  <div>
    <Menu/>
    <div>
      <div v-for="Problem in problems" :key="Problem.id">
        <div class="Content">
          <h1>Info</h1>
          <div class="containerItem">
            <p>Data zlecenia: {{Problem.dateOfOrdering}}</p>
            <p>Typ algorytmu: {{Problem.algorithm}}</p>
            <p>Miejsce w kolejce: {{Problem.indexInQueue}}</p>
            <p>Ilość miast: {{Problem.graph.numOfCities}}</p>
          </div>
        </div>

        <Matrix :matrix="Problem.graph.costMatrix"/>

        <div v-if="Problem.tour != null">
          <h1>Wynik</h1>
          <div class="containerItem">
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
          <h1>Postęp rozwiązywania: {{Problem.percentageOfProgress}}%</h1>
          <RoundProgressBar class="progress" :progres="Problem.percentageOfProgress" :tour="Problem.tour"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Matrix from "@/components/Matrix.vue";
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
h1 {
  font-size: 32px;
  color: blue;
  text-align: center;
}
.Content {
  margin-top: 10px;
  margin-bottom: 10px;
}
.containerItem {
  border: solid 2px darkblue;
  box-shadow: 0px 0px 10px darkblue;
  background-color: rgba(0, 0, 0, 0.7);
  color: blue;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 5px;
}
.progress{
  margin-right: auto;
  margin-left: auto;
}
</style>

