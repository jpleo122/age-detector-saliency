<template>
  <div>
    <div class='b' id='myDiv'></div>
    <canvas id="interactive-binary-map" width="200" height="200"></canvas>
  </div>
</template>

<script>
import * as tf from '@tensorflow/tfjs';
import * as d3 from 'd3';
import { sliderTop } from 'd3-simple-slider';
import * as transformations from '../transformations';

export default {
  name: 'InteractiveBinaryMap',
  props: {
    gradients: tf.Tensor,
    greyImage: tf.Tensor,
  },
  data: function data() {
    return {
      nonZeros: null,
      pivots: [],
    };
  },
  computed: {
  },
  methods: {
    sliderInit() {
      const slider = sliderTop().min(0).max(1).step(0.1)
        .default(0.5)
        .width(300)
        .on('onchange', (val) => {
          tf.tidy(() => this.renderTransformation(val));
        });
      const g = d3
        .select('div#myDiv')
        .attr('width', 500)
        .attr('height', 100)
        .append('svg')
        .append('g')
        .attr('transform', 'translate(0,50)');
      g.call(slider);
      console.log('got in');
    },
    renderTransformation(threshold) {
      console.log(this.nonZeros.length);
      const pivot = this.nonZeros[this.nonZeros.length * (1 - threshold)];
      console.log(1 - threshold);
      console.log(pivot);
      if (pivot !== null) {
        const newImage = this.greyImage.mul(this.gradients.greater(pivot));

        const canvas = document.getElementById('interactive-binary-map');
        tf.browser.toPixels(newImage, canvas);
      }
    },
    async getNonzeros() {
      const tempValues = tf.tidy(() => {
        const temp = tf.reshape(this.gradients, [-1]);
        const { values, indices } = tf.topk(temp, temp.shape[0], true);
        return values;
      });
      const masked = await tf.booleanMaskAsync(tempValues, tempValues.greater(0));
      this.nonZeros = masked.dataSync();
      this.initializePivots();
      this.renderTransformation(0.5);
    },
    initializePivots() {
      this.pivots.push(0);
      for (let i = 1; i <= 10; i += 1) {
        this.pivots.push(this.nonZeros[this.nonZeros.length * (i / 10)]);
      }
      console.log(this.pivots);
    },
  },
  async mounted() {
    await this.getNonzeros().then(() => {});
    this.sliderInit();
  },
};
</script>
<style>
</style>
