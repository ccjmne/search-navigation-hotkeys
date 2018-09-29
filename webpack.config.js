const MinifyPlugin = require('babel-minify-webpack-plugin');
const WrapperPlugin = require('wrapper-webpack-plugin');

const UserscriptMeta = require('userscript-meta');

module.exports = {
  optimization: { minimize: false },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env']
        }
      }
    }]
  },
  plugins: [
    new MinifyPlugin(),
    new WrapperPlugin({
      header: UserscriptMeta.stringify({
        name: 'Google Search Hotkeys',
        version: '2.0.0',
        description: 'Navigate results from Google searches without ever lifting your hands off the keyboard!',
        author: 'ccjmne <ccjmne@gmail.com> (https://github.com/ccjmne)',
        namespace: 'https://github.com/ccjmne',
        include: '*://www.google.tld/search*',
        downloadURL: 'https://github.com/ccjmne/google-search-hotkeys/master/dist/main.js',
        grant: 'none'
      })
    })
  ]
};
