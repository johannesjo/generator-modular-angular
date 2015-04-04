'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('moda Route generator', function ()
{
    var generatorPath = '../r',
        routesDir = 'app/scripts/_routes/';


    // not testing the actual run of generators yet
    it('can be required without throwing', function ()
    {
        this.app = require(generatorPath);
    });

    describe('basic file creation', function ()
    {
        var testArguments = 'test-name';
        var expectedContent = [
            [routesDir + 'test-name/test-name-c.js', /TestNameCtrl/],
            [routesDir + 'test-name/test-name-c.js', /module\('tmp'\)/],
            [routesDir + 'test-name/test-name-c.spec.js', /TestNameCtrl/],
            [routesDir + 'test-name/test-name-c.html', /class="page-test-name"/],
        ];
        var expected = [
            routesDir + 'test-name/test-name-c.js',
            routesDir + 'test-name/test-name-c.spec.js',
            routesDir + 'test-name/test-name-c.html',
            routesDir + 'test-name/_test-name-c.scss'
        ];

        var noFile = [
            routesDir + 'test-name/test-name-s.js',
            routesDir + 'test-name/test-name-f.js',
            routesDir + 'test-name-c.js'
        ];

        var nonExpected = [
            [routesDir + 'test-name/test-name-c.js', /TestNamea/],
            [routesDir + 'test-name/test-name-c.js', /testName/],
        ];

        var options = {
            'useDefaults': true,
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


    describe('files in sub folder creation', function ()
    {
        var testArguments = 'parState.subState';
        var expectedContent = [
            [routesDir + 'par-state/sub-state/sub-state-c.js', /SubStateCtrl/],
            [routesDir + 'par-state/sub-state/sub-state-c.js', /module\('tmp'\)/],
            [routesDir + 'par-state/sub-state/sub-state-c.spec.js', /SubStateCtrl/],
            [routesDir + 'par-state/sub-state/sub-state-c.html', /class="page-sub-state"/],
        ];
        var expected = [
            routesDir + 'par-state/sub-state/sub-state-c.js',
            routesDir + 'par-state/sub-state/sub-state-c.spec.js',
            routesDir + 'par-state/sub-state/sub-state-c.html',
            routesDir + 'par-state/sub-state/_sub-state-c.scss'
        ];

        var noFile = [
            routesDir + 'par-state/sub-state/sub-state-s.js',
            routesDir + 'par-state/sub-state/sub-state-f.js',
            routesDir + 'sub-state-c.js'
        ];

        var nonExpected = [
            // is classified
            [routesDir + 'par-state/sub-state/sub-state-c.js', /subStateCtrl/]
        ];

        var options = {
            'useDefaults': true,
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


    describe('files with service creation and no template (in sub folder)', function ()
    {
        var testArguments = 'parState.subState';
        var expectedContent = [
            [routesDir + 'par-state/sub-state/sub-state-c.js', /SubStateCtrl/],
            [routesDir + 'par-state/sub-state/sub-state-c.js', /module\('tmp'\)/],
            [routesDir + 'par-state/sub-state/sub-state-s.js', /module\('tmp'\)/],
            [routesDir + 'par-state/sub-state/sub-state-s.js', /SubState/],
            [routesDir + 'par-state/sub-state/sub-state-s.spec.js', /SubState/]
        ];
        var expected = [
            routesDir + 'par-state/sub-state/sub-state-c.js',
            routesDir + 'par-state/sub-state/sub-state-c.spec.js',
            routesDir + 'par-state/sub-state/sub-state-s.js',
            routesDir + 'par-state/sub-state/sub-state-s.spec.js'
        ];

        var noFile = [
            routesDir + 'par-state/sub-state/sub-state-f.js',
            routesDir + 'par-state/sub-state/sub-state-f.spec.js',
            routesDir + 'sub-state-c.js',
            routesDir + 'par-state/sub-state/sub-state-c.html',
            routesDir + 'par-state/sub-state/_sub-state-c.scss'
        ];

        var nonExpected = [];

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
                .withPrompts({
                    createService: 'service',
                    createTemplate: false
                })
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