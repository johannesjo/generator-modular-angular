/**
 * @ngdoc filter
 * @name <%= scriptAppName %>.filter:<%= cameledName %><%= nameSuffix %>
 * @function
 * @description
 * # <%= cameledName %><%= nameSuffix %>
 * Filter in the <%= scriptAppName %>.
 */

(function() {
    'use strict';

    angular
        .module('<%= scriptAppName %>')
        .filter('<%= cameledName %><%= nameSuffix %>', <%= cameledName %><%= nameSuffix %>);

    function <%= cameledName %><%= nameSuffix %>() {
        return function (parameters) {
            return parameters;
        }
    }
})();
