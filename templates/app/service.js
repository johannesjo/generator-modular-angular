/**
 * @ngdoc service
 * @name <%= scriptAppName %>.<%= classedName %><%= nameSuffix %>
 * @description
 * # <%= classedName %><%= nameSuffix %>
 * Service in the <%= scriptAppName %>.
 */

(function() {
    'use strict';

    angular
        .module('<%= scriptAppName %>')
        .service('<%= classedName %><%= nameSuffix %>', <%= classedName %><%= nameSuffix %>);

    /* @ngInject */
    function <%= classedName %><%= nameSuffix %>() {

        // AngularJS will instantiate a singleton by calling "new" on this function
    }

})();
