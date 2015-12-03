var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');

var plugins = gulpLoadPlugins();

//target folders
var testFolder = './test';
var sassFolder = './app/sass';
var javascriptFolder = './app/javascripts';
var imagesFolder = './app/images';
var htmlFolder = './app/templates';
var publicFolder = './public';

//Testing
//Run all tests using mocha.
gulp.task('runTests', function() {
  return gulp.src(testFolder + '/*.js')
    .pipe(plugins.mocha());
});

gulp.task("lint", function() {
  return gulp.src(javascriptFolder + '/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter("default"));
});

gulp.task('styles', function() {
  return gulp.src(sassFolder + '/**/*.scss')
    .pipe(plugins.sass({
      outputStyle: 'compressed'
    }).on('error', plugins.sass.logError))
    .pipe(gulp.dest(publicFolder + '/stylesheets/'));
});

gulp.task('scripts', function() {
  return gulp.src(javascriptFolder + '/**/*.js')
    .pipe(plugins.uglify())
    .pipe(gulp.dest(publicFolder + '/javascripts/'));
});

gulp.task('images', function() {
  return gulp.src(imagesFolder + '/**/*.{png,jpg,gif,jpeg}')
    .pipe(plugins.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(publicFolder + '/images/'));
});

gulp.task('minify-html', function() {
  return gulp.src(htmlFolder + '/**/*.html')
    .pipe(plugins.minifyHtml({
      conditionals: true,
      spare: true
    }))
    .pipe(gulp.dest(publicFolder + '/templates/'));
});

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch(sassFolder + '/**/*.scss', ['styles']);
  // Watch .js files
  gulp.watch(javascriptFolder + '/**/*.js', ['scripts']);
  // Watch image files
  gulp.watch(imagesFolder + '/**/*.{png,jpg,gif,jpeg}', ['images']);
  // Watch .html files
  gulp.watch(htmlFolder + '/**/*.html', ['minify-html']);
});

gulp.task('default', ['styles', 'scripts', 'images', 'minify-html']);
