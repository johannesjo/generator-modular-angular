/**
 * @ngdoc overview
 * @name <%= scriptAppName %>
 * @description
 * # <%= scriptAppName %>
 *
 * Main module of the application.
 */

(() => {
    'use strict';

    angular
        .module('<%= scriptAppName %>', [<%- angularModules %>]);
})();