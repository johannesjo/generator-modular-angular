'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');
describe('moda custom file templates via .yo-rc.json', function ()
{
    var generatorPath = '../d';
    // not testing the actual run of generators yet
    it('can be required without throwing', function ()
    {
        this.app = require(generatorPath);
    });

    describe('basic html', function ()
    {
        var testArguments = 'test-name';
        var expectedContent = [
            ['app/scripts/test-name/test-name-d.js', /testName/],
            ['app/scripts/test-name/test-name-d.js', /module\('tmp'\)/],
            ['app/scripts/test-name/test-name-d.js', /scripts\/test-name\/test-name-d\.html/],
            ['app/scripts/test-name/test-name-d.spec.js', /\('<test-name><\/test-name>'\)/],
            ['app/scripts/test-name/test-name-d.html', /class="XXXXXX"/]
        ];
        var expected = [
            'app/scripts/test-name/test-name-d.js',
            'app/scripts/test-name/test-name-d.spec.js',
            'app/scripts/test-name/test-name-d.html',
            'app/scripts/test-name/_test-name-d.scss'
        ];


        var options = {
            'useDefaults': true,
            'skipInject': true
        };

        var runGen;

        beforeEach(function ()
        {
            runGen = helpers
                .run(path.join(__dirname, '../d'))
                .inDir(path.join(__dirname, '.tmp'))
        });

        afterEach(function ()
        {
            fs.unlinkSync(path.join(__dirname, '.tmp', '.yo-rc.json'));
        });

        it('works for html templates', function (done)
        {
            runGen
                .withArguments(testArguments)
                .withLocalConfig({
                    subGenerators: {
                        directive: {
                            tpl: {
                                tpl: '<div class="XXXXXX"></div>'
                            }
                        }
                    }
                })
                .withOptions(options).on('end', function ()
                {
                    assert.file([].concat(
                        expected
                    ));
                    assert.fileContent([].concat(
                        expectedContent
                    ));

                    done();
                });
        });

        it('has common variables available', function (done)
        {
            runGen
                .withArguments(testArguments)
                .withLocalConfig({
                    subGenerators: {
                        directive: {
                            tpl: {
                                tpl: '<%=cameledName %>|<%=classedName %>|<%=sluggedName %>|<%=dashedName %>|<%=humanizedName %>'
                            }
                        }
                    }
                })
                .withOptions(options).on('end', function ()
                {
                    assert.file([].concat(
                        expected
                    ));
                    assert.fileContent([
                        ['app/scripts/test-name/test-name-d.html', 'testName|TestName|test-name|test-name|Test name']
                    ]);
                    done();
                });
        });


        it('works with services created from directives', function (done)
        {
            runGen
                .withArguments(testArguments)
                .withOptions({
                    'skipInject': true
                })
                .withPrompts({
                    createService: 'service'
                })
                .withLocalConfig({
                    subGenerators: {
                        directive: {
                            tpl: {
                                tpl: 'HTML',
                                script: 'JS',
                                style: 'SCSS',
                                spec: 'SPEC',
                            }
                        },
                        service: {
                            tpl: {
                                script: 'SERVICE_JS',
                                spec: 'SERVICE_JS_SPEC'
                            }
                        }
                    }
                })
                .on('end', function ()
                {
                    assert.file([].concat(
                        expected
                    ));
                    assert.fileContent([
                        ['app/scripts/test-name/test-name-d.js', 'JS'],
                        ['app/scripts/test-name/test-name-d.spec.js', 'SPEC'],
                        ['app/scripts/test-name/test-name-d.html', 'HTML'],
                        ['app/scripts/test-name/_test-name-d.scss', 'SCSS'],
                        ['app/scripts/test-name/test-name-s.js', 'SERVICE_JS'],
                        ['app/scripts/test-name/test-name-s.spec.js', 'SERVICE_JS_SPEC'],
                    ]);

                    done();
                });
        });
    });
});