<template>
  <div class="a">
    <ImageLoader2 />
    <SaliencyMap />
    <!-- <div>prediction:{{this.num}}</div> -->

    <img :src="this.temp_img_url" id="temp_image" />

    <h1>Visualizing Age Detectors with Saliency Maps</h1>

    <h2>What is a saliency map?</h2>

    <h2>How to use a saliency map</h2>

    <h2>What is a saliency map?</h2>

    <h2>What is a saliency map?</h2>
  </div>
</template>

<script>
import * as tf from "@tensorflow/tfjs";
import * as cv from "opencv.js";

import SaliencyMap from "../components/SaliencyMap.vue";
import ImageLoader2 from "../components/ImageLoader2.vue";

export default {
  name: "Article",
  data: function data() {
    return {
      pic: null,
      face_detector: null,
      temp_img_url: null,
      // model variables
      model: null,
      temp_tf_image: null,
      predicted_idx: null,
      age_ranges: [
        "0-9",
        "10-19",
        "20-29",
        "30-39",
        "40-49",
        "50-59",
        "60-116",
      ],
    };
  },
  components: {
    SaliencyMap,
    ImageLoader2,
  },
  methods: {
    // load model, face detection, and image upon mounting
    async loadModel() {
      const modelFile = "../../models/model.json";
      this.model = await tf.loadLayersModel(modelFile);
    },
    loadFaceDetection() {
      const faceDetectFile = "../../haarcascade_frontalface_default.xml";
      this.face_detector = new cv.CascadeClassifier();
      this.face_detector.load(faceDetectFile);
    },
    predictModel(event) {
      this.pic = event;
      // console.log(cv.imread("imgId"));
    },

    getFace(face) {},

    async getTFImage(url) {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        this.temp_tf_image = tf.browser.fromPixels(img, 1);
        console.log(this.temp_tf_image);
        this.getPredictionAndGradients();
      };
    },
    // prediction and saliency map functions
    getPredictionAndGradients() {
      // get model prediction
      tf.max(this.temp_tf_image).print();
      const outputs = this.model.predict(
        this.temp_tf_image.reshape([1, 200, 200, 1])
      );
      outputs.print();
      this.predicted_idx = tf.argMax(outputs, 1).dataSync()[0];
      // console.log(this.predicted_idx[0]);
      const softmaxed = tf.softmax(outputs).dataSync();
      console.log(softmaxed);
      tf.tensor(softmaxed[0]).print();

      // obtain gradients
      const predictFunc = (x) => {
        return tf.softmax(this.model.predict(x.reshape([1, 200, 200, 1])));
        // const tempPredicted = tf.argMax(tempOutputs, 1).dataSync()[0];
        // return tf.softmax(;
      };
      const gradFunc = tf.grad(predictFunc);
      // const grad = gradFunc(this.temp_tf_image, tf.tensor(tf.softmax(outputs).dataSync()[0]));
      const grads = gradFunc(this.temp_tf_image, tf.softmax(outputs)).abs();
      // console.log(255 / tf.max(grads).dataSync()[0]);
      const newImage = grads.mul(1 / tf.max(grads).dataSync()[0]);
      console.log(newImage);
      tf.max(newImage).print();

      const canvas = document.getElementById("myCanvas");
      tf.browser.toPixels(newImage, canvas);
    },
  },
  async mounted() {
    // this.loadFaceDetection();
    await this.loadModel();
    await this.getTFImage("../../greyscale.jpg");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.a {
  vertical-align: middle;
  max-width: 90ch;
  margin: 0 auto;
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
