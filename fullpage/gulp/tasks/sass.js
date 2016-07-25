var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var config = require('../config').sass;

gulp.task('sass', function() {
  sass(config.src)
    .on('error', sass.logError)
    .pipe(plumber())
    .pipe(autoprefixer(config.autoprefixer.options))
    .pipe(gulp.dest(config.dest));
})