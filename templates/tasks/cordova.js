var config = require('./config');
var gulp = require('gulp');

/**
 * Cordova-Build-Task Files
 *
 * NOTE: Depends on sme of the build-tasks as well
 * inspired by:
 * @url https://github.com/kamrik/CordovaGulpTemplate
 */

var plugins = ['org.apache.cordova.file'];
var testPlatform = 'android';

var path = require('path');
var pkg = require('../package.json');
var cordova_lib = require('cordova-lib');
var cdv = cordova_lib.cordova.raw;
var runSequence = require('run-sequence');
var symlink = require('gulp-symlink');


gulp.task('buildCordova', function ()
{
    runSequence(
        'build',
        function ()
        {
            process.chdir(config.dist);
            return cdv.build();
        }
    );
});


gulp.task('run', function (cb)
{
    runSequence(
        'cleanDist',
        'symlinkApp',
        function ()
        {
            process.chdir(config.dist);
            return cdv.run({platforms: [testPlatform], options: ['--device']});
        }
    );
});


gulp.task('emulate', function ()
{
    runSequence(
        'cleanDist',
        'symlinkApp',
        function ()
        {
            process.chdir(config.dist);
            return cdv.emulate({platforms: [testPlatform]});
        }
    );
});


gulp.task('releaseCordova', function ()
{
    runSequence(
        'build',
        'releaseCordovaReal',
        function ()
        {
            gulp.src('./platforms/android/ant-build/*.apk')
                .pipe(gulp.dest('./release/android/'));
        }
    );
});

gulp.task('releaseCordovaReal', function ()
{
    process.chdir(config.dist);
    return cdv.build({options: ['--release']});
});


gulp.task('symlinkApp', function ()
{
    return gulp.src(config.base)
        .pipe(symlink(config.dist));
});

