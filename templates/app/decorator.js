/**
 * @ngdoc function
 * @name <%= scriptAppName %>.decorator:<%= classedName %><%= nameSuffix %>
 * @description
 * # <%= classedName %><%= nameSuffix %>
 * Decorator of the <%= scriptAppName %>
 */

(function() {
    'use strict';

    angular
        .module('<%= scriptAppName %>')
        .config(<%= classedName %><%= nameSuffix %>);

    function <%= classedName %><%= nameSuffix %>($provide) {
        $provide.decorator('<%= classedName %', function($delegate) {
            return $delegate;
        });
    }
})();
