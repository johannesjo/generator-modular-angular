'use strict';

describe('Directive: <%= cameledName %><%= nameSuffix %>', function() {

    // load the directive's module
    beforeEach(module('<%= scriptAppName %>'));
    beforeEach(module('templates'));

    var element,
        scope;

    beforeEach(inject(function($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should do something', inject(function($compile) {
        element = $compile('<<%= dashedName %>></<%= dashedName %>>')(scope);
        scope.$digest();
        expect(true).toBe(<%= testPassOnDefault %>);
    }));
});