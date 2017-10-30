/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:<%= classedName %><%= nameSuffix %>
 * @description
 * # <%= classedName %><%= nameSuffix %>
 * Controller of the <%= scriptAppName %>
 */

(() => {
    'use strict';

    class <%= classedName %><%= nameSuffix %> {
        /* @ngInject */
        constructor(<% if(createService) {%><%= svcName %><% } %>){
        }
    }

    angular
        .module('<%= scriptAppName %>')
        .controller('<%= classedName %><%= nameSuffix %>', <%= classedName %><%= nameSuffix %>);

    // hacky fix for ff
    <%= classedName %><%= nameSuffix %>.$$ngIsClass = true;

})();
