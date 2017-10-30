/**
 * @ngdoc function
 * @name <%= scriptAppName %>.decorator:<%= classedName %><%= nameSuffix %>
 * @description
 * # <%= classedName %><%= nameSuffix %>
 * Decorator of the <%= scriptAppName %>
 */

(() => {
    'use strict';

    angular
        .module('<%= scriptAppName %>')
        .config(<%= classedName %><%= nameSuffix %>);

    function <%= classedName %><%= nameSuffix %>($provide) {
        $provide.decorator('<%= classedName %>', ($delegate) => {
            return $delegate;
        });
    }
})();
