/**
 * @ngdoc filter
 * @name <%= scriptAppName %>.filter:<%= cameledName %><%= nameSuffix %>
 * @function
 * @description
 * # <%= cameledName %><%= nameSuffix %>
 * Filter in the <%= scriptAppName %>.
 */

(() => {
    'use strict';

    angular
        .module('<%= scriptAppName %>')
        .filter('<%= cameledName %><%= nameSuffix %>', <%= cameledName %><%= nameSuffix %>);

    function <%= cameledName %><%= nameSuffix %>() {
        return (parameters) => {
            return parameters;
        }
    }
})();
