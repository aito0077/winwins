'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var ngConstant = require('gulp-ng-constant');

gulp.task('config', function () {
  var myConfig = require('../config.json');
  var envConfig = myConfig['constants'][process.env.NODE_ENV];
  return ngConstant({
      name: myConfig.name,
      deps: myConfig.deps,
      constants: envConfig,
      stream: true
    }).pipe(gulp.dest('src/app/'));
});
