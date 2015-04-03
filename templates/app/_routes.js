/**
 * @ngdoc overview
 * @name <%= scriptAppName %>.routes
 * @description
 * # <%= scriptAppName %>.routes
 *
 * Routes module. All app states are defined here.
 */

angular.module('<%= scriptAppName %>.routes', [])
    .config(function ($stateProvider)
    {
        'use strict';

        $stateProvider
            .state('main', {
                url: '/'
                // ,templateUrl: 'some-tpl.html',
                // controller: 'MainCtrl'
            });
    });