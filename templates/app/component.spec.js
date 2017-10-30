'use strict';

describe('Component: <%= cameledName %><%= nameSuffix %>', () => {

    // load the directive's module
    beforeEach(module('<%= scriptAppName %>'));
    beforeEach(module('templates'));

    let element;
    let scope;

    beforeEach(inject(($rootScope) => {
        scope = $rootScope.$new();
    }));

    it('should do something', inject(($compile) => {
        element = $compile('<<%= dashedName %>></<%= dashedName %>>')(scope);
        scope.$digest();
        expect(true).toBe(<%= testPassOnDefault %>);
    }));
});