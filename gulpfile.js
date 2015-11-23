var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');

var plugins = gulpLoadPlugins();

//target folder of tests
var testFolder = './test';

//Testing
//Run all tests using mocha.
gulp.task('runTests', function() {
  return gulp.src(testFolder + '/*.js')
    .pipe(plugins.mocha());
})
