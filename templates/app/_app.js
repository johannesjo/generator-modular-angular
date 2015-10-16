/**
 * @ngdoc overview
 * @name <%= scriptAppName %>
 * @description
 * # <%= scriptAppName %>
 *
 * Main module of the application.
 */
'use strict';

angular.module('<%= scriptAppName %>', [<% if(angularModules){for(i = 0; i < angularModules.length; i++){%>
        <% if(i===angularModules.length-1){ %>'<%= angularModules[i] %>'<% } else {%>'<%= angularModules[i] %>',<% } %><% };} %>
]);
