const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const src = path.resolve(__dirname, '../../src'); // 源码目录

const commonPath = {
  distDir: path.resolve(__dirname, '../../dist'),  // build 后输出目录
  templateHtml: path.join(src, 'template.html'),
  depsDir: path.resolve(__dirname, '../../deps')
}

module.exports = {
  entry: {
    app: path.join(src, 'index.js'),
    vender: [
      'vue',
      'vue-router',
      'vue-resource'
    ]
  },
  output: {
    path: path.resolve(commonPath.distDir, 'static'),
    publicPath: ''
  },
  resolve: {
    extensions: ['', 'js', 'vue']
  },
  resolveLoader: {
    root: src
  },
  module: {
    preLoaders: [
      { test: /\.[vue|js]$/, loader: 'eslint', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.js/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.vue$/, loader: 'vue', exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?module!postcss'), exclude: /node_modules/ },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css?module!postcss!less'), exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.CommonsChunkPlugin({
      names: ['vendor', 'app']
    }),
    new ExtractTextPlugin('app.min.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: commonPath.templateHtml
    })
  ],
  postcss: [
    require('autoprefixer')
  ]
}
