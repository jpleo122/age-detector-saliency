<template>
  <div>
    <!-- <img alt="Vue logo" src='../assets/logo.png'>
    <h1>Test</h1> -->
    <h1>{{temp}}</h1>
  </div>
</template>

<script>
// import * as tf from '@tensorflow/tfjs';
// import {loadGraphModel} from '@tensorflow/tfjs-converter';
// Using this as reference for base saliency map
// https://github.com/alexanderkroner/saliency

export default {
  name: 'SaliencyMap',
  data: function data() {
    return {
      temp: '',
    };
  },
};
</script>

<style>
/* div {
    text-align: center;
} */

</style>
