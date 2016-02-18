'use strict';
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');

exports.STATE_NEEDLE = '/* STATES-NEEDLE - DO NOT REMOVE THIS */';

// inspired by https://github.com/cgross/generator-cg-angular/blob/master/utils.js
exports.addToFile = function(filename, lineToAdd, beforeMarker) {
    try {
        var fullPath = path.resolve(process.cwd(), filename);
        var fileSrc = fs.readFileSync(fullPath, 'utf8');

        var indexOf = fileSrc.indexOf(beforeMarker);
        var lineStart = fileSrc.substring(0, indexOf)
                .lastIndexOf('\n') + 1;
        var indent = fileSrc.substring(lineStart, indexOf);
        fileSrc = fileSrc.substring(0, indexOf) + lineToAdd + '\n' + indent + fileSrc.substring(indexOf);

        fs.writeFileSync(fullPath, fileSrc);
    } catch (e) {
        throw e;
    }
};

exports.injectRoute = function(routesFile, name, url, tplUrl, ctrl, that) {
    var IND = '    ';
    var template = tplUrl ? ',\n' + IND + IND + IND + IND + 'templateUrl: \'' + tplUrl + '\'' : '';
    ctrl = ctrl ? ',\n' + IND + IND + IND + IND + 'controller: \'' + ctrl + '\'' : '';
    var ctrlAs = ctrl ? ',\n' + IND + IND + IND + IND + 'controllerAs: \'vm\'' : '';

    var code = '' +
        '.state(\'' + name + '\', {' +
        '\n' + IND + IND + IND + IND + 'url: \'' + url + '\'' +
        ctrl +
        ctrlAs +
        template +
        '\n' + IND + IND + IND + '})';
    exports.addToFile(routesFile, code, exports.STATE_NEEDLE);

    that.log.writeln(chalk.green(' updating') + ' %s', path.basename(routesFile));
};

