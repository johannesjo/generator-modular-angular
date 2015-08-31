/**
 * @ngdoc overview
 * @name <%= scriptAppName %>.routes
 * @description
 * # <%= scriptAppName %>.routes
 *
 * Routes module. All app states are defined here.
 */

angular.module('<%= scriptAppName %>')
    .config(function ($stateProvider, $urlRouterProvider)
    {
        'use strict';

        $urlRouterProvider.otherwise('/');

        $stateProvider
            /* STATES-NEEDLE - DO NOT REMOVE THIS */;

    });