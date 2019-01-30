const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractLess = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: false,
});

const {
  BACKEND_PROTOCOL = 'https',
} = process.env;

module.exports = {
  devtool: 'sourcemap',
  stats: { children: false },
  entry: { app: path.resolve(__dirname, 'src/index.js') },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js',
  },
  resolve: { alias: { '~': path.resolve(__dirname, 'src') } },
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        { loader: 'babel-loader' },
      ],
      exclude: /node_modules/,
    }, {
      test: /\.(gif|png|jpe?g|svg)$/,
      loader: 'url-loader?limit=8192&name=static/images/[hash].[ext]',
    }, {
      test: /\.css$/,
      use: extractLess.extract({
        use: { loader: 'css-loader' },
        // use style-loader in development
        fallback: 'style-loader',
      }),
    }, {
      test: /\.less$/,
      use: extractLess.extract({
        use: [
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              paths: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'src'),
              ],
            },
          },
        ],
        // use style-loader in development
        fallback: 'style-loader',
      }),
    }],
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss() {
          autoprefixer({ browsers: ['> 0.04%'] });
        },
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        // This can reduce react lib size and disable some dev feactures like props validation
        NODE_ENV: JSON.stringify('production'),
        ENV: JSON.stringify('development'),
        BACKEND_PROTOCOL: JSON.stringify(BACKEND_PROTOCOL),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      compressor: { warnings: false },
    }),
    new ExtractTextPlugin('app.min.css'),
    new CopyWebpackPlugin([
      { from: 'static', to: 'static' },
    ]),
    new HtmlWebpackPlugin({
      title: 'Template Title',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/template.html'),
    }),
  ],
};
