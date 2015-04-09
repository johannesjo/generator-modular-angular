'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var defaultSettings = require('./default-settings.js');
var helper = require('./helper.js');
var chalk = require('chalk');
var fs = require('fs');
var _s = require('underscore.string');
var _ = require('lodash');

module.exports = yeoman.generators.NamedBase.extend({
    constructor: function ()
    {
        // super constructor needs to be called manually
        // as the constructor-function is overwritten by this
        yeoman.generators.NamedBase.apply(this, arguments);

        // define global options
        this.option('useDefaults');
        this.option('openInEditor');
        this.option('noParentFolder');
        this.option('skipInject');

        // define arguments
        this.argument('targetFolder', {
            type: String,
            required: false,
            description: 'The path of the parent module. Strips app and scripts folders'
        });


        // set all the different name versions to be used in the templates
        this.setModuleNames(this.name);

        // set app name
        this.setAppVariables();


        // set sources root (for file-templates)
        var sourceRoot = '/templates/app';
        this.sourceRoot(path.join(__dirname, sourceRoot));

        // additional variables
        this.createdFiles = [];

        // init here, although its double the trouble for now
        //this.mergeConfig();
    },

    // parent initialize function
    init: function ()
    {
        this.mergeConfig();
        this.overWriteTplPathIfSet();
    },

    mergeConfig: function ()
    {
        // get either default or from config

        // create a clone to avoid testing issues
        var defaultCfg = _.cloneDeep(defaultSettings);
        _.merge(defaultCfg, this.config.getAll());
        _.merge(this, defaultCfg);
    },

    overWriteTplPathIfSet: function ()
    {

        if (this.customTemplatesPath) {
            if (fs.existsSync(this.customTemplatesPath)) {
                this.sourceRoot(this.customTemplatesPath);
            } else {
                throw (new Error('custom template path ' + this.customTemplatesPath + ' does not exist. Check your .yo-rc.json.'));
            }
        }
    },

    setAppVariables: function ()
    {
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
        this.appname = _s.slugify(_s.humanize(this.appname));
        this.scriptAppName = bowerJson.moduleName || _s.camelize(this.appname);

        // define app path variable
        if (typeof this.env.options.appPath === 'undefined') {
            this.env.options.appPath = this.options.appPath || bowerJson.appPath || 'app';
            this.options.appPath = this.env.options.appPath;
        }
    },


    // sets all the different name versions to be used in the templates
    setModuleNames: function (name)
    {
        this.cameledName = _s.camelize(name);
        this.classedName = _s.classify(name);
        this.sluggedName = _s.slugify(name);
        this.dashedName = _s.dasherize(name);
        this.humanizedName = _s.humanize(name);
    },

    cleanUpPath: function (path)
    {
        path = path
            .replace(this.dirs.appModules, '')
            .replace(this.dirs.app, '');
        return path;
    },

    formatNamePath: function (name)
    {
        var style = this.config.get('pathOutputStyle') || 'dasherize';
        return _s[style](name);
    },

    defineTargetFolder: function ()
    {
        var realTargetFolder;

        // allow creating sub-modules via reading and parsing the path argument
        if (this.targetFolder) {
            this.targetFolder = this.cleanUpPath(this.targetFolder);
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
            realTargetFolder = path.join(realTargetFolder, this.formatNamePath(this.name));
        }

        return realTargetFolder;
    },

    generateSourceAndTest: function (templateName)
    {
        this.templateName = templateName;
        this.curGenCfg = this.subGenerators[templateName];
        this.nameSuffix = this.curGenCfg.nameSuffix || '';

        var realTargetFolder = this.defineTargetFolder(),
            filesToCreate = [];

        // create file paths
        var inAppPath = path.join(this.dirs.appModules, realTargetFolder);
        var generatorTargetPath = path.join(this.env.options.appPath, inAppPath);
        var standardFileName = (this.curGenCfg.prefix || '') + this.formatNamePath(this.name) + (this.curGenCfg.suffix || '');

        // prepare template template and data
        if (this.createTemplate) {
            this.tplUrl = path.join(inAppPath, standardFileName + this.fileExt.tpl);
            filesToCreate.push({
                tpl: this.templateName + this.fileExt.tpl,
                targetFileName: standardFileName + this.fileExt.tpl
            });
            filesToCreate.push({
                tpl: this.stylePrefix + this.templateName + this.fileExt.style,
                targetFileName: this.stylePrefix + standardFileName + this.fileExt.style
            });
        } else {
            // needs to be set for the _s.templates to work
            this.tplUrl = false;
        }

        // run create service or factory if option is given
        if (this.createService === 'service' || this.createService === 'factory') {
            // add service to queue
            this.svcName = this.classedName;

            // add service or factory to queue
            filesToCreate.push({
                tpl: this.createService + this.fileExt.script,
                targetFileName: this.formatNamePath(this.name) + (this.subGenerators[this.createService].suffix || '') + this.fileExt.script,
                gen: this.createService
            });
            // add service test to queue
            filesToCreate.push({
                tpl: this.createService + this.testSuffix + this.fileExt.script,
                targetFileName: this.formatNamePath(this.name) + (this.subGenerators[this.createService].suffix || '') + this.testSuffix + this.fileExt.script,
                gen: this.createService
            });
        }

        if (!this.skipMainFiles) {
            // add main file to queue
            filesToCreate.push({
                tpl: templateName + this.fileExt.script,
                targetFileName: standardFileName + this.fileExt.script
            });

            // add test file to queue
            filesToCreate.push({
                tpl: templateName + this.testSuffix + this.fileExt.script,
                targetFileName: standardFileName + this.testSuffix + this.fileExt.script
            });
        }

        // create files and create a files array for further use
        for (var i = 0; i < filesToCreate.length; i++) {
            var outputFile = path.join(generatorTargetPath, filesToCreate[i].targetFileName);
            this.createdFiles.push(outputFile);

            var customYoRcTpl = this.getCustomTplFromYoRc(filesToCreate[i]);
            if (customYoRcTpl) {
                this.writeCustomYoRcTpl(customYoRcTpl, outputFile);
            } else {
                this.fs.copyTpl(
                    this.templatePath(filesToCreate[i].tpl),
                    this.destinationPath(outputFile),
                    this
                );
            }
        }
        this.afterFileCreationHook();
    },

    getCustomTplFromYoRc: function (fileToCreate)
    {
        var customYoRcTpl;
        var curGenCfg = null;
        var SPEC_REG_EX = new RegExp(this.testSuffix + '\\' + this.fileExt.script + '$');
        var SCRIPTS_REG_EX = new RegExp(this.fileExt.script + '$');
        var TPL_REG_EX = new RegExp(this.fileExt.tpl + '$');
        var STYLE_REG_EX = new RegExp(this.fileExt.style + '$');

        if (fileToCreate.gen) {
            curGenCfg = this.subGenerators[fileToCreate.gen];
        } else {
            curGenCfg = this.curGenCfg;
        }

        if (curGenCfg.tpl) {
            if (fileToCreate.tpl.match(SPEC_REG_EX)) {
                customYoRcTpl = curGenCfg.tpl['spec'];
            } else if (fileToCreate.tpl.match(SCRIPTS_REG_EX)) {
                customYoRcTpl = curGenCfg.tpl['script'];
            } else if (fileToCreate.tpl.match(TPL_REG_EX)) {
                customYoRcTpl = curGenCfg.tpl['tpl'];
            } else if (fileToCreate.tpl.match(STYLE_REG_EX)) {
                customYoRcTpl = curGenCfg.tpl['style'];
            }

            if (customYoRcTpl && typeof customYoRcTpl === 'string') {
                return customYoRcTpl;
            }
        }
    },

    writeCustomYoRcTpl: function (customYoRcTpl, targetDir)
    {
        var tpl = _.template(customYoRcTpl, {})(this);
        this.fs.write(targetDir, tpl);
    },

    afterFileCreationHook: function ()
    {
        // run favorite ide (first to smooth the experiance)
        if (this.options.openInEditor) {
            this.spawnCommand(this.editorCommand, this.createdFiles);
        }

        // inject all files after creation
        if (!this.options.skipInject) {
            this.spawnCommand('gulp', ['inject']);
        }
    }
});


