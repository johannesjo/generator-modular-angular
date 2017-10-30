/**
 * @ngdoc factory
 * @name <%= scriptAppName %>.<%= classedName %><%= nameSuffix %>
 * @description
 * # <%= classedName %><%= nameSuffix %>
 * Factory in the <%= scriptAppName %>.
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
        .factory('<%= classedName %><%= nameSuffix %>', <%= classedName %><%= nameSuffix %>);

    // hacky fix for ff
    <%= classedName %><%= nameSuffix %>.$$ngIsClass = true;
})();
