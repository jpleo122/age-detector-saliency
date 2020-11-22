<template>
  <div class="a">
    <ImageLoader
      @image-loaded="predictModel($event)"
    />
    <SaliencyMap/>
    <!-- <div>prediction:{{this.num}}</div> -->

    <!-- <img :src='this.temp_img_url' id='temp_image'> -->

    <h1>Visualizing Age Detectors with Saliency Maps</h1>

    <h2>What is a saliency map?</h2>

    <h2>How to use a saliency map</h2>

    <h2>What is a saliency map?</h2>

    <h2>What is a saliency map?</h2>
  </div>
</template>

<script>
import * as tf from '@tensorflow/tfjs';
import * as cv from 'opencv.js';
// import * as cv from 'opencv'

import SaliencyMap from '../components/SaliencyMap.vue';
import ImageLoader from '../components/ImageLoader.vue';

export default {
  name: 'Article',
  data: function data() {
    return {
      pic: null,
      model: null,
      face_detector: null,
      temp_img: null,
      temp_img_url: null,
    };
  },
  components: {
    SaliencyMap,
    ImageLoader,
  },
  methods: {
    async loadModels() {
      const modelFile = '../../models/model.json';
      this.model = await tf.loadLayersModel(modelFile);

      const faceDetectFile = '../../haarcascade_frontalface_default.xml';
      this.face_detector = new cv.CascadeClassifier();
      this.face_detector.load(faceDetectFile);

      this.temp_img_url = '../../jonathan-leo.jpg';
      this.temp_img = cv.imread('temp_image');

      console.log(this.temp_img);
    },
    loadImage(url) {
      const image = new Image();
      image.src = url;
      return image;
    },

    async predictModel(event) {
      this.pic = event;
      console.log(this.pic);
      console.log(event);
    },
  },
  async mounted() {
    this.loadModels();
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
