var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var config = require('../config').coffee;

gulp.task('coffee', function() {
  gulp.src(config.src)
    .pipe(plumber())
    .pipe(coffee({ bare: true }).on('error', gutil.log))
    .pipe(gulp.dest(config.dest));
})