<template>
  <div>
    <div class='b' id='myDiv'>
      <canvas id="interactive-binary-map"></canvas>
    </div>
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
      const slider = sliderTop().min(0).max(0.9).step(0.1)
        .default(0.5)
        .width(200)
        .on('onchange', (val) => {
          tf.tidy(() => this.renderTransformation(val));
        });
      const g = d3
        .select('div#myDiv')
        .attr('width', 500)
        .attr('height', 50)
        .append('svg')
        .append('g')
        .attr('transform', 'translate(50,50)');
      g.call(slider);
      console.log('got in');
    },
    renderTransformation(threshold) {
      // console.log(this.nonZeros.length);
      const pivot = this.pivots[Math.round(this.pivots.length * (threshold))];
      // console.log(1 - threshold);
      // console.log(pivot);
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
      await tf.booleanMaskAsync(tempValues, tempValues.greater(0)).then((value) => {
        this.nonZeros = value.dataSync();

        this.initializePivots();
        this.renderTransformation(0.5);
      });
    },
    initializePivots() {
      console.log(this.nonZeros);
      this.pivots = [];
      for (let i = 9; i >= 0; i -= 1) {
        this.pivots.push(this.nonZeros[Math.round(this.nonZeros.length * (i / 10))]);
      }
      console.log(this.pivots);
    },
  },
  async mounted() {
    await this.getNonzeros().then();
    this.sliderInit();
  },
};
</script>
<style scoped>
div.b {
  padding: 0;
  margin: 0;
}
</style>
