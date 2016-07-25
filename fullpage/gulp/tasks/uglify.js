var gulp = require('gulp');
var uglify = require('gulp-uglify');
var config = require('../config').uglify;

gulp.task('uglify:dev', function() {
  gulp.src(config.dev.src)
    .pipe(uglify());
});
