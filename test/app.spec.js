'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('moda generator', function ()
{
    var alwaysExpected = [
        '.editorconfig',
        '.gitignore',
        '.gitattributes',
        'package.json',
        'bower.json',
        '.bowerrc',
        'gulpfile.js',
        'config.xml',
        '.jshintrc',
        '.jscsrc',
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
        'tasks/dev.js',
        'tasks/e2e.js'
    ];

    var alwaysExpectedContent = [
        ['gulpfile.js', /tasks/],
        ['app/index.html', /main\.css/],
        ['bower.json', /angular/],
        ['package.json', /gulp/],
        ['app/styles/main.scss', /\/\/ inject:sass/],
        ['app/styles/main.scss', /\/\/ endinject/],
    ];


    it('can be required without throwing', function ()
    {
        this.app = require('../app');
    });

    describe('basic file creation', function ()
    {

        var expectedContent = alwaysExpectedContent
            .slice()
            .concat([]);

        var expected = alwaysExpected
            .slice()
            .concat([]);

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
                assert.file(expected);
                assert.noFile([
                    'app/styles/main.css'
                ]);
                assert.fileContent(expectedContent);
                done();
            });
        });
    });


    describe('module file creation and app.js injection', function ()
    {

        var expectedContent = alwaysExpectedContent
            .slice()
            .concat([
                // cfg
                ['.yo-rc.json', /"uiRouter": true/],

                    // module injection
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
                ['app/scripts/_app.js', /ngFabForm/],

                ['bower.json', /angular-animate/],
                ['bower.json', /angular-aria/],
                ['bower.json', /angular-cookies/],
                ['bower.json', /angular-messages/],
                ['bower.json', /angular-resource/],
                ['bower.json', /angular-route/],
                ['bower.json', /angular-sanitize/],
                ['bower.json', /angular-touch/],
                ['bower.json', /ui-router/],
                ['bower.json', /angular-material/],
                ['bower.json', /ng-fab-form/]
            ]);

        var expected = alwaysExpected
            .slice()
            .concat([]);

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
                    done();
                });
        });
    });


    describe('route files with ui router', function ()
    {

        var expectedContent = alwaysExpectedContent
            .slice()
            .concat([
                // module injection
                ['app/scripts/_app.js', /ui.router/],
                ['bower.json', /ui-router/],
                ['.yo-rc.json', /"uiRouter": true/],
                ['app/scripts/routes.js', '/* STATES-NEEDLE - DO NOT REMOVE THIS */']
            ]);

        var expected = alwaysExpected
            .slice()
            .concat([
                'app/scripts/routes.js',
                'app/scripts/routes.spec.js'
            ]);

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
                .inDir(path.join(__dirname, '.tmp'));
        });

        it('creates expected files', function (done)
        {
            runGen
                .withOptions(options)
                .withPrompts({
                    modules: [
                        'uiRouterModule'
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
                    done();
                });
        });
    });
});


