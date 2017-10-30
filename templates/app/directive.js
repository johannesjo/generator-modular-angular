/**
 * @ngdoc directive
 * @name <%= scriptAppName %>.directive:<%= cameledName %><%= nameSuffix %>
 * @description
 * # <%= cameledName %><%= nameSuffix %>
 */

(() => {
    'use strict';

    class <%= classedName %><%= nameSuffix %>Ctrl {
        /* @ngInject */
        constructor(<% if(createService) {%><%= svcName %><% } %>){
        }
    }

    angular
    .module('<%= scriptAppName %>')
    .directive('<%= cameledName %><%= nameSuffix %>', {<% if(tplUrl) {%>
        templateUrl: '<%= tplUrl %>',<% } %>
        bindToController: {
        },
        controller: <%= classedName %><%= nameSuffix %>Ctrl,
        controllerAs: '$ctrl',
        restrict: 'A',
        scope: true
    });

    // hacky fix for ff
    <%= classedName %><%= nameSuffix %>Ctrl.$$ngIsClass = true;
})();
