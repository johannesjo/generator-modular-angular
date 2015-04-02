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
    this.scriptSuffix = '.js';
    this.testSuffix = '.spec' + this.scriptSuffix;
    this.tplSuffix = '.html';
    this.styleSuffix = '.scss';
    this.currentModule = path.basename(process.cwd());

    this.globalDir = '_main';
    this.globalServicePath = this.globalDir + '/global-services';
    this.globalFiltersPath = this.globalDir + '/global-filters';
    this.globalDirectivesPath = '';
    this.routesPath = '_routes';
};
util.inherits(Generator, yeoman.generators.NamedBase);


Generator.prototype.createFromTemplate = function (src, dest, fileExt)
{
    yeoman.generators.Base.prototype.template.apply(this, [
        src + fileExt,
        dest + fileExt
    ]);
};


Generator.prototype.defineTargetFolder = function ()
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
        realTargetFolder = path.join(realTargetFolder, this.name);
    }

    return realTargetFolder;
};


Generator.prototype.afterFileCreationHook = function ()
{
    // inject all files after creation
    this.spawnCommand('gulp', ['inject']);

    // run favorite ide
    if (this.options.openInIntelliJ) {
        this.spawnCommand('idea', this.createdFiles);
    }
};

Generator.prototype.generateSourceAndTest = function (templateName, prefix, suffix)
{
    var realTargetFolder = this.defineTargetFolder(),
        fileTypesToCreate = [],
        suffix = suffix || '',
        prefix = prefix || '';


    // create file paths
    var tplUrlWithoutFileExt = path.join(this.scriptsFolder, realTargetFolder, prefix + this.name + suffix).toLowerCase();
    // add app directory to real used paths
    var pathWithoutFileExt = path.join(this.env.options.appPath, tplUrlWithoutFileExt);

    // start: determine which files to create
    // prepare template template and data
    if (this.createTemplate) {
        this.tplUrl = tplUrlWithoutFileExt + this.tplSuffix;
        fileTypesToCreate.push(this.tplSuffix);
        fileTypesToCreate.push(this.styleSuffix);
    } else {
        // needs to be set for the _.templates to work
        this.tplUrl = false;
    }

    // run create service or factory if option is given
    if (this.createService === 'service' || this.createService === 'factory') {
        // create service
        this.svcName = this.classedName;
        var svcSuffix = this.createService === 'service' ? '-s' : '-f';
        var svcPath = pathWithoutFileExt.slice(0, (pathWithoutFileExt.length - suffix.length)) + svcSuffix;

        this.createFromTemplate(this.createService, svcPath, this.scriptSuffix);
        this.createdFiles.push(svcPath + this.scriptSuffix);
    }
    // end: determine which files to create


    // always create main file and test
    fileTypesToCreate.push(this.scriptSuffix);
    fileTypesToCreate.push(this.testSuffix);


    // create files and create a files array for further use
    for (var i = 0; i < fileTypesToCreate.length; i++) {
        this.createFromTemplate(templateName, pathWithoutFileExt, fileTypesToCreate[i]);
        this.createdFiles.push(pathWithoutFileExt + fileTypesToCreate[i]);
    }

    this.afterFileCreationHook();
};