var gulp     = require('gulp');
var coffeelint = require('gulp-coffeelint');
var stylish = require('coffeelint-stylish')
var config   = require('../../config').coffeelint;


gulp.task('coffeelint', function() {
  return gulp.src(config.src)
    .pipe(coffeelint())
    .pipe(coffeelint.reporter(stylish));
    // .pipe(coffeelint.reporter('fail'));
});

gulp.task('coffeelint:watch', function() {
  gulp.watch(config.src, ['coffeelint']);
});
