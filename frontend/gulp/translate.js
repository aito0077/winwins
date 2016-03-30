'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var gettext = require('gulp-angular-gettext');

gulp.task('pot', function () {
    return gulp.src([ path.join(conf.paths.src, '/app/**/*.html'),path.join(conf.paths.src, '/app/**/*.js')])
        .pipe(gettext.extract('template.pot', {
            // options to pass to angular-gettext-tools...
        }))
        .pipe(gulp.dest('po/'));
});

gulp.task('translations', function () {
    return gulp.src('po/**/*.po')
        .pipe(gettext.compile({
            // options to pass to angular-gettext-tools...
            //format: 'json'
        }))
        .pipe(gulp.dest(path.join(conf.paths.src, 'app/translations/')));
});


