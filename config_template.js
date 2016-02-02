/**
 * Created by Vadim on 1/21/16.
 */
'use strict';

var lazypipe = require('lazypipe');
var sass = require('gulp-sass');
var less = require('gulp-less');
var gif = require('gulp-if');

function stringEndsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function isScssFile(file) {
    return stringEndsWith(file.relative, 'scss');
}

function isLessFile(file) {
    return stringEndsWith(file.relative, 'less');
}

var styleTransforms = lazypipe()
    .pipe(function () {
        return gif(isScssFile, sass());
    })
    .pipe(function () {
        return gif(isLessFile, less());
    });

{MODULE.EXPORTS}