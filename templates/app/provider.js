/**
 * @ngdoc service
 * @name <%= scriptAppName %>.<%= classedName %>
 * @description
 * # <%= classedName %>
 * Provider in the <%= scriptAppName %>.
 */
angular.module('<%= scriptAppName %>')
    .provider('<%= classedName %>', function <%= classedName %>Provider ()
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
        function <%= classedName %>()
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
            return new <%= classedName %>();
        };
    });