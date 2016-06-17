var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(callback) {
  runSequence(
    'delete',
    'coffee',
    'sprites',
    'sass',
    ['copy:images', 'copy:html'],
    callback
  );
});