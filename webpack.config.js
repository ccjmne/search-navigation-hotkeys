'use strict';

const MinifyPlugin = require('babel-minify-webpack-plugin');
const WrapperPlugin = require('wrapper-webpack-plugin');

const UserscriptMeta = require('userscript-meta');
const p = require('./package.json');

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
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: { minimize: true }
      }, {
        loader: 'sass-loader',
        options: { outputStyle: 'compressed' }
      }]
    }]
  },
  plugins: [
    new MinifyPlugin(),
    new WrapperPlugin({
      header: UserscriptMeta.stringify({
        name: p.name.split(/-/).map(v => v.charAt(0).toUpperCase() + v.slice(1)).join(' '), // kebab to title case
        version: p.version,
        description: p.description,
        author: p.author,
        namespace: p.homepage,
        include: '*://www.google.tld/search*',
        downloadURL: 'https://raw.githubusercontent.com/ccjmne/google-search-hotkeys/master/dist/main.js',
        grant: 'none'
      })
    })
  ]
};
