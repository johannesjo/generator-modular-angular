'use strict';
/* jshint camelcase: false */

var config = require('./config');
var gulp = require('gulp');

/**
 * Dev Task File
 *
 */

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var wiredep = require('wiredep').stream;
var inj = require('gulp-inject');

var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var watch = require('gulp-watch');
var runSequence = require('run-sequence').use(gulp);

var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
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
        'buildStyles',
        'browserSync',
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
        'injectScripts',
        'injectStyles'
    );
});

gulp.task('watch', function ()
{
    watch(config.stylesF, function ()
    {
        gulp.start('buildStyles');
    });
    watch(config.scriptsF, function ()
    {
        gulp.start('injectScripts');
    });
    watch(config.scriptsAllF, function ()
    {
        gulp.start('lint');
    });

    watch(config.allHtmlF, function ()
    {
        gulp.start('html');
    });

    gulp.watch('bower.json', ['wiredep']);
});


gulp.task('buildStyles', function ()
{
    runSequence(
        'injectStyles',
        'sass'
    );
});

gulp.task('injectStyles', function ()
{
    var sources = gulp.src(config.stylesF, {read: false});
    var target = gulp.src(config.mainSassFile);
    var outputFolder = gulp.dest(config.styles);

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
        .pipe(outputFolder);
});


gulp.task('injectScripts', function ()
{
    var sources = gulp.src(config.scriptsF, {read: false});
    var target = gulp.src(config.mainFile);
    target
        .pipe(inj(sources,
            {
                ignorePath: config.base.replace('./', ''),
                addRootSlash: false
            }
        ))
        .pipe(gulp.dest(config.base))
        .pipe(reload({stream: true}));
});


gulp.task('sass', function ()
{
    var sources = gulp.src(config.mainSassFile);
    var outputFolder = gulp.dest(config.styles);

    sources
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(outputFolder)
        .pipe(reload({stream: true}))
        .on('error', swallowError)
});

gulp.task('browserSync', function ()
{
    browserSync({
        server: {
            baseDir: config.base,
            livereload: true
        }
    });
});

gulp.task('html', function ()
{
    gulp.src(config.allHtmlF)
        .pipe(reload({stream: true}));
});


gulp.task('wiredep', function ()
{
    gulp.src([config.mainFile], {base: './'})
        .pipe(wiredep({
            exclude: [],
            devDependencies: false
        }))
        .pipe(gulp.dest('./'));

    gulp.src([config.karmaConf], {base: './'})
        .pipe(wiredep({
            exclude: [],
            devDependencies: true
        }))
        .pipe(gulp.dest('./'));
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

gulp.task('lint', function ()
{
    gulp.src([
        config.scriptsAllF,
        './karma-e2e.conf.js',
        './karma.conf.js',
        './gulpfile.js'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jscs());
});


gulp.task('e2e', [
    'browserSync',
    'protractor'
]);
