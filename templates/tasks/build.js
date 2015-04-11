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
var ngAnnotate = require('gulp-ng-annotate');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence').use(gulp);
var wiredep = require('wiredep').stream;


// main task
gulp.task('build', function (callback)
{
    return runSequence(
        'cleanDist',
        'wiredepBuild',
        'injectAll',
        'testSingle',
        'lint',
        'sass',
        'minFiles',
        'copy',
        callback);
});

gulp.task('wiredepBuild', function ()
{
    return gulp.src([config.karmaConf, config.mainFile], {base: './'})
        .pipe(wiredep({
            exclude: [
                // TODO inject excluded
            ],
            devDependencies: false
        }))
        .pipe(gulp.dest('./'));
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

    // TODO this ain't perfect
    return gulp.src(config.imagesF, {base: config.base})
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
