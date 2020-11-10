// from https://cli.vuejs.org/guide/deployment.html#github-pages
// want to use to host on github pages

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/age-detector-saliency/'
      : '/'
  }