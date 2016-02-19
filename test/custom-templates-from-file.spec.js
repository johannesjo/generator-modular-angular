'use strict';
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var fs = require('fs');
describe('moda custom file templates from folder', function() {
    var generatorPath = '../s';
    var yoRc = path.join(__dirname, '.tmp', '.yo-rc.json');
    var templatePath = path.join(__dirname, '.tmp-templates');
    var serviceFile = path.join(templatePath, 'service.js');
    var serviceFileContent = 'SERVICE<%= classedName %><%= nameSuffix %>';
    var serviceSpecFile = path.join(templatePath, 'service.spec.js');
    var serviceSpecFileContent = 'SPEC<%= classedName %><%= nameSuffix %>';


    var testArguments = 'test-name';
    var expectedContent = [
        ['app/scripts/main/global-services/test-name-s.js', /SERVICE/],
        ['app/scripts/main/global-services/test-name-s.spec.js', /SPEC/],
        ['app/scripts/main/global-services/test-name-s.js', /TestName/],
        ['app/scripts/main/global-services/test-name-s.spec.js', /TestName/]
    ];
    var expected = [
        'app/scripts/main/global-services/test-name-s.js',
        'app/scripts/main/global-services/test-name-s.spec.js'
    ];

    var options = {
        'useDefaults': true,
        'skipInject': true
    };

    var runGen;

    describe('success', function() {
        beforeEach(function() {
            if (!fs.existsSync(templatePath)) {
                fs.mkdirSync(templatePath);
            }
            if (!fs.existsSync(serviceFile)) {
                fs.writeFileSync(serviceFile, serviceFileContent);
            }
            if (!fs.existsSync(serviceSpecFile)) {
                fs.writeFileSync(serviceSpecFile, serviceSpecFileContent);
            }
            runGen = helpers
                .run(path.join(__dirname, generatorPath))
                .inDir(path.join(__dirname, '.tmp'))
        });

        afterEach(function() {
            fs.unlinkSync(yoRc);
            fs.unlinkSync(serviceFile);
            fs.unlinkSync(serviceSpecFile);
            fs.rmdir(templatePath);
        });

        it('should use the custom service templates', function(done) {
            runGen
                .withArguments(testArguments)
                .withLocalConfig({
                    customTemplatesPath: templatePath
                })
                .withOptions(options)
                .on('end', function() {
                    assert.file([].concat(
                        expected
                    ));
                    assert.fileContent([].concat(
                        expectedContent
                    ));

                    done();
                });
        });
    });

});