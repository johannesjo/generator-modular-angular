/**
 * @ngdoc provider
 * @name <%= scriptAppName %>.<%= classedName %><%= nameSuffix %>
 * @description
 * # <%= classedName %><%= nameSuffix %>
 * Provider in the <%= scriptAppName %>.
 */

(function() {
    'use strict';

    angular
        .module('<%= scriptAppName %>')
        .provider('<%= classedName %><%= nameSuffix %>');


    /* @ngInject */
    function <%= classedName %><%= nameSuffix %>Provider() {
        var config = {};

        // PROVIDER-FUNCTIONS
        this.extendConfig = function(additionalConfig) {
            config = angular.extend(config, additionalConfig);
        };

        // return service definition
        this.$get = function() {
            return new <%= classedName %><%= nameSuffix %>();
        };
    }

    // Private constructor-function aka factory definition
    /* @ngInject */
    function <%= classedName %><%= nameSuffix %>() {

        // SERVICE-FUNCTIONS
        this.someServiceFunction = function() {
        };
    }
});