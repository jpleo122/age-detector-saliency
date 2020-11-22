<template>
  <div class="a">
    <ImageLoader/>
    <SaliencyMap/>
    <div v-on:image-loaded="predictModel">prediction:</div>

    <h1>Visualizing Age Detectors with Saliency Maps</h1>

    <h2>What is a saliency map?</h2>

    <h2>How to use a saliency map</h2>

    <h2>What is a saliency map?</h2>

    <h2>What is a saliency map?</h2>
  </div>
</template>

<script>
import * as tf from '@tensorflow/tfjs';

import SaliencyMap from '../components/SaliencyMap.vue';
import ImageLoader from '../components/ImageLoader.vue';

export default {
  name: 'Article',
  data: function data() {
    return {
      model: '',
      num: 1,
    };
  },
  props: {
  },
  components: {
    SaliencyMap,
    ImageLoader,
  },
  methods: {
    async loadModel() {
      const modelFile = '../../model/model.json';
      this.model = await tf.loadLayersModel(modelFile);
    },

    async predictModel(pic) {
      this.num += pic;
      console.log(this.num);
    },
  },
  async mounted() {
    this.loadModel();
    this.predictModel();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.a {
  vertical-align: middle;
  max-width: 90ch;
  margin:0 auto;
}
h1 {
  text-align: center;
}
p {
  font-size: 17px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
