'use strict';
/* jshint camelcase: false */

var config = require('./config');
var gulp = require('gulp');

/**
 * Dev Task File
 *
 */

var sass = require('gulp-sass');
var wiredep = require('wiredep').stream;
var inj = require('gulp-inject');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var runSequence = require('run-sequence').use(gulp);

var jshint = require('gulp-jshint');
var karma = require('gulp-karma');
var webdriver_standalone = require('gulp-protractor').webdriver_standalone;
var protractor = require('gulp-protractor').protractor;
gulp.task('webdriver_standalone', webdriver_standalone);


function swallowError(error)
{
    console.log(error.toString());
    this.emit('end');
}

// main task
gulp.task('default', function ()
{
    runSequence(
        'injectAll',
        'connect',
        'test',
        'watch'
    );
});
gulp.task('serve', ['default']);
gulp.task('server', ['default']);

gulp.task('injectAll', function ()
{
    runSequence(
        'wiredep',
        'inject',
        'sass'
    );
});

gulp.task('watch', function ()
{
    watch(config.stylesF, function ()
    {
        gulp.start('sass');
    });
    watch(config.scriptsF, function ()
    {
        gulp.start('inject');
    });
    watch(config.scriptsAllF, function ()
    {
        gulp.start('jshint');
    });

    watch(config.allHtmlF, function ()
    {
        gulp.start('html');
    });

    gulp.watch('bower.json', ['wiredep']);
});


gulp.task('sass', function (done)
{
    var sources = gulp.src(config.stylesF, {read: false});
    var target = gulp.src(config.mainSassFile);

    target
        .pipe(inj(sources,
            {
                starttag: '// inject:sass',
                endtag: '// endinject',
                ignorePath: [config.base.replace('./', ''), 'styles'],
                relative: true,
                addRootSlash: false,
                transform: function (filepath)
                {
                    if (filepath) {
                        return '@import  \'' + filepath + '\';';
                    }
                }
            }
        ))
        .pipe(gulp.dest(config.styles))
        .pipe(sass())
        .on('error', swallowError)
        .pipe(gulp.dest(config.styles))
        .pipe(connect.reload())
        .pipe(gulp.dest(config.styles))
        .on('end', done);
});


gulp.task('connect', function ()
{
    return connect.server({
        root: config.base,
        livereload: true
    });
});


gulp.task('html', function ()
{
    return gulp.src(config.allHtmlF)
        .pipe(connect.reload());
});


gulp.task('wiredep', function ()
{
    gulp.src([config.karmaConf, config.mainFile], {base: './'})
        .pipe(wiredep({
            exclude: [
                // TODO inject excluded
            ],
            devDependencies: true
        }))
        .pipe(gulp.dest('./'));
});


gulp.task('inject', function ()
{
    var sources = gulp.src(config.scriptsF, {read: false});

    gulp.src(config.mainFile)
        .pipe(inj(sources,
            {
                ignorePath: config.base.replace('./', ''),
                addRootSlash: false
            }
        ))
        .pipe(gulp.dest(config.base))
        .pipe(connect.reload());
});


gulp.task('test', function ()
{
    // Be sure to return the stream
    gulp.src('.nonononoNOTHING')
        .pipe(karma({
            configFile: './karma.conf.js',
            action: 'watch'
        }))
        .on('error', function (err)
        {
            throw err;
        })
        .on('error', swallowError);
});

gulp.task('testSingle', function ()
{
    // Be sure to return the stream
    gulp.src('.nonononoNOTHING')
        .pipe(karma({
            configFile: './karma.conf.js',
            action: 'run'
        }))
        .on('error', function (err)
        {
            throw err;
        });
});


gulp.task('protractor', function ()
{
    // Be sure to return the stream
    gulp.src('.nonononoNOTHING')
        .pipe(protractor({
            configFile: './karma-e2e.conf.js',
            args: ['--baseUrl', e2eBaseUrl]
        }))
        .on('error', function (e)
        {
            throw e;
        });
});

gulp.task('jshint', function ()
{
    gulp.src([
        config.scriptsAllF,
        './karma-e2e.conf.js',
        './karma.conf.js',
        './gulpfile.js'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('e2e', [
    'connect',
    'protractor'
]);



