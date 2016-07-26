var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build', ['delete'], function(callback) {
  gulpSequence(
    'symlink:pre-commit',
    ['coffee', 'sass'],
    'copy',
    'concat',
    'watch',
    callback
  );
});