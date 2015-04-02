'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.decorator:<%= classedName %>
 * @description
 * # <%= classedName %>
 * Decorator of the <%= scriptAppName %>
 */
angular.module('<%= scriptAppName %>')
    .config(function ($provide)
    {
        $provide.decorator('<%= cameledName %>', function ($delegate)
        {
            return $delegate;
        });
    });