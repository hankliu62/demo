var gulp = require('gulp');
var config = require('../config').copy;

gulp.task('copy:html', function() {
  gulp.src(config.html.src)
    .pipe(gulp.dest(config.html.dest))
});

gulp.task('copy:favicon', function() {
  gulp.src(config.favicon.src)
    .pipe(gulp.dest(config.favicon.dest))
});

gulp.task('copy:images', function() {
  gulp.src(config.images.src)
    .pipe(gulp.dest(config.images.dest))
});

gulp.task('copy', ['copy:html', 'copy:images', 'copy:favicon']);