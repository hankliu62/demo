var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var config = require('../config');

gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: config.browserSync.src
    }
  });

  // 预处理
  gulp.watch(config.coffee.src, ['coffee']);
  gulp.watch(config.sass.src, ['sass']);

  gulp.watch(config.copy.html.src, ['copy:html']);

  // 合并压缩
  gulp.watch(config.coffee.dest + '**/*.js', ['uglifyJs']);
  gulp.watch(config.sass.dest + '**/*.css', ['minifyCss']);


  // 自动刷新
  gulp.watch(config.browserSync.watch.src, function() {
    reload();
  });
})
