'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.decorator:<%= classedName %><%= nameSuffix %>
 * @description
 * # <%= classedName %><%= nameSuffix %>
 * Decorator of the <%= scriptAppName %>
 */
angular.module('<%= scriptAppName %>')
    .config(function ($provide)
    {
        $provide.decorator('<%= classedName %><%= nameSuffix %>', function ($delegate)
        {
            return $delegate;
        });
    });