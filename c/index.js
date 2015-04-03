'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');


var Generator = module.exports = function Generator()
{
    ScriptBase.apply(this, arguments);
};
util.inherits(Generator, ScriptBase);

Generator.prototype.createCtrlFiles = function createCtrlFiles()
{
    var cb = this.async(),
        defaults = {
            createTemplate: true,
            createService: false
        };

    var createFiles = function (props)
    {
        this.createService = props.createService;
        this.createTemplate = props.createTemplate;

        this.generateSourceAndTest('controller');
        // NOTE: never forget the callback!
        cb();
    };

    if (this.options.useDefaults || this.config.get('alwaysSkipDialog')) {
        createFiles.bind(this)(defaults);
    } else {
        this.prompt(
            [
                {
                    type: 'confirm',
                    name: 'createTemplate',
                    message: 'Would you like to create a html-template-file and a scss-file for the controller?',
                    default: defaults.createTemplate
                },
                {
                    type: 'list',
                    name: 'createService',
                    message: 'Would you like to create a service or factory for the controller?',
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