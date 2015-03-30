'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var angularUtils = require('./util.js');
var chalk = require('chalk');

var Generator = module.exports = function Generator()
{
    yeoman.generators.NamedBase.apply(this, arguments);

    // global options
    this.option('useDefaults');
    this.option('openInIntelliJ');
    this.option('openInIntelliJ');
    this.option('dontCreateFolder')

    this.argument('targetFolder', {
        type: String,
        required: false,
        description: 'The path of the parent module. Strips app and scripts folders'
    });


    /***************************
     **** other global vars ***
     **************************/

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
    this.scriptsFolder = 'scripts';
    this.scriptSuffix = '.js';
    this.testSuffix = '.spec' + this.scriptSuffix;
    this.tplSuffix = '.html';
    this.styleSuffix = '.scss';
    this.currentModule = path.basename(process.cwd());

    this.globalServicePath = 'main/global-services';
};
util.inherits(Generator, yeoman.generators.NamedBase);


Generator.prototype.appTemplate = function (src, dest, fileExt)
{
    console.log(this.tplUrl);

    yeoman.generators.Base.prototype.template.apply(this, [
        src + fileExt,
        dest + fileExt
    ]);
};


Generator.prototype.generateSourceAndTest = function (appTemplate, prefix, suffix, data)
{
    // TODO huge refactor

    var targetFolder,
        fileTypesToCreate = [],
        filesToOpen = [];
    suffix = suffix || '';
    prefix = prefix || '';

    // allow creating sub-modules via reading and parsing the path argument
    if (this.targetFolder) {
        this.targetFolder = this.targetFolder
            .replace('scripts', '')
            .replace('app', '');
        targetFolder = path.join(this.targetFolder);
    } else {
        targetFolder = '.'
    }

    // check if a same named parent directory should be created
    if (this.createDirectory) {
        targetFolder = path.join(targetFolder, this.name);
    }

    // check if service or factory and if no path is given
    if (this.isService) {
        this.svcName = this.classedName;
        if (!targetFolder) {
            targetFolder = path.join(targetFolder, this.globalServicePath);
        }
    }

    // create file paths
    var tplPathWithoutFileExt = path.join(this.scriptsFolder, targetFolder, prefix + this.name + suffix).toLowerCase();
    var pathWithoutFileExt = path.join(this.env.options.appPath, tplPathWithoutFileExt);

    // prepare template template and data
    if (this.createTemplate) {
        this.tplUrl = tplPathWithoutFileExt + this.tplSuffix;
        fileTypesToCreate.push(this.tplSuffix);
        fileTypesToCreate.push(this.styleSuffix);
    } else {
        // needs to be set for the _.templates to work
        this.tplUrl = false;
    }

    // always create main file and test
    fileTypesToCreate.push(this.scriptSuffix);
    fileTypesToCreate.push(this.testSuffix);

    // run create service or factory if option is given
    if (this.createService === 'service' || this.createService === 'factory') {
        // create service
        this.svcName = this.classedName;
        var svcSuffix = this.createService === 'service' ? '-s' : '-f';
        var svcPath = pathWithoutFileExt.slice(0, (pathWithoutFileExt.length - suffix.length)) + svcSuffix;

        this.appTemplate(this.createService, svcPath, this.scriptSuffix);
        filesToOpen.push(svcPath + this.scriptSuffix);
    }

    // create files array
    for (var i = 0; i < fileTypesToCreate.length; i++) {
        this.appTemplate(appTemplate, pathWithoutFileExt, fileTypesToCreate[i]);
        filesToOpen.push(pathWithoutFileExt + fileTypesToCreate[i]);
    }

    // inject all files after creation
    this.spawnCommand('gulp', ['inject']);

    // run favorite ide
    if (this.options.openInIntelliJ) {
        this.spawnCommand('idea', filesToOpen);
    }
};