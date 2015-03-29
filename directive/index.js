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
            createService: false
        };

    var createFiles = function (props)
    {
        console.log(props);

        this.generateSourceAndTest(
            'directive',
            null,
            '-d',
            {
                createService: props.createService,
                createTemplate: props.createTemplate
            }
        );
        // NOTE: never forget the callback!
        cb();
    };

    this.option('useDefaults');
    this.option('openInIntelliJ');
    this.argument('targetFolder', {
        type: String,
        required: false,
        description: 'The path of the parent module. Strips app and scripts folders'
    });

     if (this.options.useDefaults) {
         this.log('Using default options');
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