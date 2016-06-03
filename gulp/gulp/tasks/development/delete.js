var gulp = require('gulp');
var del = require('del');
var config = require('../../config').delete;

/**
 * Delete folders and files
 */
gulp.task('delete', function(callback) {
  del(config.src.dev, callback);
});

gulp.task('delete:pro', function(callback) {
  del(config.src.pro, callback);
});
