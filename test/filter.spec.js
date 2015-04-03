'use strict';
var path = require('path');
var assert = require('assert');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('moda Filter generator', function ()
{
    var generatorPath = '../filter';
    // not testing the actual run of generators yet
    it('can be required without throwing', function ()
    {
        this.app = require(generatorPath);
    });

    describe('basic file creation', function ()
    {
        var testArguments = 'test-name';
        var expectedContent = [
            ['app/scripts/_main/global-filters/test-name-filter.js', /testName/],
            ['app/scripts/_main/global-filters/test-name-filter.js', /module\('tmp'\)/],
            ['app/scripts/_main/global-filters/test-name-filter.spec.js', /testName/]
        ];
        var expected = [
            'app/scripts/_main/global-filters/test-name-filter.js',
            'app/scripts/_main/global-filters/test-name-filter.spec.js'
        ];

        var noFile = [
            'app/scripts/test-name/test-name-filter.js',
            'app/scripts/test-name-filter.js',
            'app/scripts/global-filters/test-name-s.js'
        ];

        var nonExpected = [
            ['app/scripts/_main/global-filters/test-name-filter.js', /TestName/]
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
            ['app/scripts/test-path/test-name-filter.js', /testName/],
            ['app/scripts/test-path/test-name-filter.js', /module\('tmp'\)/],
            ['app/scripts/test-path/test-name-filter.spec.js', /testName/]
        ];
        var expected = [
            'app/scripts/test-path/test-name-filter.js',
            'app/scripts/test-path/test-name-filter.spec.js'

        ];
        var noFile = [
            'app/scripts/test-path/test-name-s.js',
            'app/scripts/test-name-filter.js',
            'app/scripts/test-path/test-name-d.html',
            'app/scripts/test-path/test-name-filter.html',
            'app/scripts/test-path/test-name-filter.scss',
            'app/scripts/test-path/_test-name-d.scss'
        ];

        var nonExpected = [
            ['app/scripts/test-path/test-name-filter.js', /TestName/]
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