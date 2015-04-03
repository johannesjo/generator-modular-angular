'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var defaultSettings = require('./default-settings.js');
var angularUtils = require('./util.js');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
    constructor: function ()
    {
        yeoman.generators.NamedBase.apply(this, arguments);

        // global options
        this.option('useDefaults');
        this.option('openInEditor');
        this.option('noParentFolder');
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
        this.createdFiles = [];

        // get either default or from config
        for (var prop in defaultSettings) {
            if (defaultSettings.hasOwnProperty(prop)) {
                this[prop] = this.config.get(prop) || defaultSettings[prop];
            }
        }
    },


    defineTargetFolder: function ()
    {
        var realTargetFolder;

        // allow creating sub-modules via reading and parsing the path argument
        if (this.targetFolder) {
            this.targetFolder = this.targetFolder
                .replace(this.dirs.appModules, '')
                .replace(this.dirs.app, '');
            realTargetFolder = path.join(this.targetFolder);
        } else {

            if (this.curGenCfg.globalDir) {
                realTargetFolder = this.curGenCfg.globalDir;
            } else {
                realTargetFolder = '.'
            }
        }

        // check if a same named parent directory should be created
        // for directives and routes
        if (this.curGenCfg.createDirectory && !this.options.noParentFolder) {
            realTargetFolder = path.join(realTargetFolder, this._.slugify(this.name));
        }

        return realTargetFolder;
    },

    generateSourceAndTest: function (templateName)
    {
        this.templateName = templateName;
        this.curGenCfg = this.subGenerators[templateName];

        var realTargetFolder = this.defineTargetFolder(),
            filesToCreate = [];

        // create file paths
        var inAppPath = path.join(this.dirs.appModules, realTargetFolder);
        var generatorTargetPath = path.join(this.env.options.appPath, inAppPath);
        var standardFileName = (this.curGenCfg.prefix || '') + this.name + (this.curGenCfg.suffix || '');

        // prepare template template and data
        if (this.createTemplate) {
            this.tplUrl = path.join(inAppPath, standardFileName + this.fileExt.tpl);
            filesToCreate.push({
                'tpl': this.templateName + this.fileExt.tpl,
                'targetFileName': standardFileName + this.fileExt.tpl
            });
            filesToCreate.push({
                'tpl': this.stylePrefix + this.templateName + this.fileExt.style,
                'targetFileName': this.stylePrefix + standardFileName + this.fileExt.style
            });
        } else {
            // needs to be set for the _.templates to work
            this.tplUrl = false;
        }

        // run create service or factory if option is given
        if (this.createService === 'service' || this.createService === 'factory') {
            // add service to queue
            this.svcName = this.classedName;

            // add service or factory to queue
            filesToCreate.push({
                'tpl': this.createService + this.fileExt.script,
                'targetFileName': this.name + (this.subGenerators[this.createService].suffix || '') + this.fileExt.script
            });
            // add service test to queue
            filesToCreate.push({
                'tpl': this.createService + this.testSuffix + this.fileExt.script,
                'targetFileName': this.name + (this.subGenerators[this.createService].suffix || '') + this.testSuffix + this.fileExt.script
            });
        }

        // add main file to queue
        filesToCreate.push({
            'tpl': templateName + this.fileExt.script,
            'targetFileName': standardFileName + this.fileExt.script
        });

        // add test file to queue
        filesToCreate.push({
            'tpl': templateName + this.testSuffix + this.fileExt.script,
            'targetFileName': standardFileName + this.testSuffix + this.fileExt.script
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
        if (this.options.openInEditor) {
            this.spawnCommand(this.editorCommand, this.createdFiles);
        }
    }
});


