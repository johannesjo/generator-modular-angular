'use strict';

describe('Controller: <%= classedName %><%= nameSuffix %>', () => {

    // load the controller's module
    beforeEach(module('<%= scriptAppName %>'));

    let <%= classedName %><%= nameSuffix %>;
    let scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(($controller, $rootScope) => {
        scope = $rootScope.$new();
        <%= classedName %><%= nameSuffix %> = $controller('<%= classedName %><%= nameSuffix %>', {
             $scope: scope
             // place mocked dependencies here
        });
    }));

    it('should ...', () => {
         expect(true).toBe(<%= testPassOnDefault %>);
    });
});