<template>
  <div class="progressCircleBar">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "RoundProgressBar",
  mounted() {
    this.paint();
  },
  props: {
    progres: Number,
    tour: Array
  },
  watch: {
    progres: function() {
      this.paint();
    }
  },
  methods: {
    paint() {
      let numberOfCircle = this.tour.length - 1;
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

      for (let i = 0; i < numberOfCircle; i++) {
        let angle = i * (2*Math.PI) / numberOfCircle;
        context.moveTo(
          x + 0.8 * r * Math.cos(angle),
          y + 0.8 * r * Math.sin(angle)
        );
        context.font = "30px Arial";
        context.fillText(i+1+"", x + 0.8 * r * Math.cos(angle), y + 0.8 * r * Math.sin(angle));
        context.moveTo(
          x + 0.8 * r * Math.cos(angle) + 0.1 * r,
          y + 0.8 * r * Math.sin(angle)
        );
        context.arc(
          x + 0.8 * r * Math.cos(angle),
          y + 0.8 * r * Math.sin(angle),
          0.1 * r,
          0,
          2*Math.PI
        );
        context.stroke();
      }

      for (let i = 0; i < numberOfCircle; i++) {
        let angleFrom = this.tour[i] * (2*Math.PI) / numberOfCircle;
        let angleTo = this.tour[i+1] * (2*Math.PI) / numberOfCircle;
        let fromX = x + 0.8 * r * Math.cos(angleFrom);
        let fromY = y + 0.8 * r * Math.sin(angleFrom);
        let toX = x + 0.8 * r * Math.cos(angleTo);
        let toY = y + 0.8 * r * Math.sin(angleTo);
        context.moveTo(
          fromX,
          fromY
        );
        context.lineTo(
          toX,
          toY
        );
        context.stroke();
        var angleOfLine = Math.atan2(toY-fromY,toX-fromX);
        
        context.lineTo(toX-40*Math.cos(angleOfLine-Math.PI/6),toY-40*Math.sin(angleOfLine-Math.PI/6));
        context.moveTo(toX, toY);
        context.lineTo(toX-40*Math.cos(angleOfLine+Math.PI/6),toY-40*Math.sin(angleOfLine+Math.PI/6));
        context.stroke();
      }


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
