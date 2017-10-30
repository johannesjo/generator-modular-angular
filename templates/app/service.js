/**
 * @ngdoc service
 * @name <%= scriptAppName %>.<%= classedName %><%= nameSuffix %>
 * @description
 * # <%= classedName %><%= nameSuffix %>
 * Service in the <%= scriptAppName %>.
 */

(() => {
    'use strict';

    class <%= classedName %><%= nameSuffix %> {
        /* @ngInject */
        constructor(){
        }
    }

    angular
        .module('<%= scriptAppName %>')
        .service('<%= classedName %><%= nameSuffix %>', <%= classedName %><%= nameSuffix %>);

    // hacky fix for ff
    <%= classedName %><%= nameSuffix %>.$$ngIsClass = true;
})();
