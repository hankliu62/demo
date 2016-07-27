var gulp = require('gulp');
var symlink = require('gulp-symlink');
var config = require('../config').symlink;

gulp.task('symlink:pre-commit', function() {
  gulp.src(config.src)
    .pipe(symlink(config.dest, { force: true }));
})