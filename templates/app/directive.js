'use strict';

/**
* @ngdoc directive
* @name <%= scriptAppName %>.directive:<%= cameledName %><%= nameSuffix %>
* @description
* # <%= cameledName %><%= nameSuffix %>
*/
angular.module('<%= scriptAppName %>')
.directive('<%= cameledName %><%= nameSuffix %>', function ()
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