'use strict';

var gulp = require('gulp');
var plug = require('gulp-load-plugins')();

gulp.task('htmlhint', function() {
  return gulp.src('src/index.html')
    .pipe(plug.htmlhint())
    .pipe(plug.htmlhint.reporter());
});

gulp.task('jshint', function() {
  return gulp.src('src/app/*.js')
    .pipe(plug.jshint())
    .pipe(plug.jshint.reporter());
});

gulp.task('sass', function() {
  return gulp.src('src/css/base.scss')
    .pipe(plug.sass().on('error', plug.sass.logError))
    .pipe(plug.sass({
      outputStyle: 'compressed'
    }))
    .pipe(plug.rename('main.min.css'))
    .pipe(gulp.dest('src/dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/index.html', ['htmlhint']);
  gulp.watch('src/app/*.js', ['jshint']);
  gulp.watch('src/css/*.scss', ['sass']);
});

gulp.task('default', ['htmlhint', 'jshint', 'watch']);