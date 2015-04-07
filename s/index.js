'use strict';
var ScriptBase = require('../sub-generator-base.js');

module.exports = ScriptBase.extend({
    initializing: function ()
    {
        // needs to be called manually
        this.init();
    },
    createFactoryFiles: function createFactoryFiles()
    {
        this.generateSourceAndTest('service');
    }
});