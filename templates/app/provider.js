/**
 * @ngdoc service
 * @name <%= scriptAppName %>.<%= cameledName %>
 * @description
 * # <%= cameledName %>
 * Provider in the <%= scriptAppName %>.
 */
angular.module('<%= scriptAppName %>')
    .provider('<%= cameledName %>', function <%= cameledName %>Provider ()
    {
        'use strict';

        var config = {

        };


        // Private constructor- function
        function <%= cameledName %>()
        {

            // *****************
            // SERVICE-FUNCTIONS
            // *****************
            this.someServiceFunction = function ()
            {
            };
        }


        // ******************
        // PROVIDER-FUNCTIONS
        // ******************
        this.extendConfig = function (additionalConfig)
        {
            config = angular.extend(config, additionalConfig);
        };


        // return service definition
        this.$get = function ()
        {
            return new <%= cameledName %>();
        };
    });