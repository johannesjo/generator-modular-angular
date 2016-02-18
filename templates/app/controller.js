/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:<%= classedName %><%= nameSuffix %>
 * @description
 * # <%= classedName %><%= nameSuffix %>
 * Controller of the <%= scriptAppName %>
 */

(function() {
    'use strict';

    angular
        .module('<%= scriptAppName %>')
        .controller('<%= classedName %><%= nameSuffix %>', <%= classedName %><%= nameSuffix %>);

    /* @ngInject */
    function <%= classedName %><%= nameSuffix %>() {
        var vm = this;
    }
})();
