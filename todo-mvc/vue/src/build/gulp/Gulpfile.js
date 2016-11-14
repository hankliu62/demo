var gulp = require('gulp');
var gutil = require('gulp-util');
var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack/webpack.dev.config');

gulp.task('webpack-dev-server', function() {
  new WebpackDevServer(new Webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      chunks: false
    }
  }).listen(6220, function(error) {
    if (error) {
      throw new gutil.PluginError('webpack-dev-server', error);
    }

    gutil.log('[webpack-dev-server]', 'http://localhost:6220');
  });
});

gulp.task('dev', ['webpack-dev-server']);
