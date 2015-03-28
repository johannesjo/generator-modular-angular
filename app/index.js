'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var wiredep = require('wiredep');
var chalk = require('chalk');

var Generator = module.exports = function Generator(args, options)
{
    yeoman.generators.Base.apply(this, arguments);
    this.argument('appname', {type: String, required: false});
    this.appname = this.appname || path.basename(process.cwd());
    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

    this.scriptAppName = this.appname + angularUtils.appName(this);

    args = ['main'];

    if (typeof this.env.options.appPath === 'undefined') {
        this.option('appPath', {
            desc: 'Allow to choose where to write the files'
        });

        this.env.options.appPath = this.options.appPath;

        if (!this.env.options.appPath) {
            try {
                this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
            } catch (e) {
            }
        }
        this.env.options.appPath = this.env.options.appPath || 'app';
        this.options.appPath = this.env.options.appPath;
    }

    this.appPath = this.env.options.appPath;

    this.hookFor('angular:common', {
        args: args
    });

    this.hookFor('angular:main', {
        args: args
    });

    this.hookFor('angular:controller', {
        args: args
    });

    this.on('end', function ()
    {
        var jsExt = this.options.coffee ? 'coffee' : 'js';

        var bowerComments = [
            'bower:js',
            'endbower'
        ];
        if (this.options.coffee) {
            bowerComments.push('bower:coffee');
            bowerComments.push('endbower');
        }

        this.invoke('karma:app', {
            options: {
                'skip-install': this.options['skip-install'],
                'base-path': '../',
                'coffee': this.options.coffee,
                'travis': true,
                'files-comments': bowerComments.join(','),
                'app-files': 'app/scripts/**/*.' + jsExt,
                'test-files': [
                    'test/mock/**/*.' + jsExt,
                    'test/spec/**/*.' + jsExt
                ].join(','),
                'bower-components-path': 'bower_components'
            }
        });

        this.installDependencies({
            skipInstall: this.options['skip-install'],
            skipMessage: this.options['skip-message'],
            callback: this._injectDependencies.bind(this)
        });

        if (this.env.options.ngRoute) {
            this.invoke('angular:route', {
                args: ['about']
            });
        }
    });

    this.pkg = require('../package.json');
    this.sourceRoot(path.join(__dirname, '../templates/common'));
};

util.inherits(Generator, yeoman.generators.Base);


//Generator.prototype.projectName = function projectName()
//{
//this.log(yosay());
//    this.prompt({
//        type: 'input',
//        name: 'name',
//        message: 'Your project name (used for bower.json, package.json, angular.module-name, config.xml)',
//        default: this.appname // Default to current folder name
//    }, function (answers)
//    {
//        this.log(answers.name);
//    }.bind(this));
//};

Generator.prototype.askForCssFramework = function askForCssFramework()
{
    var cb = this.async();

    this.prompt([{
        type: 'confirm',
        name: 'useCssFramework',
        message: 'Would you like to include a css-Framework?',
        default: true
    }, {
        when: function (props)
        {
            return props.useCssFramework;
        },
        type: 'list',
        name: 'cssFramwork',
        message: 'Which (s)css-framework would you like to use?',
        default: 'animateModule',
        choices: [
            {
                value: 'bootstrap (sass)',
                name: 'angular-ui-bootstrap'
            },
            {
                value: 'angular-ui-bootstrap',
                name: 'angular-ui-bootstrap'
            },
            {
                value: 'foundation',
                name: 'foundation'
            },
            {
                value: 'semantic-ui',
                name: 'bootstrap'
            },
            {
                value: 'ionic',
                name: 'ionic'
            }
        ]
    }, {
        when: function (props)
        {
            return props.useCssFramework;
        },
        type: 'confirm',
        name: 'useCssFrameworkJs',
        message: 'Would you like to to add the frameworks js files to the wiredep ignore?',
        default: true
    }], function (props)
    {
        this.useCssFramework = props.useCssFramework;
        this.cssFramwork = props.cssFramwork;

        cb();
    }.bind(this));
};

