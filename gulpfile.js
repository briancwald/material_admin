'use strict';
/*global require:true*/
/*jshint esversion: 6 */
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
var gulpCopy = require('gulp-copy');
var replace = require('gulp-replace');
var $ = require('gulp-load-plugins')();
var refresh = require('gulp-refresh');
// provide a paht to node modules 
var sassPaths = [
  'node_modules'
];
// Copy materialize and tablesaw libraries.
gulp.task('libsrc', function() {
  gulp.src([
      'node_modules/materialize-css/dist/js/materialize.min.js'
    ])
    .pipe(gulpCopy('js/vendor', { prefix: 4 }));
  gulp.src([
      'node_modules/tablesaw/dist/stackonly/tablesaw.stackonly.jquery.js'
    ])
    .pipe(gulpCopy('js/lib', { prefix: 4 }));
  gulp.src([
      'node_modules/tablesaw/dist/tablesaw-init.js'
    ])
    .pipe(gulpCopy('js/lib', { prefix: 3 }));
});
// Rename functions that conflict with jQueryUI; then move to source control folder js/lib
gulp.task('rename', function() {
  gulp.src(['js/vendor/materialize.min.js'])
    .pipe(replace('fn.autocomplete', 'fn.autocomplete_materialize'))
    .pipe(replace('r.autocomplete', 'r.autocomplete_materialize'))
    .pipe(replace('fn.tabs', 'fn.tabs_materialize'))
    .pipe(replace('.tabs(', '.tabs_materialize('))
    .pipe(gulp.dest('js/lib'));
});
gulp.task('sass', function() {
  return gulp.src(['scss/**/**.scss'])
    .pipe(sassLint({
      configFile: 'scss/.sass-lint.yml',
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.identityMap())
    .pipe($.sass({
        includePaths: sassPaths
      })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('css'))
    .pipe(refresh());
});
gulp.task('lint', function() {
  return gulp.src(['./js/*.js', '!./js/vendor.all.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
gulp.task('default', ['sass'], function() {
  refresh.listen();
  gulp.watch(['scss/**/*.scss'], ['sass']);
});
