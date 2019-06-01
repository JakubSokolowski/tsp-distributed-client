<template>
  <div>
    <Menu/>
    <div class="container">
        <div class="sideBar">
            <input type="button" class="elementLeftBar upArrow" value="▶️">
            <input type="button" class="elementLeftBar downArrow" value="▶️">
        </div>
        <div class="mainContent"></div>
        <div class="sideBar">
            <input type="button" class="element redColor" value="X">
            <input type="button" class="element greenColor" value="▶️">
            <input type="button" class="element redColor" value="||">
        </div>
        <!--
      <div class="container2">
        <input type="button" class="element fontSize redColor" value="X">
        <input type="button" class="element fontSize greenColor" value="▶️">
        <input type="button" class="element fontSize redColor" value="||">
      </div>
      -->
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import { error } from "util";
export default {
  name: "AdministratorPanel",
  components: {
    Menu
  },
  data: function() {
    return {};
  },
  methods: {}
};
</script>


<style scoped>
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
    line-height: 25%;
    font-size: 40px;
    display: block;
    height: 30%;
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
