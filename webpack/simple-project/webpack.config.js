var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: __dirname + '/app/main.js',
  output: {
    path: __dirname,
    publicPath: '/build',
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
        loader: 'style!css?modules!postcss' // === loaders: ['style', 'css']
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
    new webpack.HotModuleReplacementPlugin()
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