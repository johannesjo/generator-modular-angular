/**
 * @ngdoc overview
 * @name <%= scriptAppName %>
 * @description
 * # <%= scriptAppName %>
 *
 * Main module of the application.
 */


(function() {
    'use strict';

    angular
        .module('<%= scriptAppName %>', [<%= angularModules %>]);
})();