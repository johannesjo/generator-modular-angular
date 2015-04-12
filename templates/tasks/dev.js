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
var reload = browserSync.reload;
var watch = require('gulp-watch');
var runSequence = require('run-sequence').use(gulp);

var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var karma = require('gulp-karma');


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
        'test',
        'browserSync',
        'watch'
    );
});
gulp.task('serve', ['default']);
gulp.task('server', ['default']);

gulp.task('injectAll', function (callback)
{
    runSequence(
        'wiredep',
        'injectScripts',
        'injectStyles',
        callback
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
        .pipe(gulp.dest(config.base));
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
        .pipe(gulp.dest(config.tmp))
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
    gulp.src(config.karmaConf, {base: './'})
        .pipe(wiredep({
            devDependencies: true
        }))
        // required as weird workaround for not messing up the files
        .pipe(gulp.dest(config.tmp))
        .pipe(gulp.dest('./'));

    return gulp.src(config.mainFile, {base: './'})
        .pipe(wiredep({
            devDependencies: false
        }))
        // required as weird workaround for not messing up the files
        .pipe(gulp.dest(config.tmp))
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
