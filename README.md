[![Build Status](https://travis-ci.org/johannesjo/generator-modular-angular.svg)](https://travis-ci.org/johannesjo/generator-modular-angular)
[![Coverage Status](https://coveralls.io/repos/johannesjo/generator-modular-angular/badge.svg?branch=master)](https://coveralls.io/r/johannesjo/generator-modular-angular?branch=master)

# generator-modular-angular
*A truly modular yeoman generator for AngularJS all device apps.*

This generator originated in the pure hate towards repetition and because all the ones I've used so far didn't fit my taste. `generator-modular-angular` is intended to encourage and ease a modular workflow for your AngularJS apps. It generates a front-end-build that uses all the tools I love (namely gulp, libsass and of course angular) and offers an **easy adaption towards multi-platform web-app hybrid-apps**(in shot muplawehy-apps, if you didn't know). Although its great, you don't need ionic and sometimes you don't want to need it.

Credits to the [generator-angular](https://github.com/yeoman/generator-angular) team. Their code helped me to get started and some of the file-templates are very similiar.

## Getting started
I assume that you have all the good tools already installed (node, bower, yeoman, gulp) in a proper way. Just run:
```
npm install -g generator-modular-angular
```
Then make a new directory and cd into it
```
mkdir my-super-modular-project && cd $_
```
Run it!
```
yo moda [app-name]
```
Then wait........  finally:
```
gulp serve
```

## Features
* **total injection**: basically everything you create is automatically injected where it needs to be and removed when its gone.
* **gulp and libsass speedified**: never thought I wouldn't miss grunt
* **super modular**: no more controller madness by design
* configurable and extendable (still work in progress though)

## Basic concepts behind this Generator
* What belongs together should be reflected in the file-structure. Grouping files by module is generally preferable to grouping files by type.
* Directives are the way to go. Build components all the way. They're sexy enclosed logic and expressive. Chances are you'll reuse them and it is no problem if it is only in your current app.
* Use controllers economically. They will be gone in Angular 2.0 and honestly - I'm not too sad about it. Use them on a page-level (if your app has something like that) to get data for your views or for very minor and very specific logic.

## Sub-Generators
* [moda](#moda) (aka [moda:app](#app))
* [directive](#directive)
* [service](#service)
* [factory](#factory)
* [controller](#controller)
* [provider](#provider)
* [decorator](#decorator)
* [route](#route)
* [e2e-test](#e2e-test)
* [page-object](#page-object)

### moda
The main generator. Sets up the basic boilerplate. Provides an interactive prompt to install the most common modules.

### directive
Interactively generates a directive, a test file and if you choose so a scss and html-template files.

**usage:**
```
yo moda:d my-directive
```
**output:**
```
app/scripts/my-directive/my-directive-d.js
app/scripts/my-directive/my-directive-d.spec.js

// If you choose the template option (default:true)
app/scripts/my-directive/my-directive-d.html
app/scripts/my-directive/_my-directive-d.scss
// If you choose service for the service or factory option (default:false)
app/scripts/my-directive/my-directive-s.js
// If you choose factory
app/scripts/my-directive/my-directive-f.js
```

You can also specify a path or a parent module:
```
yo moda:d my-directive my-path
```
**output:**
```
app/scripts/my-path/my-directive/my-directive-d.js
app/scripts/my-path/my-directive/my-directive-d.spec.js
```
By default directives are wrapped into their own folder. If you don't want that you can specify the `--noParentFolder` flag:

```
yo moda:d my-directive my-path --noParentFolder
```

### controller
Creates a controller and a test-file and template and service-files if you choose so. Although it works just fine, most of the time you probably would want to use [route](#route) or [directive](#directive) instead.

**usage:**
```
yo moda:c my-ctrl
```
**output:**
```
app/scripts/my-ctrl/my-ctrl-c.js
app/scripts/my-ctrl/my-ctrl-c.spec.js

// If you choose the template option (default:true)
app/scripts/my-ctrl/my-ctrl-c.html
app/scripts/my-ctrl/_my-ctrl-c.scss
// If you choose service for the service or factory option (default:false)
app/scripts/my-ctrl/my-ctrl-s.js
// If you choose factory
app/scripts/my-ctrl/my-ctrl-f.js
```

You can also specify a path or a parent module:
```
yo moda:c my-ctrl my-path
```
**output:**
```
app/scripts/my-path/my-ctrl/my-ctrl-d.js
app/scripts/my-path/my-ctrl/my-ctrl-d.spec.js
```
By default controllers are wrapped into their own folder. If you don't want that you can specify the `--noParentFolder` flag:

```
yo moda:c my-ctrl my-path --noParentFolder
```

### service
Creates a service.

**usage:**
```
yo moda:s my-service
```
**output:**
```
app/scripts/my-global-service-dir/my-service-s.js
app/scripts/my-global-service-dir/my-service-s.spec.js
```
Setting the default global-service (and factory) directory can be done by editing the .yo-rc.json

You can specify a path or a parent module:
```
yo moda:s my-service my-path
```
**output:**
```
app/scripts/my-path/my-service-s.js
app/scripts/my-path/my-service-s.spec.js
```



### factory
Creates a factory.

**usage:**
```
yo moda:f my-factory
```
**output:**
```
app/scripts/my-global-service-dir/my-factory-f.js
app/scripts/my-global-service-dir/my-factory-f.spec.js
```
Setting the default global-service (and factory) directory can be done by editing the .yo-rc.json

You can specify a path or a parent module:
```
yo moda:s my-factory my-path
```
**output:**
```
app/scripts/my-path/my-factory-f.js
app/scripts/my-path/my-factory-f.spec.js
```

### filter
Creates a filter.

**usage:**
```
yo moda:filter my-filter
```
**output:**
```
app/scripts/my-global-filter-dir/my-filter-filter.js
app/scripts/my-global-filter-dir/my-filter-filter.spec.js
```
Setting the default global-filter directory can be done by editing the .yo-rc.json

You can specify a path or a parent module:
```
yo moda:s my-filter my-path
```
**output:**
```
app/scripts/my-path/my-filter-filter.js
app/scripts/my-path/my-filter-filter.spec.js
```

### provider
Creates a provider.

**usage:**

```
yo moda:p my-provider
```

**output:**

```
app/scripts/my-global-service-dir/my-provider-p.js
app/scripts/my-global-service-dir/my-provider-p.spec.js
```
Setting the default global-service (and factory) directory can be done by editing the .yo-rc.json

You can specify a path or a parent module:
```
yo moda:p my-provider my-path
```

**output:**

```
app/scripts/my-path/my-provider-p.js
app/scripts/my-path/my-provider-p.spec.js
```

### decorator
Creates a decorator.


**usage:**

```
yo moda:decorator my-decorator
```

**output:**

```
app/scripts/my-global-service-dir/my-decorator-decorator.js
app/scripts/my-global-service-dir/my-decorator-decorator.spec.js
```
Setting the default global-service directory can be done by editing the .yo-rc.json

You can specify a path or a parent module:
```
yo moda:decorator my-decorator my-path
```

**output:**

```
app/scripts/my-path/my-decorator-decorator.js
app/scripts/my-path/my-decorator-decorator.spec.js
```

### route
not implemented yet

### e2e-test 
not implemented yet

### page-object
not implemented yet


## Sub-Generator Options and Parameters
**Parameters**

* `--openInEditor`  opens the created files automatically in your favorite editor (specified via .yo-rc.json)
* `--useDefaults`     skips the dialogs and uses the defaults
* `--skipInject`      skips running grunt inject after file creation
* `--noParentFolder`  does prevent the creation of a wrapper directory with the component name for directives and controllers


### file pre- and suffixes
To distinguish files (e.g. in your awesome file searcher) they're su- and prefixed by the following rules:
```
_*/             : main app directories main and route
are prefixed to be shown on top
_*.js           : angular module, prefixed like this to be
loaded first by file-injection
*.spec.js       : unit tests of all kind
*.e2e.js        : end to end tests
*-c.js          : controller
*-c.html        : controller-template
*-c.scss        : route-specfic (usually page-level) styles
*-d.js          : directive
*-d.html        : directive-template
*-d.scss        : directive-specific (usually component-level) styles
*-f.js          : factory
*-s.js          : service
*-p.js          : provider
*-filter.js     : filter
*-decorator.js  : decorator
```

## ./ structure
This is a list of files which get create by `moda:app` at the root level
```
.bowerrc
.editorconfig
.gitignore
.jshintrc
.travis.yml
bower.json
config.xml
gulpfile.js
karma.conf.js
karma-e2e.conf.js
package.json
app/
e2e-tests/
    po/         // page-objects
    example.e2e.js
node_modules/
plattforms/   // ignored
plugins/
tasks/
    build.js
    config.js
    cordova.js
    deploy.js
    dev.js
www/          // ignored
```


## how to set up your generator to run with intellij, webstorm, phpstorm, etc
Yap, its possible. I wrote a [wiki-article](https://github.com/johannesjo/generator-modular-angular/wiki/How-to-integrate-the-generator-with-Jetbrains-products-on-Ubuntu) on how I did it on Ubuntu with IntelliJ. And for those who didn't know: There is a [video by John Lindquist](https://www.youtube.com/watch?v=KBueufmUgdw) for those of you lucky enough having no path issues with node on your machine.

## nice feature ideas
* hook for opening created files in favorite editor/ide
* ...
