/**
 * @ngdoc component
 * @name <%= scriptAppName %>.component:<%= cameledName %><%= nameSuffix %>
 * @description
 * # <%= cameledName %><%= nameSuffix %>
 */

(function() {
    'use strict';

    angular
        .module('<%= scriptAppName %>')
        .component('<%= cameledName %><%= nameSuffix %>', <%= cameledName %><%= nameSuffix %>);

    /* @ngInject */
    function <%= cameledName %><%= nameSuffix %>() {
        return {<% if(tplUrl) {%>
            templateUrl: '<%= tplUrl %>',<% } %>
            controller: <%= classedName %><%= nameSuffix %>Ctrl,
            controllerAs: 'vm',
            bindings: {

            }
        };
    }

    /* @ngInject */
    function <%= classedName %><%= nameSuffix %>Ctrl(<% if(createService) {%><%= svcName %><% } %>) {
        var vm = this;
    }

})();
