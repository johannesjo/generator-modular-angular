/**
 * @ngdoc provider
 * @name <%= scriptAppName %>.<%= classedName %><%= nameSuffix %>
 * @description
 * # <%= classedName %><%= nameSuffix %>
 * Provider in the <%= scriptAppName %>.
 */

(() => {
    'use strict';

  let config;

    // Private constructor-function aka factory definition
    class <%= classedName %><%= nameSuffix %> {
        /* @ngInject */
        constructor() {
        }

        someServiceFunction() {
        };
    }

    class <%= classedName %><%= nameSuffix %>Provider {
        /* @ngInject */
        constructor() {
          config = {};
        }

        // PROVIDER-FUNCTIONS
        extendConfig(additionalConfig) {
          config = angular.extend(config, additionalConfig);
        }

        // return service definition
        $get() {
          return new <%= classedName %><%= nameSuffix %>();
        }
    }

    angular
        .module('<%= scriptAppName %>')
        .provider('<%= classedName %><%= nameSuffix %>', <%= classedName %><%= nameSuffix %>Provider);

    // hacky fix for ff
    <%= classedName %><%= nameSuffix %>Provider.$$ngIsClass = true;
    <%= classedName %><%= nameSuffix %>.$$ngIsClass = true;
})();