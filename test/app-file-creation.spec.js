'use strict';
var path = require('path');
var assert = require('assert');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('Moda generator', function ()
{
    // not testing the actual run of generators yet
    it('the generator can be required without throwing', function ()
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
});


