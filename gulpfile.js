var gulp     = require('gulp');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
var gulpCopy = require('gulp-copy');
var concat   = require('gulp-concat');
var $        = require('gulp-load-plugins')();

var sassPaths = [
  'node_modules'
];

// provides a method to manage vendor js in dev as there are version updates
gulp.task('copy', function() {
return gulp.src([
  'node_modules/materialize-css/dist/js/materialize.min.js',
  'node_modules/materialize-clockpicker/dist/js/materialize.clockpicker.js',
  'node_modules/tablesaw/dist/stackonly/tablesaw.stackonly.jquery.js',
  'node_modules/tablesaw/dist/tablesaw-init.js'
  ])
  .pipe(gulpCopy('js/lib',{prefix: 4}));
});

gulp.task('sass', function() {
  return gulp.src(['scss/material_admin.scss','scss/libraries.scss'])
    .pipe($.sass({
      sourceComments: 'map',
      sourceMap: 'sass',
      includePaths: sassPaths,
      outputStyle: 'nested'
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('lint', function() {
  return gulp.src(['./js/*.js', '!./js/vendor.all.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', ['sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});
