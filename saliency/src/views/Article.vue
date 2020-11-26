<template>
  <div class="a">
    <!-- <h1>Visualizing Age Detectors with Saliency Maps</h1> -->
    <span style="font-size: 70px"
      ><b>Visualizing Age Detectors with Saliency Maps</b></span
    >
    <ImageLoader2 @image-transformed="loadImageFromCV()" />
    <!-- <div>prediction:{{this.num}}</div> -->

    <!-- <img :src="this.temp_img_url" id="temp_image" /> -->

    <!-- <h2>Convert</h2> -->

    <!-- <p>This question is best answered with another, what is saliency? Saliency A saliency map is a model visualization device that tries to capture what </p> -->

    <!-- <h2>Interactive Binary Saliency Map</h2> -->
    <!-- <div class="a"> -->
    <span style="font-size: 70px">Heatmap</span>
    <intensity-map
      v-if="this.temp_tf_image_gradients"
      :gradients="this.temp_tf_image_gradients"
    />
    <!-- </div> -->

    <!-- <div class="a">  -->
    <span style="font-size: 70px">Interactive Binary Map</span>
    <interactive-binary-map
      v-if="this.temp_tf_image_gradients"
      :gradients="this.temp_tf_image_gradients"
      :greyImage="this.temp_tf_image"
    />
    <!-- </div> -->
    <!-- <span style="font-size: 70px">Interactive Binary Map</span>
    <interactive-binary-map
      v-if="this.temp_tf_image_gradients"
      :gradients="this.temp_tf_image_gradients"
      :greyImage="this.temp_tf_image"
    /> -->
  </div>
</template>

<script>
import * as tf from "@tensorflow/tfjs";
import * as cv from "opencv.js";

import ImageLoader2 from "../components/ImageLoader2.vue";
import InteractiveBinaryMap from "../components/InteractiveBinaryMap.vue";
import IntensityMap from "../components/IntensityMap.vue";

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
      // gradient information
      temp_tf_image_gradients: null,
      rerenders: {},
    };
  },
  components: {
    InteractiveBinaryMap,
    ImageLoader2,
    IntensityMap,
  },
  methods: {
    // load model, face detection, and image upon mounting
    async loadModel() {
      const modelFile = "../../models/model.json";
      this.model = await tf.loadLayersModel(modelFile);
      // console.log(this.model.layers);
    },
    loadImageFromCV() {
      // canvasGrayCroppedResized
      const tempCanvas = document.getElementById("canvasGrayCroppedResized");

      this.temp_tf_image = tf.browser.fromPixels(tempCanvas, 1);
      this.getPredictionAndGradients();
      // console.log(this.temp_tf_image);

      // const canvas = document.getElementById("tempCanvas");
      // tf.browser.toPixels(this.temp_tf_image, canvas);
    },
    async getTFImage(url) {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        this.temp_tf_image = tf.browser.fromPixels(img, 1);
        // console.log(this.temp_tf_image);
        this.getPredictionAndGradients();
      };
    },
    // prediction and saliency map functions
    getPredictionAndGradients() {
      // get model prediction
      const outputs = tf.tidy(() =>
        this.model.predict(this.temp_tf_image.reshape([1, 200, 200, 1]))
      );
      this.predicted_idx = tf.argMax(outputs, 1).dataSync()[0];

      // obtain gradients
      const predictFunc = (x) =>
        this.model.predict(x.reshape([1, 200, 200, 1]));
      const gradientFunc = tf.grad(predictFunc);

      this.temp_tf_image_gradients = tf.tidy(() =>
        gradientFunc(this.temp_tf_image, outputs).abs()
      );
    },
  },
  async mounted() {
    await this.loadModel();

    // only run while testing
    // await this.getTFImage("../../greyscale.jpg");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
div.a {
  vertical-align: middle;
  max-width: 200ch;
  margin: 0 auto;
  text-align: center;
}
h1 {
  text-align: center;
}
p {
  font-size: 20px;
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
