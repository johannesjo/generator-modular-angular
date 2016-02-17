'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var exec = require('child_process').exec;
var fs = require('fs');


describe('gulp inject', function() {
    var instancePath = path.join(__dirname, '../.test-instance');
    var gulp = '$(which gulp)';
    this.timeout(20000);


    describe('styles', function() {
        var mainScss = path.join(instancePath, 'app/styles/main.scss');
        var injectStylesCmd = gulp + ' injectStyles';

        describe('scss partials in styles folder', function() {
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
                [mainScss, /placeholders\/_some-placeholder\.scss/]
            ];
            var expected = [
                mainScss
            ];

            beforeEach(function(done) {
                fs.truncateSync(mainScss);
                fs.writeFileSync(mainScss, '// inject:sass\n\n// endinject');
                exec(injectStylesCmd, {
                    cwd: instancePath
                }, function() {
                    done();
                });
            });

            it('adds imports for default files', function() {
                assert.file([].concat(
                    expected
                ));
                assert.fileContent([].concat(
                    expectedContent
                ));
            });
        });
    });

    describe('scripts', function() {
        var mainHtml = path.join(instancePath, 'app/index.html');
        var injectScriptsCmd = gulp + ' injectScripts';
        var cachedMainFileContent;

        describe('scripts into index.html', function() {
            var expectedContent = [
                [mainHtml, /_app\.js/],
                [mainHtml, /routes\.js/],
            ];
            var expected = [
                mainHtml
            ];

            beforeEach(function(done) {
                cachedMainFileContent = fs.readFileSync(mainHtml, 'utf8');
                fs.truncateSync(mainHtml);
                fs.writeFileSync(mainHtml, '<!-- inject:js -->\n<!-- endinject -->');
                exec(injectScriptsCmd, {
                    cwd: instancePath
                }, function() {
                    done();
                });
            });

            afterEach(function() {
                // restore old html
                fs.truncateSync(mainHtml);
                fs.writeFileSync(mainHtml, cachedMainFileContent);
            });

            it('adds imports for script files', function() {
                assert.file([].concat(
                    expected
                ));
                assert.fileContent([].concat(
                    expectedContent
                ));
            });
        });
    });


    describe('wiredep', function() {
        var mainHtml = path.join(instancePath, 'app/index.html');
        var wiredepCmd = gulp + ' wiredep';
        var cachedMainFileContent;

        describe('bower-components into index.html', function() {
            var expectedContent = [
                [mainHtml, /bower_components\/angular\/angular\.js/],
                [mainHtml, /bower_components\/angular-animate\/angular-animate\.js/],
                [mainHtml, /bower_components\/angular-aria\/angular-aria\.js/],
                [mainHtml, /bower_components\/angular-aria\/angular-aria\.js/],
                [mainHtml, /bower_components\/angular-resource\/angular-resource\.js/],
                [mainHtml, /bower_components\/angular-ui-router\/release\/angular-ui-router\.js/],
            ];
            var expected = [
                mainHtml
            ];

            beforeEach(function(done) {
                cachedMainFileContent = fs.readFileSync(mainHtml, 'utf8');
                fs.truncateSync(mainHtml);
                fs.writeFileSync(mainHtml, '<!-- bower:js -->\n<!-- endbower -->');
                exec(wiredepCmd, {
                    cwd: instancePath
                }, function() {
                    done();
                });
            });

            afterEach(function() {
                // restore old html
                fs.truncateSync(mainHtml);
                fs.writeFileSync(mainHtml, cachedMainFileContent);
            });

            it('adds imports for bower-components', function() {
                assert.file([].concat(
                    expected
                ));
                assert.fileContent([].concat(
                    expectedContent
                ));
            });
        });
    });
});