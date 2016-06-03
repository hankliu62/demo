var gulp = require('gulp');

gulp.task('watch', ['sass:watch', 'coffeelint:watch', 'coffee:watch'])