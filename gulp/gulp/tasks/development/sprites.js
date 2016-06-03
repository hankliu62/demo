var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var config = require('../../config').sprites;

/**
 * Generate sprite and css file from PNGs
 */
 gulp.task('sprites', function() {
  var spritesDate = gulp.src(config.src).pipe(spritesmith(config.options));
  spritesDate.img.pipe(gulp.dest(config.dest.image));
  spritesDate.css.pipe(gulp.dest(config.dest.css));
 });
