var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var config = require('../../config').optimize.css;

gulp.task('optimize:css', function() {
  return gulp.src(config.src)
      .pipe(minifycss(config.options))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(config.dest));
});
