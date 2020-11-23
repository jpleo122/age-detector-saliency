<template>
  <div id="app">
    <h2>Select an image</h2>
    <img :src="image" />
    <input type="file" v-on:change="onFileChange" />
  </div>
</template>

<script>
// import { WebCam } from 'vue-web-cam';

export default {
  name: 'ImageLoader',
  data() {
    return {
      image: '',
    };
  },
  components: {
    // WebCam,
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
      console.log('changed');
      this.$emit('image-loaded', 1);
    },
    createImage(file) {
      const reader = new FileReader();
      const vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style>
#app {
  text-align: center;
}
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>
