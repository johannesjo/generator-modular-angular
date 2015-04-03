# <%= _.slugify(_.humanize(appname)) %>

This project is generated with [yo angular modular generator](https://github.com/johannes/generator-modular-angular)
version <%= pkg.version %>.

## Build & development

Run `gulp` for development, `gulp build` for building and `gulp buildCordova` for building the hybrid-app.

## Testing

Unit tests are automatically run with the default task. End-to-End tests are run via `gulp e2e`.

## The gulp tasks
As per default the following tasks are available at your convenience:

* `gulp`: The development task. Runs all the injectors (wiredep, for the scss files and for your JavaScript-project files) on file-change, file-creation or file-deletion. Unit-tests are run in parallel, as well as the sass-compilation. 
* `gulp injectAll`: Runs all the injectors once.
* `gulp build`: Minifies your JavaScript via ng-annotate, your css, your images and your html files and copies everything to the www-folder.  
* `gulp test`: Runs your unit tests with the keep-alive option. 
* `gulp testSingle`: Runs your unit tests once. 
* `gulp e2e`: Runs your end to end tests once. 

The mobile tasks require a little preparation described in the next section.

* `gulp buildCordova`: Runs the build task followed by a cordova-build.
* `gulp emulate`: Runs the build task and your app in the emulator.   
* `gulp run`: Runs the build task and your app on your device if connected. 
* `gulp releaseCordova`: Create release version of your app and copies the binaries to the release folder.

All tasks can be edited freely and can be found in the /tasks folder.
 
## Setting up the hybrid build
Compiling your app to a hybrid app requires a little bit of configuration and you need to have cordova installed. Fortunately [that is quite easy](http://cordova.apache.org/docs/en/4.0.0/guide_cli_index.md.html#The%20Command-Line%20Interface).

If everything is in place, you need to add the platforms you want to build your app on. For Android you would run:
```
cordova platform add android
```
If you get the message  `Current working directory is not a Cordova-based project` you need to create the www-folder first (e.g.: `mkdir www` from your projects root directory). 

After that you should build your current state via `gulp build` then you can run `gulp run` or `gulp emulate` to check out your app on your device or in the emulator.