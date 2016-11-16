var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var src = path.resolve(__dirname, '../../'); // 源码目录

var commonPath = {
  distDir: path.resolve(__dirname, '../../../dist'),  // build 后输出目录
  templateHtml: path.join(src, 'template.html'),
  depsDir: path.resolve(__dirname, '../../../deps')
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
    publicPath: '',
    filename: '[name]/[hash].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue']
  },
  resolveLoader: {
    root: path.join(src, 'node_modules')
  },
  module: {
    preLoaders: [
      { test: /\.vue$/, loader: 'eslint', exclude: /node_modules/ },
      { test: /\.js$/, loader: 'eslint', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.vue$/, loader: 'vue', exclude: /node_modules/ },
      { test: /\.js/, loader: 'babel!eslint', exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?module!postcss'), exclude: /node_modules/ },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css?module!postcss!less'), exclude: /node_modules/ },
      { test: /\.(png|jpe?g|gif|svg)$/, loader: 'url', exclude: /node_modules/ }
    ]
  },
  vue: {
    loaders: {
      js: 'babel!eslint',
      less: 'vue-style!css!less',
      sass: 'vue-style!css!sass'
    }
  },
  eslint: {
    formatter: require('eslint-friendly-formatter'),
    rules: {
      'no-new': 0,
      'no-unused-vars': 0
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'app']
    }),
    new ExtractTextPlugin('app.min.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      title: 'todo mvc vue demo',
      filename: 'index.html',
      template: commonPath.templateHtml
    }),
    new webpack.NoErrorsPlugin()
  ],
  postcss: [
    require('autoprefixer')
  ]
}
