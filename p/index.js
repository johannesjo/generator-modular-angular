'use strict';
var ScriptBase = require('../sub-generator-base.js');

module.exports = ScriptBase.extend({
    createFactoryFiles: function createFactoryFiles()
    {
        this.generateSourceAndTest('provider');
    }
});
