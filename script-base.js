'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var angularUtils = require('./util.js');
var chalk = require('chalk');

var Generator = module.exports = function Generator()
{
    yeoman.generators.NamedBase.apply(this, arguments);

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
};

util.inherits(Generator, yeoman.generators.NamedBase);


Generator.prototype.appTemplate = function (src, dest, fileExt)
{
    yeoman.generators.Base.prototype.template.apply(this, [
        src + fileExt,
        dest + fileExt
    ]);
};


Generator.prototype.getCurrentModulePath = function (src, dest)
{

};

Generator.prototype.generateSourceAndTest = function (appTemplate, prefix, suffix, data)
{
    var targetFolder,
        fileTypesToCreate = [],
        filesToOpen = [];
    suffix = suffix || '';
    prefix = prefix || '';


    // allow creating sub-modules
    if (this.targetFolder) {
        this.targetFolder = this.targetFolder
            .replace('scripts', '')
            .replace('app', '');
        targetFolder = path.join(this.targetFolder, this.name);
    } else {
        targetFolder = this.name
    }

    var tplPathWithoutFileExt = path.join(this.scriptsFolder, targetFolder, prefix + this.name + suffix).toLowerCase();
    var pathWithoutFileExt = path.join(this.env.options.appPath, tplPathWithoutFileExt);

    // attach params TODO it in a better way
    if (data) {
        for (var prop in data) {
            if (prop && data.hasOwnProperty(prop)) {
                this[prop] = data[prop];
            }
        }
    }

    // create html template
    if (data.createTemplate) {
        this.tplUrl = tplPathWithoutFileExt + this.tplSuffix;
        fileTypesToCreate.push(this.tplSuffix);
        fileTypesToCreate.push(this.styleSuffix);
    }

    if (data && (data.createService === 'service' || data.createService === 'factory')) {
        // create service
        // TODO run service generator here

        // Services use classified names
        this.svcName = this.classedName;
    }

    // create main file
    fileTypesToCreate.push(this.scriptSuffix);

    // create test
    fileTypesToCreate.push(this.testSuffix);

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