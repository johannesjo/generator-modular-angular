'use strict';
var path = require('path');
var assert = require('assert');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('moda Decorator generator', function ()
{
    var generatorPath = '../decorator';
    // not testing the actual run of generators yet
    it('can be required without throwing', function ()
    {
        this.app = require(generatorPath);
    });

    describe('basic file creation', function ()
    {
        var testArguments = 'test-name';
        var expectedContent = [
            ['app/scripts/main/global-services/test-name-decorator.js', /TestName/],
            ['app/scripts/main/global-services/test-name-decorator.js', /module\('tmp'\)/],
            ['app/scripts/main/global-services/test-name-decorator.spec.js', /TestName/]
        ];
        var expected = [
            'app/scripts/main/global-services/test-name-decorator.js',
            'app/scripts/main/global-services/test-name-decorator.spec.js'
        ];

        var noFile = [
            'app/scripts/test-name/test-name-decorator.js',
            'app/scripts/test-name-decorator.js',
            'app/scripts/global-services/test-name-s.js'
        ];

        var nonExpected = [
            ['app/scripts/main/global-services/test-name-decorator.js', /testName/]
        ];

        var options = {
            'skipInject': true
        };

        var runGen;

        beforeEach(function ()
        {
            runGen = helpers
                .run(path.join(__dirname, generatorPath))
                .inDir(path.join(__dirname, '.tmp'))
        });

        it('creates expected files', function (done)
        {
            runGen
                .withArguments(testArguments)
                .withOptions(options).on('end', function ()
                {
                    assert.file([].concat(
                        expected
                    ));
                    assert.noFile([].concat(
                        noFile
                    ));
                    assert.fileContent([].concat(
                        expectedContent
                    ));
                    assert.noFileContent([].concat(
                        nonExpected
                    ));
                    done();
                });
        });
    });


    describe('file in sub folder creation', function ()
    {
        var testArguments = 'test-name test-path';
        var expectedContent = [
            ['app/scripts/test-path/test-name-decorator.js', /TestName/],
            ['app/scripts/test-path/test-name-decorator.js', /module\('tmp'\)/],
            ['app/scripts/test-path/test-name-decorator.spec.js', /TestName/]
        ];
        var expected = [
            'app/scripts/test-path/test-name-decorator.js',
            'app/scripts/test-path/test-name-decorator.spec.js'

        ];
        var noFile = [
            'app/scripts/test-path/test-name-s.js',
            'app/scripts/test-name-decorator.js',
            'app/scripts/test-path/test-name-d.html',
            'app/scripts/test-path/_test-name-d.scss'
        ];

        var nonExpected = [
            ['app/scripts/test-path/test-name-decorator.js', /testName/]
        ];

        var options = {
            'skipInject': true
        };

        var runGen;

        beforeEach(function ()
        {
            runGen = helpers
                .run(path.join(__dirname, generatorPath))
                .inDir(path.join(__dirname, '.tmp'))
        });

        it('creates expected files', function (done)
        {
            runGen
                .withArguments(testArguments)
                .withOptions(options).on('end', function ()
                {
                    assert.file([].concat(
                        expected
                    ));
                    assert.noFile([].concat(
                        noFile
                    ));
                    assert.fileContent([].concat(
                        expectedContent
                    ));
                    assert.noFileContent([].concat(
                        nonExpected
                    ));
                    done();
                });
        });
    });
});