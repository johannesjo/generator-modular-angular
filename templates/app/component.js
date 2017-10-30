/**
 * @ngdoc component
 * @name <%= scriptAppName %>.component:<%= cameledName %><%= nameSuffix %>
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
        .component('<%= cameledName %><%= nameSuffix %>', {<% if(tplUrl) {%>
            templateUrl: '<%= tplUrl %>',<% } %>
            controller: <%= classedName %><%= nameSuffix %>Ctrl,
            controllerAs: '$ctrl',
            bindToController: {
            },
        });

    // hacky fix for ff
    <%= classedName %><%= nameSuffix %>Ctrl.$$ngIsClass = true;
})();
