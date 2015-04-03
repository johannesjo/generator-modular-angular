'use strict';

describe('Directive: <%= cameledName %><%= nameSuffix %>', function ()
{

    // load the directive's module
    beforeEach(module('<%= scriptAppName %>'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope)
    {
        scope = $rootScope.$new();
    }));

    it('should do something', inject(function ($compile)
    {
        element = angular.element('<<%= _.dasherize(name) %>></<%= _.dasherize(name) %>>');
        expect(true).toBe(<%= testPassOnDefault %>);
    }));
});