<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Article msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Article from './views/Article.vue';

export default {
  name: 'App',
  components: {
    Article,
  },
};
</script>

<style>
#app {
  /* 'Noto Sans',sans-serif */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
