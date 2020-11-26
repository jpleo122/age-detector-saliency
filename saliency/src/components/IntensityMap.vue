<template>
  <div>
    <div class='b' id='intensity-map-div'>
      <canvas id="intensity-map"></canvas>
    </div>
  </div>
</template>

<script>
import * as tf from '@tensorflow/tfjs';

export default {
  name: 'IntensityMap',
  props: {
    gradients: tf.Tensor,
  },
  data: function data() {
    return {

    };
  },
  methods: {
    renderTransformation(threshold) {
      const newImage = this.gradients.mul(1 / tf.max(this.gradients).dataSync()[0]);
      console.log(newImage);
      console.log(tf.max(this.gradients));

      const canvas = document.getElementById('intensity-map');
      tf.browser.toPixels(newImage, canvas);
    },
  },
  mounted() {
    this.renderTransformation();
  },
};
</script>
<style scoped>
div.b {
  padding: 0;
  margin: 0;
  text-align: center;
}
</style>
