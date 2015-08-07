var config = require('./config');
var gulp = require('gulp');

/**
 * Cordova-Build-Task Files
 *
 * NOTE: Depends on some of the build-tasks as well
 * inspired by:
 * @url https://github.com/kamrik/CordovaGulpTemplate
 */

var plugins = ['org.apache.cordova.file'];

var path = require('path');
var shell = require('gulp-shell');
var runSequence = require('run-sequence').use(gulp);
var symlink = require('gulp-symlink');
var argv = require('yargs').argv;

function platformArg() {
    return (argv.platform || config.defaultPlatform);
}

gulp.task('cordovaDev', function () {
    runSequence(
        'cleanDist',
        'symlinkApp',
        'cordovaEmulate'
    );
});


gulp.task('cordovaDevOnDevice', function () {
    runSequence(
        'cleanDist',
        'symlinkApp',
        'cordovaRun'
    );
});


gulp.task('cordovaEmulate', shell.task([
    config.cordovaPath + ' emulate ' + platformArg() + ' -l -s -c'
]));


gulp.task('cordovaRun', shell.task([
    config.cordovaPath + ' run ' + platformArg() + ' -l -s -c'
]));


gulp.task('symlinkApp', function () {
    gulp.src(config.base)
        .pipe(symlink(config.dist));
});


gulp.task('buildCordova', shell.task([
    config.cordovaPath + ' build ' + platformArg() + ''
]));

