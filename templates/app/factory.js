/**
 * @ngdoc factory
 * @name <%= scriptAppName %>.<%= classedName %><%= nameSuffix %>
 * @description
 * # <%= classedName %><%= nameSuffix %>
 * Factory in the <%= scriptAppName %>.
 */

(function() {
    'use strict';

    angular
        .module('<%= scriptAppName %>')
        .factory('<%= classedName %><%= nameSuffix %>', <%= classedName %><%= nameSuffix %>);

    /* @ngInject */
    function <%= classedName %><%= nameSuffix %>() {
        // INITIALIZATION


        // ACTUAL DEFINITION
        return {
            someMethod: function() {
            }
        };
    }
})();
