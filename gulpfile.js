var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var del = require('del');

gulp.task('sass', function() {
  gulp.src('./src/sass/**/*.sass')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({outputStyle: 'expanded'}))
    .pipe($.autoprefixer())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./common/css/'));
});
gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});
gulp.task('browser-sync', function() {
  browserSync( {
    server: {
      baseDir: '.'
    },
    open: 'external',
    port: 8100
  });
});
gulp.task('bs-reload', function() {
  browserSync.reload();
});
gulp.task('copy', function() {
  gulp.src(['./src/images/**'])
  .pipe(gulp.dest('./common/images/'))
});
gulp.task('clean', function() {
  del(['./common/images/**', './common/css/**']);
});

gulp.task('sass-watch', ['sass', 'browser-sync'], function() {
  gulp.watch('./**/*.html', ['bs-reload']);
  gulp.watch('./common/css/*.css', ['bs-reload']);
  gulp.watch('./common/images/**', ['bs-reload']);
  gulp.watch('./common/js/*.js', ['bs-reload']);
  gulp.watch('./sass/**/*.sass', ['bs-reload']);
  var watcher = gulp.watch('./sass/**/*.sass', ['sass']);
  watcher.on('change', function(event) {
    console.log('compile ok!');
  });
});
gulp.task('default', ['sass-watch', 'browser-sync', 'clean', 'copy']);