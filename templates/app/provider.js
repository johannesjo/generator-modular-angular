/**
 * @ngdoc service
 * @name <%= scriptAppName %>.<%= classedName %><%= nameSuffix %>
 * @description
 * # <%= classedName %><%= nameSuffix %>
 * Provider in the <%= scriptAppName %>.
 */
angular.module('<%= scriptAppName %>')
    .provider('<%= classedName %><%= nameSuffix %>', function <%= classedName %><%= nameSuffix %>Provider ()
    {
        'use strict';

        var config = {

        };


        // ******************
        // PROVIDER-FUNCTIONS
        // ******************
        this.extendConfig = function (additionalConfig)
        {
            config = angular.extend(config, additionalConfig);
        };

        // *****************************
        // Private constructor-function
        // aka factory definition
        // *****************************
        function <%= classedName %><%= nameSuffix %>()
        {

            // *****************
            // SERVICE-FUNCTIONS
            // *****************
            this.someServiceFunction = function ()
            {
            };
        }

        // return service definition
        this.$get = function ()
        {
            return new <%= classedName %><%= nameSuffix %>();
        };
    });