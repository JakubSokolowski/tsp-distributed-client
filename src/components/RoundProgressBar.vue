<template>
  <div class="progressCircleBar">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "RoundProgressBar",
  mounted()
  {
    this.paint();
  },
  props: {
    progres: Number
  },
  watch: {
    progres: function() {
      this.paint();
    }
  },
  methods: {
    paint(){
        this.$refs.canvas.width = this.$refs.canvas.parentElement.clientWidth;
      this.$refs.canvas.height = this.$refs.canvas.parentElement.clientHeight;
      let canvas = this.$refs.canvas;
      let context = canvas.getContext("2d");
      let x = canvas.width / 2;
      let y = canvas.width / 2;
      let r = canvas.width / 2;
      let thickness = 20;
      let color = "rgba(0,0,255,0.8)";
      let endPoint = (this.progres / 100) * (2 * Math.PI) - Math.PI / 2;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = color;
      context.strokeStyle = color;
      context.arc(x, y, r, -Math.PI / 2, endPoint);
      context.arc(x, y, r - thickness, endPoint, -Math.PI / 2, true);
      context.lineTo(x, 0);
      context.fill();
      context.moveTo(x+0.1*r,y-0.8*r);
      context.arc(x, y-0.8*r, 0.1*r, 0, 2*Math.PI);
      context.stroke();
    }
  }
};
</script>


<style scoped>
.progressCircleBar {
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0);
  width: 100vw;
  height: 100vw;
}
</style>
