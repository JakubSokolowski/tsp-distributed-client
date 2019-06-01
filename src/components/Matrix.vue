<template>
  <div class="container">
    <h1>Macierz</h1>
    <table >
      <tr v-for="(table,index) in matrix" :key="'Table ' + index">
          <td v-for="(cost,index) in table" :key="'Cost ' + index">
              {{cost}}
          </td>
      </tr>
    </table> 
    </div>
</template>

<script>
export default {
  name: "Matrix",
  mounted() {
  },
  props: {
    matrix: Array
    
  },
  watch: {
    progres: function() {
      this.paint();
    }
  },
  methods: {

  }
};
</script>


<style scoped>
table{
  border: solid 2px darkblue;
  box-shadow: 0px 0px 10px darkblue;
  background-color: rgba(0,0,0,0.7);
  color: blue;
  width: 70%;
  margin-left:auto; 
  margin-right:auto;
}
td,th{
  border: 1px black solid;
  padding: 1px;
}
h1{
  font-size: 32px;
  color: blue;
  text-align: center;
}
.container{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
