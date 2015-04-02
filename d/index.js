'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');


var Generator = module.exports = function Generator()
{
    ScriptBase.apply(this, arguments);
};
util.inherits(Generator, ScriptBase);

Generator.prototype.createDirectiveFiles = function createDirectiveFiles()
{
    var cb = this.async(),
        defaults = {
            createTemplate: true,
            createService: false,
            createDirectory: !this.options.dontCreateFolder
        };
    this.isDirective = true;

    var createFiles = function (props)
    {
        this.createService = props.createService;
        this.createTemplate = props.createTemplate;
        this.createDirectory = defaults.createDirectory;

        this.generateSourceAndTest(
            'directive',
            null,
            '-d'
        );
        // NOTE: never forget the callback!
        cb();
    };

    if (this.options.useDefaults) {
        createFiles.bind(this)(defaults);
    } else {
        this.prompt(
            [
                {
                    type: 'confirm',
                    name: 'createTemplate',
                    message: 'Would you like to create a html-template-file and a scss-file for the directive?',
                    default: defaults.createTemplate
                },
                {
                    type: 'list',
                    name: 'createService',
                    message: 'Would you like to create a service or factory for the directive?',
                    default: defaults.createService,
                    choices: [
                        {
                            name: 'No',
                            value: false
                        },
                        {
                            name: 'a service',
                            value: 'service'
                        },
                        {
                            name: 'a factory',
                            value: 'service'
                        }
                    ]
                }
            ],
            createFiles.bind(this));
    }
};