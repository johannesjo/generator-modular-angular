# generator-mod-angular
Modular yeoman generator for AngularJS all device apps.


## file-structure
```
// global
_app.js
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
  _routes.js
  _routes.spec.js
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
  
