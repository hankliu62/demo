var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var config = require('../config').concat;

gulp.task('uglifyJs:dev', function() {
  gulp.src(config.js.src)
    .pipe(concat(config.js.source))
    .pipe(uglify())
    .pipe(gulp.dest(config.js.dest));
});

gulp.task('uglifyJs:vendor', function() {
  gulp.src(config.js.src)
    .pipe(concat(config.js.source))
    .pipe(uglify())
    .pipe(gulp.dest(config.js.dest));
});

gulp.task('minifyCss', function() {
  gulp.src(config.css.src)
    .pipe(concat(config.css.source))
    .pipe(minifyCss())
    .pipe(gulp.dest(config.css.dest));
});

gulp.task('concat', ['uglifyJs', 'minifyCss']);