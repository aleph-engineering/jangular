'use strict'

var gulp = require('gulp');
var coffeeify = require('gulp-coffeeify');
var concat = require('gulp-concat');

gulp.task('coffeeify', function() {
    gulp.src('src/**/*.coffee')
        .pipe(coffeeify())
        .pipe(concat('jangular.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('coffeeify_spec', function() {
    gulp.src('spec/**/*.coffee')
        .pipe(coffeeify())
        .pipe(concat('jangular.spec.js'))
        .pipe(gulp.dest('tmp'));
});

gulp.task('build', [
   'coffeeify'
]);
