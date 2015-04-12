'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var exec = require('child_process').exec;
var fs = require('fs');


describe('gulp buildStyles', function ()
{
    var instancePath = path.join(__dirname, '../.test-instance');
    var gulp = '$(which gulp)';
    this.timeout(20000);
    var stylesDir = path.join(instancePath, 'app/styles');
    var testFileInStylesDir = path.join(stylesDir, 'base/_test.scss');
    var testFileInScritsDir = path.join(instancePath, 'app/scripts/_test.scss');
    var mainScss = path.join(stylesDir, 'main.scss');
    var mainCss = path.join(stylesDir, 'main.css');
    var injectStylesCmd = gulp + ' injectStyles';
    var sassCmd = gulp + ' sass';


    describe('autoprefixer, sourcemap as base 64 and general compilation', function ()
    {
        var expectedContent = [
            [mainScss, /_variables/],
            [mainScss, /base\/_buttons\.scss/],
            [mainScss, /base\/_fonts\.scss/],
            [mainScss, /base\/_forms\.scss/],
            [mainScss, /base\/_icons\.scss/],
            [mainScss, /base\/_lists\.scss/],
            [mainScss, /base\/_page\.scss/],
            [mainScss, /base\/_tables\.scss/],
            [mainScss, /base\/_typography\.scss/],
            [mainScss, /functions\/_some-function\.scss/],
            [mainScss, /mixins\/_some-mixin\.scss/],
            [mainScss, /placeholders\/_some-placeholder\.scss/],
            [mainScss, /base\/_test\.scss/],
            [mainScss, /\.\.\/scripts\/_test\.scss/],
            [mainCss, /\.styles/],
            [mainCss, /\.scripts/],
            [mainCss, /color: blue;/],
            [mainCss, /sourceMappingURL=data:application\/json;base64/]
        ];

        beforeEach(function (done)
        {
            fs.truncateSync(mainScss);
            fs.writeFileSync(testFileInScritsDir, '.scripts-class{color:blue;}');
            fs.writeFileSync(testFileInStylesDir, '.styles-class{background: linear-gradient(to bottom right, yellow, green);}');
            fs.writeFileSync(mainScss, '// inject:sass\n\n// endinject');
            exec(injectStylesCmd, {
                cwd: instancePath
            }, function (err, stdout)
            {
                exec(sassCmd, {
                    cwd: instancePath
                }, function (err, stdout)
                {
                    done();
                });
            });
        });

        afterEach(function ()
        {
            fs.unlinkSync(testFileInScritsDir);
            fs.unlinkSync(testFileInStylesDir);
        });

        it('creates expected files', function ()
        {
            assert.file([
                mainCss,
                mainScss,
                testFileInScritsDir,
                testFileInStylesDir
            ]);
            assert.fileContent([].concat(
                expectedContent
            ));
        });
    });
});