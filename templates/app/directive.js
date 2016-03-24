/**
 * @ngdoc directive
 * @name <%= scriptAppName %>.directive:<%= cameledName %><%= nameSuffix %>
 * @description
 * # <%= cameledName %><%= nameSuffix %>
 */

(function() {
    'use strict';

    angular
        .module('<%= scriptAppName %>')
        .directive('<%= cameledName %><%= nameSuffix %>', <%= cameledName %><%= nameSuffix %>);

    /* @ngInject */
    function <%= cameledName %><%= nameSuffix %>() {
        return {<% if(tplUrl) {%>
            templateUrl: '<%= tplUrl %>',<% } %>
            bindToController: true,
            controller: <%= classedName %><%= nameSuffix %>Ctrl,
            controllerAs: 'vm',
            link: linkFn,
            restrict: 'A',
            scope: {

            }
        };

        function linkFn(scope, element, attrs) {

        }
    }

    /* @ngInject */
    function <%= classedName %><%= nameSuffix %>Ctrl(<% if(createService) {%><%= svcName %><% } %>) {
        var vm = this;
    }

})();
