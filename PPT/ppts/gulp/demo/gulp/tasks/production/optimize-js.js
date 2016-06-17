var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var config = require('../../config').optimize.js;

gulp.task('optimize:js', function() {
  return gulp.src(config.src)
      .pipe(uglify(config.options))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(config.dest));
})