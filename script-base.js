'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var angularUtils = require('./util.js');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
    constructor: function ()
    {
        yeoman.generators.NamedBase.apply(this, arguments);

        // global options
        this.option('useDefaults');
        this.option('openInIntelliJ');
        this.option('openInIntelliJ');
        this.option('dontCreateFolder');
        this.option('skipInject');

        this.argument('targetFolder', {
            type: String,
            required: false,
            description: 'The path of the parent module. Strips app and scripts folders'
        });


        /*************************************
         **** other global templating vars ***
         ************************************/

        // define app name variables
        var bowerJson = {};
        try {
            bowerJson = require(path.join(process.cwd(), 'bower.json'));
        } catch (e) {
        }
        if (bowerJson.name) {
            this.appname = bowerJson.name;
        } else {
            this.appname = path.basename(process.cwd());
        }
        this.appname = this._.slugify(this._.humanize(this.appname));
        this.scriptAppName = bowerJson.moduleName || this._.camelize(this.appname);
        this.cameledName = this._.camelize(this.name);
        this.classedName = this._.classify(this.name);
        this.sluggedName = this._.slugify(this.name);


        // define app path variable
        if (typeof this.env.options.appPath === 'undefined') {
            this.env.options.appPath = this.options.appPath || bowerJson.appPath || 'app';
            this.options.appPath = this.env.options.appPath;
        }

        // set sources root (for file-templates)
        var sourceRoot = '/templates/app';
        this.sourceRoot(path.join(__dirname, sourceRoot));

        // additional variables
        this.testPassOnDefault = true;
        this.createdFiles = [];
        this.scriptsFolder = 'scripts';
        this.scriptFileExt = '.js';
        this.tplFileExt = '.html';
        this.styleFileExt = '.scss';
        this.testSuffix = '.spec';
        this.currentModule = path.basename(process.cwd());

        this.globalDir = '_main';
        this.globalServicePath = this.globalDir + '/global-services';
        this.globalFiltersPath = this.globalDir + '/global-filters';
        this.globalDirectivesPath = '';
        this.routesPath = '_routes';
    },


    defineTargetFolder: function ()
    {
        var realTargetFolder;

        // allow creating sub-modules via reading and parsing the path argument
        if (this.targetFolder) {
            this.targetFolder = this.targetFolder
                .replace('scripts', '')
                .replace('app', '');
            realTargetFolder = path.join(this.targetFolder);
        } else {
            if (this.isService) {
                realTargetFolder = this.globalServicePath;
            } else if (this.isFilter) {
                realTargetFolder = this.globalFiltersPath;
            } else if (this.isRoute) {
                realTargetFolder = this.routesPath;
            } else if (this.isDirective) {
                realTargetFolder = this.globalDirectivesPath;
            } else {
                realTargetFolder = '.'
            }
        }

        // check if a same named parent directory should be created
        // for directives and routes
        if (this.createDirectory) {
            realTargetFolder = path.join(realTargetFolder, this._.slugify(this.name));
        }

        return realTargetFolder;
    },

    generateSourceAndTest: function (templateName, prefix, suffix)
    {
        var realTargetFolder = this.defineTargetFolder(),
            filesToCreate = [],
            suffix = suffix || '',
            prefix = prefix || '';


        // create file paths
        var inAppPath = path.join(this.scriptsFolder, realTargetFolder);
        var generatorTargetPath = path.join(this.env.options.appPath, inAppPath);
        var standardFileName = prefix + this.name + suffix;

        // prepare template template and data
        if (this.createTemplate) {
            this.tplUrl = path.join(inAppPath, standardFileName + this.tplFileExt);
            filesToCreate.push({
                'tpl': 'directive.html',
                'targetFileName': standardFileName + this.tplFileExt
            });
            filesToCreate.push({
                'tpl': 'directive.html',
                'targetFileName': '_' + standardFileName + this.styleFileExt
            });
        } else {
            // needs to be set for the _.templates to work
            this.tplUrl = false;
        }

        // run create service or factory if option is given
        if (this.createService === 'service' || this.createService === 'factory') {
            // add service to queue
            this.svcName = this.classedName;

            var svcSuffix = this.createService === 'service' ? '-s' : '-f';
            // add service or factory to queue
            filesToCreate.push({
                'tpl': this.createService + this.scriptFileExt,
                'targetFileName': this.name + svcSuffix + this.scriptFileExt
            });
            // add service test to queue
            filesToCreate.push({
                'tpl': this.createService + this.testSuffix + this.scriptFileExt,
                'targetFileName': this.name + svcSuffix + this.testSuffix + this.scriptFileExt
            });
        }

        // add main file to queue
        filesToCreate.push({
            'tpl': templateName + this.scriptFileExt,
            'targetFileName': standardFileName + this.scriptFileExt
        });

        // add test file to queue
        filesToCreate.push({
            'tpl': templateName + this.testSuffix + this.scriptFileExt,
            'targetFileName': standardFileName + this.testSuffix + this.scriptFileExt
        });


        // create files and create a files array for further use
        for (var i = 0; i < filesToCreate.length; i++) {
            yeoman.generators.Base.prototype.template.apply(this, [
                filesToCreate[i].tpl,
                path.join(generatorTargetPath, filesToCreate[i].targetFileName)
            ]);
            this.createdFiles.push(filesToCreate);
        }

        this.afterFileCreationHook();
    },


    afterFileCreationHook: function ()
    {
        // inject all files after creation
        if (!this.options.skipInject) {
            this.spawnCommand('gulp', ['inject']);
        }

        // run favorite ide
        if (this.options.openInIntelliJ) {
            this.spawnCommand('idea', this.createdFiles);
        }
    }
});


