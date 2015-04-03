/**
 * @ngdoc filter
 * @name <%= scriptAppName %>.filter:<%= cameledName %><%= nameSuffix %>
 * @function
 * @description
 * # <%= cameledName %><%= nameSuffix %>
 * Filter in the <%= scriptAppName %>.
 */
angular.module('<%= scriptAppName %>')
    .filter('<%= cameledName %><%= nameSuffix %>', function ()
    {
        'use strict';

        return function (input)
        {
            return input;
        };
    });