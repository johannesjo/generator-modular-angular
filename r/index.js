'use strict';
var util = require('util');
var path = require('path');
var helper = require('../helper.js');
var ScriptBase = require('../script-base.js');


var Generator = module.exports = function Generator()
{
    ScriptBase.apply(this, arguments);
};
util.inherits(Generator, ScriptBase);

Generator.prototype.createRouteFiles = function createRouteFiles()
{
    var cb = this.async();
    var defaults = {
        createTemplate: true,
        createService: false,
        createCtrl: true
    };
    var ctrlSubGen = this.subGenerators.controller;

    // the state name is the argument
    var stateName = this.name;

    // create path string from name
    var PARENT_STATES_REG_EXP = new RegExp('([^\\.]+)\\.', 'g');
    var parentStates = this.name.match(PARENT_STATES_REG_EXP);
    var parentStatePath = '';
    if (parentStates) {
        for (var i = 0; i < parentStates.length; i++) {
            var stateStr = parentStates[i].replace('.', '');
            stateStr = this.formatNamePath(stateStr);
            parentStatePath = path.join(parentStatePath, stateStr);
        }
    }

    // set name to base-name only to work with the usual generators
    this.name = this.name.replace(PARENT_STATES_REG_EXP, '');
    // instead use target folder to set the path
    this.targetFolder = path.join(this.dirs.routes, parentStatePath);

    // names need to be reset
    this.setModuleNames(this.name);


    var createFiles = function (props)
    {
        this.createService = props.createService;
        this.createTemplate = props.createTemplate;
        this.skipMainFiles = !props.createCtrl;

        this.generateSourceAndTest('controller');

        if (this.uiRouter) {
            var routeUrl = '/' + this.formatNamePath(this.name),
                tplUrl = this.tplUrl,
                ctrl = !!props.createCtrl && this.classedName + (ctrlSubGen.nameSuffix || '');

            helper.injectRoute(
                path.join(this.config.get('routesFile')),
                stateName,
                routeUrl,
                tplUrl,
                ctrl,
                this
            );
        }
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
                    name: 'createCtrl',
                    message: 'Would you like to create a controller for the route?',
                    default: defaults.createCtrl
                },
                {
                    type: 'confirm',
                    name: 'createTemplate',
                    message: 'Would you like to create a html-template-file and a scss-file for the route?',
                    default: defaults.createTemplate
                },
                {
                    type: 'list',
                    name: 'createService',
                    message: 'Would you like to create a service or factory for the route?',
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