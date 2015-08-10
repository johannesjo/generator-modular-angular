'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var helper = require('../helper.js');
var defaultSettings = require('../default-settings.js');
var yeoman = require('yeoman-generator');
var wiredep = require('wiredep');
var chalk = require('chalk');
var _s = require('underscore.string');


module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        // get app name
        this.argument('appname', {type: String, required: false});
        this.appname = this.appname || path.basename(process.cwd());
        this.appname = _s.camelize(_s.slugify(_s.humanize(this.appname)));
        this.slugAppName = _s.slugify(this.appname);
        this.humanizedAppName = _s.humanize(this.appname);
        this.scriptAppName = this.appname;


        // get app path
        try {
            this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
        } catch (e) {
        }
        this.env.options.appPath = this.env.options.appPath || 'app';
        this.options.appPath = this.env.options.appPath;
        this.appPath = this.env.options.appPath;


        this.pkg = require('../package.json');
        this.sourceRoot(path.join(__dirname, '../templates'));
    },

    config: function () {
        this.config.defaults(defaultSettings);
    },

    askForModules: function askForModules() {
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
                    checked: false
                }, {
                    value: 'resourceModule',
                    name: 'angular-resource.js',
                    checked: true
                }, {
                    value: 'sanitizeModule',
                    name: 'angular-sanitize.js',
                    checked: false
                }, {
                    value: 'touchModule',
                    name: 'angular-touch.js',
                    checked: false
                }, {
                    value: 'ngMaterialModule',
                    name: 'angular material design',
                    checked: false
                }, {
                    value: 'ngFabFormModule',
                    name: 'ng-fab-form (form helper)',
                    checked: false
                }, {
                    value: 'messagesModule',
                    name: 'angular-messages.js (included with ngFabForm)',
                    checked: false
                }, {
                    value: 'uiRouterModule',
                    name: 'ui-router.js',
                    checked: true
                }, {
                    value: 'routeModule',
                    name: 'angular-route.js (standard router dot\'t use with ui-router)',
                    checked: false
                }
            ]
        }];

        this.prompt(prompts, function (props) {
            var hasMod = function (mod) {
                // prevent test errors if no values mocked
                if (props && props.modules) {
                    return props.modules.indexOf(mod) !== -1;
                }
            };
            this.animateModule = hasMod('animateModule');
            this.ariaModule = hasMod('ariaModule');
            this.cookiesModule = hasMod('cookiesModule');
            this.messagesModule = hasMod('messagesModule');
            this.resourceModule = hasMod('resourceModule');
            this.routeModule = hasMod('routeModule');
            this.uiRouterModule = hasMod('uiRouterModule');
            this.ngFabFormModule = hasMod('ngFabFormModule');
            this.sanitizeModule = hasMod('sanitizeModule');
            this.ngMaterialModule = hasMod('ngMaterialModule');
            this.touchModule = hasMod('touchModule');

            var angMods = [];

            if (this.animateModule) {
                angMods.push('\'ngAnimate\'');
            }

            if (this.ariaModule) {
                angMods.push('\'ngAria\'');
            }

            if (this.cookiesModule) {
                angMods.push('\'ngCookies\'');
            }

            if (this.messagesModule) {
                angMods.push('\'ngMessages\'');
            }

            if (this.resourceModule) {
                angMods.push('\'ngResource\'');
            }

            if (this.routeModule) {
                angMods.push('\'ngRoute\'');
                this.env.options.ngRoute = true;
            }

            if (this.sanitizeModule) {
                angMods.push('\'ngSanitize\'');
            }

            if (this.touchModule) {
                angMods.push('\'ngTouch\'');
            }

            if (this.uiRouterModule) {
                angMods.push('\'ui.router\'');
                this.config.set('uiRouter', true);
                this.env.options.uiRouter = true;
            }

            if (this.ngMaterialModule) {
                angMods.push('\'ngMaterial\'');
                this.env.options.ngMaterial = true;
            }

            if (this.ngFabFormModule) {
                angMods.push('\'ngFabForm\'');
            }

            if (angMods.length) {
                this.env.options.angularDeps = '\n    ' + angMods.join(',\n    ') + '\n  ';
            }

            cb();
        }.bind(this));
    },

    askForCodingStyle: function askForModules() {
        var cb = this.async();

        var prompts = [{
            type: 'list',
            name: 'jscsCfg',
            message: 'What javascript coding style would you like to use (JSCS - see: http://jscs.info/)?',
            choices: [
                {
                    value: 'emptyCfg',
                    name: 'empty configuration file'
                },
                {
                    value: 'manualCfg',
                    name: 'configure via --auto-configure'
                }
            ]
        }];

        this.prompt(prompts, function (props) {
            var that = this;

            fs.writeFile('./.jscsrc', '{}', function (err) {
                if (err) {
                    return console.log(err);
                }
                if (props.jscsCfg === 'manualCfg') {
                    var jscsrcPath = path.join('./.jscsrc')
                    that.spawnCommand('jscs', ['--auto-configure', jscsrcPath])
                        .on('close', function () {
                            cb();
                        });
                } else {
                    cb();
                }
            });

        }.bind(this));
    },

    readIndex: function readIndex() {
        this.ngRoute = this.env.options.ngRoute;
        this.uiRouter = this.env.options.uiRouter;
        this.ngMaterial = this.env.options.ngMaterial;
        this.indexFile = this.engine(this.read('index.html'), this);
    },

    cssFiles: function bootstrapFiles() {
        this.fs.copy(
            this.templatePath('styles/**/*'),
            this.destinationPath(path.join(this.appPath, 'styles/')
            )
        );
    },

    createIndexHtml: function createIndexHtml() {
        this.indexFile = this.indexFile.replace(/&apos;/g, "'");
        this.write(path.join(this.appPath, 'index.html'), this.indexFile);
    },

    appJs: function appJs() {
        this.angularModules = this.env.options.angularDeps;

        this.template('app/_app.js', 'app/scripts/_app.js');
        this.template('app/_app.spec.js', 'app/scripts/_app.spec.js');
        if (this.env.options.uiRouter) {
            this.template('app/routes.js', 'app/scripts/routes.js');
            this.template('app/routes.spec.js', 'app/scripts/routes.spec.js');
        }
    },

    packageFiles: function packageFiles() {
        this.template('root/_bower.json', 'bower.json');
        this.template('root/_bowerrc', '.bowerrc');
        this.template('root/_package.json', 'package.json');
        this.template('root/_gulpfile.js', 'gulpfile.js');
        this.template('root/_config.xml', 'config.xml');
        this.template('root/_gitignore', '.gitignore');
        this.template('root/_gitattributes', '.gitattributes');
        this.template('root/_editorconfig', '.editorconfig');
        this.template('root/_jshintrc', '.jshintrc');
        this.template('root/README.md', 'README.md');
        this.template('root/_travis.yml', '.travis.yml');
        this.template('root/_karma.conf.js', 'karma.conf.js');
        this.template('root/_karma-e2e.conf.js', 'karma-e2e.conf.js');
    },

    tasks: function packageFiles() {
        // fixing lodash issue with ngconfig
        this.ngConfModulePlaceholder = '<%= module %>';

        this.template('tasks/config.js', 'tasks/config.js');
        this.template('tasks/build.js', 'tasks/build.js');
        this.template('tasks/dev.js', 'tasks/dev.js');
        this.template('tasks/deploy.js', 'tasks/deploy.js');
        this.template('tasks/e2e.js', 'tasks/e2e.js');

        // TODO make cordova optional
        this.template('tasks/cordova.js', 'tasks/cordova.js');
    },

    install: function packageFiles() {
        this.on('end', function () {
            //save configuration
            this.config.save();
            if (!this.options['skip-install']) {
                this.installDependencies({
                    callback: function () {
                        // Emit a new event - dependencies installed
                        this.emit('dependenciesInstalled');
                    }.bind(this)
                });
            }
        });
    },
    postRun: function () {
        this.on('dependenciesInstalled', function () {
            this.spawnCommand('gulp', ['serve']);
        });
    }
});

