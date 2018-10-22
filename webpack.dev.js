'use strict';

const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { resolve } = require('path'),
  src = resolve(__dirname, 'src');

const p = require('./package.json');

module.exports = {
  entry: {
    'content-script': resolve(src, 'index.js'),
    'background': resolve(src, 'background.js')
  },
  output: {
    publicPath: resolve(__dirname),
    path: resolve(__dirname, 'dist'),
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
        loader: MiniCssExtractPlugin.loader
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
    new ChromeExtensionReloader(),
    new MiniCssExtractPlugin({ filename: "style.css" }),
    new CleanPlugin(),
    new CopyPlugin([{
      from: resolve(__dirname, 'manifest.json'),
      transform: contents => Buffer.from(JSON.stringify({
        name: p.name.split(/-/).map(v => v.charAt(0).toUpperCase() + v.slice(1)).join(' '), // kebab to title case
        version: p.version,
        description: p.description,
        author: p.author,
        ...JSON.parse(contents.toString())
      }))
    }])
  ]
};
