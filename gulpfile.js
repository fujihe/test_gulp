var gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
browserSync = require('browser-sync'),
pngquant = require('imagemin-pngquant'),
mozjpeg = require('imagemin-mozjpeg'),
del = require('del');

gulp.task('sass', function() {
  gulp.src('./src/sass/**/*.sass')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({outputStyle: 'compressed'}))
    .pipe($.autoprefixer())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./common/css/'));
});
gulp.task('compress', function() {
  gulp.src('./src/js/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('./common/js/'));
});
gulp.task('imagemin', function() {
  rulp.src('./src/images/**/*')
    .pipe($.plumber())
    .pipe($.imagemin([
      pngquant({
        quality: '65-80',
        speed: 1,
        floyd: 0
      }),
      mozjpeg({
        quality: 85,
        progressive: true
      }),
      $.imagemin.svgo(),
      $.imagemin.optipng(),
      $.imagemin.gifsicle()
    ]))
    .pipe(gulp.dest('./common/images/'));
})
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
  gulp.src(['./src/images/**/*'])
  .pipe(gulp.dest('./common/images/'));
});
gulp.task('clean', function() {
  del(['./common/images/**', './common/css/**']);
});

gulp.task('watch', ['sass', 'browser-sync'], function() {
  gulp.watch('./src/sass/**/*.sass', ['sass']);
  gulp.watch('./src/js/*.js', ['compress']);
  gulp.watch('./**/*.html', ['bs-reload']);
  gulp.watch('./common/css/**/*', ['bs-reload']);
  gulp.watch('./common/images/**/*', ['bs-reload']);
  gulp.watch('./common/js/*', ['bs-reload']);
});
gulp.task('default', ['watch', 'compress', 'browser-sync', 'clean', 'copy']);