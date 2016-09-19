'use strict';

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    gprint = require('gulp-print'),
    notify = require('gulp-notify'),
    babel = require('gulp-babel'),
    lec = require('gulp-line-ending-corrector');

require('babel-plugin-transform-decorators-legacy');

var babelOptions = {
    presets: ['react', 'es2015', 'stage-2'],
    plugins: ['transform-decorators-legacy']
};

var paths = ['app'];
var gulpPaths = paths.map(function (path) {
    return './' + path + '/**/*.es6';
}).concat(['./gulpfile.es6', './index.es6']);

gulp.task('transpile-all', function () {
    gulp.src(gulpPaths, { base: './' }).pipe(babel(babelOptions)).pipe(rename({ extname: ".js" })).pipe(lec({ eolc: 'CRLF' })).pipe(gulp.dest('')).pipe(gprint(function (filePath) {
        return "File processed: " + filePath;
    }));
});

gulp.task('transpile-watch', function () {
    return gulp.watch(gulpPaths, function (obj) {
        if (obj.type === 'changed') {
            gulp.src(obj.path, { base: './' }).pipe(plumber({
                errorHandler: function errorHandler(error) {
                    //babel error - dev typed in in valid code
                    if (error.fileName) {
                        var fileParts = error.fileName.split('\\');
                        try {
                            notify.onError(error.name + ' in ' + fileParts[fileParts.length - 1])(error);
                        } catch (e) {} //gulp-notify may break if not run in Win 8
                        console.log(error.name + ' in ' + error.fileName);
                    } else {
                        notify.onError('Oh snap, file system error! :(')(error);
                    }

                    console.log(error.message);
                    this.emit('end');
                }
            })).pipe(babel(babelOptions)).pipe(rename({ extname: ".js" })).pipe(lec({ eolc: 'CRLF' })).pipe(gulp.dest('')).pipe(gprint(function (filePath) {
                return "File processed: " + filePath;
            }));
        }
    });
});