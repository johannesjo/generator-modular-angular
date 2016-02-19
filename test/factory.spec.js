'use strict';
var path = require('path');
var assert = require('assert');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('moda Factory generator', function() {
    var generatorPath = '../f';


    // not testing the actual run of generators yet
    it('can be required without throwing', function() {
        this.app = require(generatorPath);
    });

    describe('basic file creation', function() {
        var testArguments = 'test-name';
        var expectedContent = [
            ['app/scripts/main/global-services/test-name-f.js', /TestName/],
            ['app/scripts/main/global-services/test-name-f.js', /module\('tmp'\)/],
            ['app/scripts/main/global-services/test-name-f.spec.js', /TestName/]
        ];
        var expected = [
            'app/scripts/main/global-services/test-name-f.js',
            'app/scripts/main/global-services/test-name-f.spec.js'
        ];

        var noFile = [
            'app/scripts/test-name/test-name-f.js',
            'app/scripts/test-name-f.js',
            'app/scripts/global-services/test-name-s.js'
        ];

        var nonExpected = [
            ['app/scripts/main/global-services/test-name-f.js', /testName/]
        ];

        var options = {
            'skipInject': true
        };

        var runGen;

        beforeEach(function() {
            runGen = helpers
                .run(path.join(__dirname, generatorPath))
                .inDir(path.join(__dirname, '.tmp'))
        });

        it('creates expected files', function(done) {
            runGen
                .withArguments(testArguments)
                .withOptions(options)
                .on('end', function() {
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


    describe('file in sub folder creation', function() {
        var testArguments = 'test-name test-path';
        var expectedContent = [
            ['app/scripts/test-path/test-name-f.js', /TestName/],
            ['app/scripts/test-path/test-name-f.js', /module\('tmp'\)/],
            ['app/scripts/test-path/test-name-f.spec.js', /TestName/]
        ];
        var expected = [
            'app/scripts/test-path/test-name-f.js',
            'app/scripts/test-path/test-name-f.spec.js'

        ];
        var noFile = [
            'app/scripts/test-path/test-name-s.js',
            'app/scripts/test-name-f.js',
            'app/scripts/test-path/test-name-d.html',
            'app/scripts/test-path/_test-name-d.scss'
        ];

        var nonExpected = [
            ['app/scripts/test-path/test-name-f.js', /testName/]
        ];

        var options = {
            'skipInject': true
        };

        var runGen;

        beforeEach(function() {
            runGen = helpers
                .run(path.join(__dirname, generatorPath))
                .inDir(path.join(__dirname, '.tmp'))
        });

        it('creates expected files', function(done) {
            runGen
                .withArguments(testArguments)
                .withOptions(options)
                .on('end', function() {
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

    describe('with local config for file extension, global path and name-suffix', function() {
        var testArguments = 'test-name';
        var expectedContent = [
            ['app/scripts/factories/test-name-factory.js', /TestNameFactory/],
            ['app/scripts/factories/test-name-factory.js', /module\('tmp'\)/],
            ['app/scripts/factories/test-name-factory.spec.js', /TestNameFactory/]
        ];
        var expected = [
            'app/scripts/factories/test-name-factory.js',
            'app/scripts/factories/test-name-factory.spec.js'

        ];
        var noFile = [
            'app/scripts/main/global-services/test-name-f.js',
            'app/scripts/main/global-services/test-name-factory.js',
            'app/scripts/test-name-factory.js',
            'app/scripts/factories/test-name-d.html',
            'app/scripts/factories/_test-name-d.scss'
        ];

        var nonExpected = [
            ['app/scripts/factories/test-name-factory.js', /testNameFactory/]
        ];

        var options = {
            'skipInject': true
        };

        var runGen;

        beforeEach(function() {
            runGen = helpers
                .run(path.join(__dirname, generatorPath))
                .inDir(path.join(__dirname, '.tmp'))
        });

        it('creates expected files', function(done) {
            runGen
                .withLocalConfig({
                    subGenerators: {
                        factory: {
                            nameSuffix: 'Factory',
                            suffix: '-factory',
                            globalDir: 'factories'
                        }
                    }
                })
                .withArguments(testArguments)
                .withOptions(options)
                .on('end', function() {
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