var gulp     = require('gulp');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
var $        = require('gulp-load-plugins')();

var sassPaths = [
  'node_modules/materialize-css/sass'
];

gulp.task('sass', function() {
  return gulp.src('scss/dfs_admin.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('lint', function() {
  return gulp.src('./js/*.js' )
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', ['sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});
