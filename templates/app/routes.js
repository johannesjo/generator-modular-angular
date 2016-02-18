/**
 * @ngdoc overview
 * @name <%= scriptAppName %>.routes
 * @description
 * # <%= scriptAppName %>.routes
 *
 * Routes module. All app states are defined here.
 */

(function() {
    'use strict';

    angular
        .module('<%= scriptAppName %>')
        .config(routerHelperProvider);

    /* @ngInject */
    function routerHelperProvider($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            /* STATES-NEEDLE - DO NOT REMOVE THIS */;
    }
})();
