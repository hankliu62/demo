// var gulp = require('gulp');
// var scss = require('gulp-sass');
// var config   = require('../../config').scss;

// gulp.task('scss', function () {
//   return gulp.src(config.src)
//     .pipe(sass.sync().on('error', sass.logError))
//     .pipe(gulp.dest(config.dest));
// });

// gulp.task('sass:watch', function () {
//   gulp.watch(config.src, ['scss']);
// });

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
// var minifycss = require('gulp-minify-css');
var config = require('../../config').sass;

gulp.task('sass', function() {
  sass(config.src)
      .on('error', sass.logError)
      // .pipe(minifycss(config.cssMin.options))
      .pipe(autoprefixer(config.autoprefixer.options))
      .pipe(gulp.dest(config.dest));
});

gulp.task('sass:watch', function() {
  gulp.watch(config.src, ['sass']);
});