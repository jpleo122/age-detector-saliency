<template>
  <div>
    <h1>Testing</h1>
    <input type="file" @change="onFileSelected">
    <img ref="input_image">
    <!-- <WebCam/> -->
  </div>
</template>
<script>
// import { WebCam } from 'vue-web-cam';

export default {
  name: 'ImageLoader',
  data: function data() {
    return {
      fileSelected: null,
    };
  },
  components: {
    // WebCam,
  },
  methods: {
    onFileSelected(event) {
      this.fileSelected = event.target.files[0];
      console.log(this.fileSelected);
    },
    // https://github.com/ashwinvaswani/tfjs-image-classification/blob/master/js/mobile-net.js
    // async renderImage() {
    //   var reader = new FileReader()

    // },
  },
};
</script>

<style>

</style>
