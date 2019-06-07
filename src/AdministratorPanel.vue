<template>
  <div>
    <Menu/>

    <div v-for="Problem in problems"  class="container" :key="'Problem' + Problem.id">
        <div class="sideBar">
            <input type="button" class="elementLeftBar upArrow" value="▶️" @click="upProblem(Problem.id)">
            <input type="button" class="elementLeftBar downArrow" value="▶️" @click="downProblem(Problem.id)">
        </div>
        <div class="mainContent">
            <p>Pozycja: {{Problem.indexInQueue}} ID: {{Problem.id}} Time: {{Problem.timeOfRunningInSeconds}}</p>
            <p v-if="Problem.state">Stan: {{Problem.state}}</p>
            <p>Zlecający: {{Problem.user.username}} Data zlecenia: {{Problem.dateOfOrdering}}</p>
            <p>Algorytm: {{Problem.algorithm}} Progres: {{Problem.percentageOfProgress}}%</p>
            <p>Ilość miast: {{Problem.graph.numOfCities}}</p>            
        </div>
        <div v-if="Problem.percentageOfProgress < 100" class="sideBar">
            <input type="button" v-if="Problem.state === 'ENQUEUED'" class="element greenColor" value="▶️" @click="startProblem(Problem.id)">
            <input type="button" v-if="Problem.state === 'RUNNING'" class="element greenColor" value="||" @click="stopProblem(Problem.id)">
            <input type="button" class="element redColor" value="X" @click="stopProblem(Problem.id)">
        </div>
      </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import DataAccess from "@/components/DataAccess.js";
import { error } from "util";
import { finished } from 'stream';
export default {
  name: "AdministratorPanel",
  components: {
    Menu
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
      prog: 10,
    };
  },
  methods: {
    getData() {
      DataAccess.getProblemsForAdmin().then(response => {
         this.problems = response.data.sort((a,b) => {
          if(a.indexInQueue === b.indexInQueue) return 0;
            return a.indexInQueue > b.indexInQueue ? 1: -1;
          }).filter((j) => !(j.state === "FINISHED" || j.state ==="CANCELLED"))
      });
      console.log(this.problems);
      this.prog += 1;
    },
    upProblem(problem) {
        DataAccess.upProblem(problem);
    },
    downProblem(problem) {
        DataAccess.downProblem(problem);
    },
    startProblem(problem) {
        DataAccess.startProblem(problem);
    },
    stopProblem(problem) {
        console.log('Clicked stop problem')
        DataAccess.stopProblem(problem);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>


<style scoped>
span{
    width:100%;
}
.upArrow{
    color:green;
    transform: rotate(-90deg);
}
.downArrow{
    color:red;
    transform: rotate(90deg);
}
.elementLeftBar{
    display: block;
    width: 50px;
    height: 50px;
    background: transparent;
    font-size: 40px;
    border: none;
}
.sideBar{
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
}
.mainContent{
    width: 60%;
    color: blue;
}
.container{
  margin-left: auto;
  margin-right: auto;
  display: flex;
  width: 70%;
  height: 20vw;
  background-color: rgba(0,0,0,0.7);
  margin-top: 10px;
  border: solid 2px darkblue;
  box-shadow: 0px 0px 10px darkblue;
}
.element{
    background: transparent;
    line-height: 45%;
    font-size: 40px;
    display: block;
    height: 50%;
    border: none;
}
.redColor {
  color: red;
}
.greenColor {
  color: green;
}
input:hover{
    color: cornflowerblue;
}
* {
  outline: none;
}
</style>
