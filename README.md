# generator-modular-angular
*A truly modular yeoman generator for AngularJS all device apps.*

This generator originated in the pure hate towards repetition and because all the ones I've used so far didn't fit my taste. `generator-modular-angular` is intended to encourage and ease a modular workflow for your AngularJS apps. It generates a front-end-build that uses all the tools I love (namely gulp, libsass and of course angular) and offers an **easy adaption towards multi-platform web-app hybrid-apps** (in short muplawehy-apps, if you didn't know). Although its great, you don't need ionic and sometimes you don't want to need it.

It's my first generator so credits to the [generator-angular](https://github.com/yeoman/generator-angular) team. Their code helped me to get started.

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
Then wait... ... ... finally:
```
gulp serve
```

## Features 
* **total injection**: basically everything you create is automatically injected where it needs to be and removed when its gone.
* **gulp and libsass speedified**: never thought I wouldn't miss grunt
* **super modular**: no more controller madness by design
* configurable and extendable (still work in progress though)

## Sub-Generators
### Directive
Example:

```
yo moda:d my-directive
```
**Options**

```
path, e.g.:
yo moda:directive my-directive my-directive-directory

```

**Parameters** 
```
--openInIntelliJ  : opens the created files automatically in intellj
--useDefaults     : skips the dialogs and uses the defaults
```




## (a concept of) the file-structure of the app folder
Don't worry. That's not what the output of the generator is, but what it could be. Have a look: 
```
index.html
bower_components/   // ignored
fonts/
images/
styles/
  _variables.scss
  main.scss
  base/
    _buttons.scss
    _fonts.scss
    _forms.scss
    _icons.scss
    _page.scss
    _typography.scss
  mixins/
    _mixin1.scss
    _mixin2.scss
  functions/
    _function1.scss
    _function2.scss
scripts/
  _app.js
  _app.spec.js
  _routes.js
  _routes.spec.js
  _main/
    auth/
    global-filters/
      some-filter.js
      some-filter.spec.js
    global-services/
      global-factory-f.js
      global-factory-f.spec
      global-service-s.js
      global-service-s.spec.js
  _routes/
    route1/
        _route1.scss
        route1-c.js
        route1-c.html
        route1-c.spec.js
        // optional service or factory
        route-model-s.js
        route-model-s.spec.js
    route2/
      subroute1/
        _subroute1.scss
        subroute1-c.js
        subroute1-c.html
        subroute1-c.spec.js
  module1/
    _module1.scss
    module1-d.js
    module1-d.spec.js    
    // optional service or factory
    module1-s.js
    module1-s.spec.js
  module2/
    sub-module1/
      _sub-module1.scss
      sub-module1-d.js
      sub-module1-d.spec.js    
      // optional service or factory
      sub-module1-s.js
      sub-module1-s.spec.js
```
There are some basic concepts behind this:

* What belongs together should be reflected in the file-structure
* Directives are the way to go. Build components. They're sexy enclosed logic and expressive. Chances are you'll reuse them and it is no problem if it is only in your current app.
* Use controllers economically. They will be gone in Angular 2.0 and honestly - I'm not too sad about it. Use them on a page-level (if your app has something like that) to get data for your views or for very minor things.


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
Of course there is more than just the app-folder:
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
