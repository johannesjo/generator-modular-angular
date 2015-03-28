var config = require('./config');
var gulp = require('gulp');

/**
 * Build-Task Files
 *
 * NOTE: Depends on sme of the dev-tasks as well
 */


var del = require('del');
var gulpif = require('gulp-if');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var useref = require('gulp-useref');
var rsync = require('rsyncwrapper').rsync;
var ngAnnotate = require('gulp-ng-annotate');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence');


// main task
gulp.task('build', function (callback)
{
    runSequence(
        'cleanDist',
        'wiredep',
        'wiredep',
        'inj',
        'testSingle',
        'jshint',
        'sass',
        'minFiles',
        'copy',
        'deploy',
        callback);
});

gulp.task('deploy', function ()
{
    rsync({
        ssh: true,
        src: config.dist,
        recursive: true,
        dest: config.wwwDestination,
        syncDest: true,
        args: ['--verbose']
    }, function (error, stdout, stderr)
    {
        console.log(error);
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('cleanDist', function ()
{
    return del(config.dist);
});


gulp.task('copy', function ()
{
    gulp.src(config.htmlF, {base: config.base})
        .pipe(minifyHtml({
            conditionals: true
        }))
        .pipe(gulp.dest(config.dist));

    gulp.src(config.fontsF, {base: config.base})
        .pipe(gulp.dest(config.dist));

    gulp.src(config.imagesF, {base: config.base})
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(config.dist));
});


gulp.task('minFiles', function ()
{
    var assets = useref.assets();
    return gulp.src(config.mainFile)
        .pipe(assets)
        .pipe(gulpif('*.js', ngAnnotate()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(config.dist));
});
