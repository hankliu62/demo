var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build:pro', function(callback) {
  runSequence(
    'build',
    'delete:pro',
    ['optimize:js', 'optimize:html', 'optimize:css'],
    callback
    );
});