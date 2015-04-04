'use strict';
var path = require('path');
var assert = require('assert');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('moda generator', function ()
{
    // not testing the actual run of generators yet
    it('can be required without throwing', function ()
    {
        this.app = require('../app');
    });

    describe('basic file creation', function ()
    {

        var expectedContent = [
            ['gulpfile.js', /tasks/],
            ['app/index.html', /main\.css/],
            ['bower.json', /angular/],
            ['package.json', /gulp/]
        ];
        var expected = [
            '.editorconfig',
            '.gitignore',
            'package.json',
            'bower.json',
            '.bowerrc',
            'gulpfile.js',
            'config.xml',
            '.jshintrc',
            '.travis.yml',
            'karma.conf.js',
            'karma-e2e.conf.js',
            'app/index.html',
            'app/scripts/_app.js',
            'app/scripts/_app.spec.js',
            'tasks/config.js',
            'tasks/cordova.js',
            'tasks/deploy.js',
            'tasks/build.js',
            'tasks/dev.js'
        ];

        var options = {
            'skip-install-message': true,
            'skip-install': true,
            'skip-welcome-message': true,
            'skip-message': true
        };

        var runGen;

        beforeEach(function ()
        {
            runGen = helpers
                .run(path.join(__dirname, '../app'))
                .inDir(path.join(__dirname, '.tmp'))
        });

        it('creates expected files', function (done)
        {
            runGen.withOptions(options).on('end', function ()
            {

                assert.file([].concat(
                    expected
                ));
                assert.noFile([
                    'app/styles/main.css'
                ]);
                assert.fileContent(expectedContent);
                //assert.noFileContent([
                //]);
                done();
            });
        });
    });


    describe('module file creation and app.js injection', function ()
    {

        var expectedContent = [
            ['gulpfile.js', /tasks/],
            ['app/index.html', /main\.css/],
            ['bower.json', /angular/],
            ['package.json', /gulp/],
            ['app/scripts/_app.js', /ngAnimate/],
            ['app/scripts/_app.js', /ngAria/],
            ['app/scripts/_app.js', /ngCookies/],
            ['app/scripts/_app.js', /ngMessages/],
            ['app/scripts/_app.js', /ngResource/],
            ['app/scripts/_app.js', /ngRoute/],
            ['app/scripts/_app.js', /ngSanitize/],
            ['app/scripts/_app.js', /ngTouch/],
            ['app/scripts/_app.js', /ui.router/],
            ['app/scripts/_app.js', /ngMaterial/],
            ['app/scripts/_app.js', /ngFabForm/]
        ];
        var expected = [
            '.editorconfig',
            '.gitignore',
            'package.json',
            'bower.json',
            '.bowerrc',
            'gulpfile.js',
            'config.xml',
            '.jshintrc',
            '.travis.yml',
            'karma.conf.js',
            'karma-e2e.conf.js',
            'app/index.html',
            'app/scripts/_app.js',
            'app/scripts/_app.spec.js',
            'tasks/config.js',
            'tasks/cordova.js',
            'tasks/deploy.js',
            'tasks/build.js',
            'tasks/dev.js'
        ];

        var options = {
            'skip-install-message': true,
            'skip-install': true,
            'skip-welcome-message': true,
            'skip-message': true
        };

        var runGen;

        beforeEach(function ()
        {
            runGen = helpers
                .run(path.join(__dirname, '../app'))
                .inDir(path.join(__dirname, '.tmp'))
        });

        it('creates expected files', function (done)
        {
            runGen
                .withOptions(options)
                .withPrompts({
                    modules: [
                        'animateModule',
                        'ariaModule',
                        'cookiesModule',
                        'messagesModule',
                        'resourceModule',
                        'routeModule',
                        'uiRouterModule',
                        'ngFabFormModule',
                        'sanitizeModule',
                        'ngMaterialModule',
                        'touchModule'
                    ]
                })
                .on('end', function ()
                {

                    assert.file([].concat(
                        expected
                    ));
                    assert.noFile([
                        'app/styles/main.css'
                    ]);
                    assert.fileContent(expectedContent);
                    //assert.noFileContent([
                    //]);
                    done();
                });
        });
    });
});


