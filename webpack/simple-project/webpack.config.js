var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:6220', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    __dirname + '/app/main.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /.json$/,
        loader: 'json'
      },
      {
        test: /.[js|jsx]$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules!postcss') // 'style!css?modules!postcss' // === loaders: ['style', 'css']
      }
    ]
  },

  postcss: [
    require('autoprefixer')
  ],

  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack simple project',
      template: __dirname + '/app/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('[name].css')
  ],

  devServer: {
    contentBase: './build',
    colors: true,
    inline: true,
    historyApiFallback: true,
    port: 6220,
    chunks: false,
    hot: true
  }
}