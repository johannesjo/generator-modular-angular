'use strict';

/**
* @ngdoc directive
* @name <%= scriptAppName %>.directive:<%= cameledName %>
* @description
* # <%= cameledName %>
*/
angular.module('<%= scriptAppName %>')
.directive('<%= cameledName %>', function ()
{
    return {<% if(tplUrl) {%>
        templateUrl: '<%= tplUrl %>',
        <% } %>
        restrict: 'EA',
        scope: {

        },
        link: function (scope, el, attrs)
        {

        },
        controller: function ($scope<% if(createService) {%>, <%= svcName %><% } %>)
        {

        }
    };
});