var gulp = require('gulp');
var config = require('../../config').copy;

gulp.task('copy:html', function(){
  return gulp.src(config.html.src)
      .pipe(gulp.dest(config.html.dest));
});

gulp.task('copy:images', function() {
  return gulp.src(config.image.src)
      .pipe(gulp.dest(config.image.dest));
})