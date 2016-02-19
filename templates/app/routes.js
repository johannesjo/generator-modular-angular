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
            .state('home', {
                url: '/',
                template: '<div><h1>Hello!</h1><p>All clean here, as intended! Why not build some routes via "yo moda:r my-route"?</p></div>'
            })
            /* STATES-NEEDLE - DO NOT REMOVE THIS */;
    }
})();
