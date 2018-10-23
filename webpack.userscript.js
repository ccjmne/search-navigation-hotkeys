'use strict';

const CleanPlugin = require('clean-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const UserscriptMeta = require('userscript-meta');
const WrapperPlugin = require('wrapper-webpack-plugin');

const { resolve } = require('path'),
  src = resolve(__dirname, 'src'),
  dist = resolve(__dirname, 'dist/userscript');

const p = require('./package.json');

module.exports = (env, argv) => ({
  devtool: argv.mode === 'development' ? 'cheap-source-map' : '',
  optimization: { minimize: false }, // necessary for Userscript-style comments
  entry: {
    'main': resolve(src, 'index.js')
  },
  output: {
    path: dist,
    filename: '[name].js',
    libraryTarget: 'umd'
  },
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
    new CleanPlugin([resolve(dist, '*.*')])
  ].concat(argv.mode === 'development' ? [] : [new MinifyPlugin()]).concat([
    new WrapperPlugin({
      header: UserscriptMeta.stringify({
        name: p.name.split(/-/).map(v => v.charAt(0).toUpperCase() + v.slice(1)).join(' '), // kebab to title case
        version: p.version,
        description: p.description,
        author: p.author,
        namespace: p.homepage,
        include: '*://www.google.tld/search*',
        downloadURL: 'https://raw.githubusercontent.com/ccjmne/search-navigation-hotkeys/master/dist/main.js',
        grant: 'none'
      })
    })
  ])
});
