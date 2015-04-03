/**
 * @ngdoc service
 * @name <%= scriptAppName %>.<%= classedName %><%= nameSuffix %>
 * @description
 * # <%= classedName %><%= nameSuffix %>
 * Factory in the <%= scriptAppName %>.
 */
angular.module('<%= scriptAppName %>')
    .factory('<%= classedName %><%= nameSuffix %>', function ()
    {
        'use strict';

        // INITIALIZATION


        // ACTUAL DEFINITION
        var service = {
            someMethod: function ()
            {

            }
        };

        return service;
    });