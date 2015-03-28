# generator-mod-angular
Modular yeoman generator for AngularJS all device apps.


# file-structure of app folder
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
## file pre- and suffixes
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

# ./ structure
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
  dev.js
www/          // ignored

```

# nice feature ideas
* hook for opening created files in favorite editor/ide
* ...
