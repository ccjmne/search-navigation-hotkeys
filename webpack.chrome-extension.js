'use strict';

const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ZipPlugin = require('zip-webpack-plugin');

const { resolve } = require('path'),
  src = resolve(__dirname, 'src'),
  templates = resolve(src, 'templates'),
  dist = resolve(__dirname, 'dist/chrome-extension'),
  assets = resolve(__dirname, 'assets');

const p = require('./package.json');

module.exports = (env, argv) => ({
  devtool: argv.mode === 'development' ? 'cheap-source-map' : '',
  entry: {
    'content-script': resolve(src, 'index.js'),
    'background': resolve(src, 'background.js'),
    'options': resolve(src, 'options.js')
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
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new CleanPlugin([resolve(dist, '*.*'), resolve(dist, 'assets/*.*'), resolve(dist, 'templates/*.*')]),
    new CopyPlugin([
      { from: resolve(assets, '*.*'), ignore: resolve(assets, 'src') },
      { from: resolve(templates, '*.*'), flatten: true, to: 'templates' }, {
        from: resolve(src, 'manifest.json'),
        transform: contents => Buffer.from(JSON.stringify({
          name: p.name.split(/-/).map(v => v.charAt(0).toUpperCase() + v.slice(1)).join(' '), // kebab to title case
          version: p.version,
          description: p.description,
          author: p.author,
          ...JSON.parse(contents.toString())
        }))
      }
    ])
  ].concat(argv.mode === 'development' ? [new ChromeExtensionReloader()] : [new ZipPlugin({ filename: p.name })])
});
