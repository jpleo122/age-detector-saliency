<template>
  <div class="a">
    <ImageLoader/>
    <SaliencyMap/>

    <h1>Visualizing Age Detectors with Saliency Maps</h1>

    <h2>What is a saliency map?</h2>

    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type
      specimen book. It has survived not only five centuries, but also the leap
      into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with
      desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>

    <h2>How to use a saliency map</h2>

    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type
      specimen book. It has survived not only five centuries, but also the leap
      into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with
      desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>

    <h2>What is a saliency map?</h2>

    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type
      specimen book. It has survived not only five centuries, but also the leap
      into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with
      desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>

    <h2>What is a saliency map?</h2>

    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type
      specimen book. It has survived not only five centuries, but also the leap
      into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with
      desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
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
  },
  async mounted() {
    this.loadModel();
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