Generator.prototype.askForModules = function askForModules()
{
    var cb = this.async();

    var prompts = [{
        type: 'checkbox',
        name: 'modules',
        message: 'Which modules would you like to include?',
        choices: [
            {
                value: 'animateModule',
                name: 'angular-animate.js',
                checked: true
            }, {
                value: 'ariaModule',
                name: 'angular-aria.js',
                checked: true
            }, {
                value: 'cookiesModule',
                name: 'angular-cookies.js',
                checked: true
            }, {
                value: 'resourceModule',
                name: 'angular-resource.js',
                checked: true
            }, {
                value: 'sanitizeModule',
                name: 'angular-sanitize.js',
                checked: true
            }, {
                value: 'touchModule',
                name: 'angular-touch.js',
                checked: true
            }, {
                value: 'ngFabFormModule',
                name: 'ng-fab-form.js',
                checked: true
            }, {
                value: 'messagesModule',
                name: 'angular-messages.js (included with ngFabForm)',
                checked: false
            }, {
                value: 'ui-router',
                name: 'ui-router.js',
                checked: true
            }, {
                value: 'routeModule',
                name: 'angular-route.js (standard router dot\'t use with ui-router)',
                checked: false
            }
        ]
    }];

    this.prompt(prompts, function (props)
    {
        var hasMod = function (mod)
        {
            return props.modules.indexOf(mod) !== -1;
        };
        this.animateModule = hasMod('animateModule');
        this.ariaModule = hasMod('ariaModule');
        this.cookiesModule = hasMod('cookiesModule');
        this.messagesModule = hasMod('messagesModule');
        this.resourceModule = hasMod('resourceModule');
        this.routeModule = hasMod('routeModule');
        this.sanitizeModule = hasMod('sanitizeModule');
        this.touchModule = hasMod('touchModule');

        var angMods = [];

        if (this.animateModule) {
            angMods.push("'ngAnimate'");
        }

        if (this.ariaModule) {
            angMods.push("'ngAria'");
        }

        if (this.cookiesModule) {
            angMods.push("'ngCookies'");
        }

        if (this.messagesModule) {
            angMods.push("'ngMessages'");
        }

        if (this.resourceModule) {
            angMods.push("'ngResource'");
        }

        if (this.routeModule) {
            angMods.push("'ngRoute'");
            this.env.options.ngRoute = true;
        }

        if (this.sanitizeModule) {
            angMods.push("'ngSanitize'");
        }

        if (this.touchModule) {
            angMods.push("'ngTouch'");
        }

        if (angMods.length) {
            this.env.options.angularDeps = '\n    ' + angMods.join(',\n    ') + '\n  ';
        }

        cb();
    }.bind(this));
};

Generator.prototype.readIndex = function readIndex()
{
    this.ngRoute = this.env.options.ngRoute;
    this.indexFile = this.engine(this.read('app/index.html'), this);
};

Generator.prototype.bootstrapFiles = function bootstrapFiles()
{
    var cssFile = 'styles/main.' + (this.compass ? 's' : '') + 'css';
    this.copy(
        path.join('app', cssFile),
        path.join(this.appPath, cssFile)
    );
};

Generator.prototype.appJs = function appJs()
{
    this.indexFile = this.appendFiles({
        html: this.indexFile,
        fileType: 'js',
        optimizedPath: 'scripts/scripts.js',
        sourceFileList: ['scripts/app.js', 'scripts/controllers/main.js'],
        searchPath: ['.tmp', this.appPath]
    });
};

Generator.prototype.createIndexHtml = function createIndexHtml()
{
    this.indexFile = this.indexFile.replace(/&apos;/g, "'");
    this.write(path.join(this.appPath, 'index.html'), this.indexFile);
};

Generator.prototype.packageFiles = function packageFiles()
{
    this.coffee = this.env.options.coffee;
    this.template('root/_bower.json', 'bower.json');
    this.template('root/_bowerrc', '.bowerrc');
    this.template('root/_package.json', 'package.json');
    this.template('root/_Gruntfile.js', 'Gruntfile.js');
    this.template('root/README.md', 'README.md');
};

Generator.prototype._injectDependencies = function _injectDependencies()
{
    if (this.options['skip-install']) {
        this.log(
            'After running `npm install & bower install`, inject your front end dependencies' +
            '\ninto your source code by running:' +
            '\n' +
            '\n' + chalk.yellow.bold('grunt wiredep')
        );
    } else {
        this.spawnCommand('gulp', ['wiredep']);
        this.spawnCommand('gulp', ['inj']);
    }
};