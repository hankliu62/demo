var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var config   = require('../../config').coffee;

gulp.task('coffee', function() {
  gulp.src(config.src)
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(config.dest));
});

gulp.task('coffee:watch', function() {
  gulp.watch(config.src, ['coffee']);
});