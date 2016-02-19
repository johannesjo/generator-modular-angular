'use strict';
var path = require('path');
var assert = require('assert');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('moda Service generator', function() {
    // not testing the actual run of generators yet
    it('can be required without throwing', function() {
        this.app = require('../s');
    });

    describe('basic file creation', function() {
        var testArguments = 'test-name';
        var expectedContent = [
            ['app/scripts/main/global-services/test-name-s.js', /TestName/],
            ['app/scripts/main/global-services/test-name-s.js', /module\('tmp'\)/],
            ['app/scripts/main/global-services/test-name-s.spec.js', /TestName/]
        ];
        var expected = [
            'app/scripts/main/global-services/test-name-s.js',
            'app/scripts/main/global-services/test-name-s.spec.js'
        ];

        var noFile = [
            'app/scripts/test-name/test-name-s.js',
            'app/scripts/test-name-s.js',
            'app/scripts/global-services/test-name-f.js'
        ];

        var nonExpected = [
            ['app/scripts/main/global-services/test-name-s.js', /testName/]
        ];

        var options = {
            'skipInject': true
        };

        var runGen;

        beforeEach(function() {
            runGen = helpers
                .run(path.join(__dirname, '../s'))
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


    describe('files in sub folder creation', function() {
        var testArguments = 'test-name test-path';
        var expectedContent = [
            ['app/scripts/test-path/test-name-s.js', /TestName/],
            ['app/scripts/test-path/test-name-s.js', /module\('tmp'\)/],
            ['app/scripts/test-path/test-name-s.spec.js', /TestName/]
        ];
        var expected = [
            'app/scripts/test-path/test-name-s.js',
            'app/scripts/test-path/test-name-s.spec.js'

        ];
        var noFile = [
            'app/scripts/test-path/test-name-f.js',
            'app/scripts/test-name-s.js',
            'app/scripts/test-path/test-name-d.html',
            'app/scripts/test-path/_test-name-d.scss'
        ];

        var nonExpected = [
            ['app/scripts/test-path/test-name-s.js', /testName/]
        ];

        var options = {
            'skipInject': true
        };

        var runGen;

        beforeEach(function() {
            runGen = helpers
                .run(path.join(__dirname, '../s'))
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
            ['app/scripts/services/test-name-service.js', /TestNameService/],
            ['app/scripts/services/test-name-service.js', /module\('tmp'\)/],
            ['app/scripts/services/test-name-service.spec.js', /TestNameService/]
        ];
        var expected = [
            'app/scripts/services/test-name-service.js',
            'app/scripts/services/test-name-service.spec.js'

        ];
        var noFile = [
            'app/scripts/services/test-name-f.js',
            'app/scripts/test-name-service.js',
            'app/scripts/services/test-name-d.html',
            'app/scripts/services/_test-name-d.scss'
        ];

        var nonExpected = [
            ['app/scripts/services/test-name-service.js', /testNameService/]
        ];

        var options = {
            'skipInject': true
        };

        var runGen;

        beforeEach(function() {
            runGen = helpers
                .run(path.join(__dirname, '../s'))
                .inDir(path.join(__dirname, '.tmp'))
        });

        it('creates expected files', function(done) {
            runGen
                .withLocalConfig({
                    subGenerators: {
                        service: {
                            nameSuffix: 'Service',
                            suffix: '-service',
                            globalDir: 'services'
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