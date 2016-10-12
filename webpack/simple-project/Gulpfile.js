var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');

gulp.task('webpack-dev-server', function() {
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
      chunks: false,
      colors: true
    }
  }).listen(6220, function(error) {
    if (error) {
      throw new gutil.PluginError('webpack-dev-server', error);
    }

    gutil.log('[webpack-dev-server]', 'http://localhost:6220');
  })
})