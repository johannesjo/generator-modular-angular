'use strict';

describe('Controller: <%= classedName %><%= nameSuffix %>', function () {

    // load the controller's module
    beforeEach(module('<%= scriptAppName %>'));

    var <%= classedName %><%= nameSuffix %>;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        <%= classedName %><%= nameSuffix %> = $controller('<%= classedName %><%= nameSuffix %>', {
        // place here mocked dependencies
        });
    }));

    it('should ...', function () {
         expect(true).toBe(<%= testPassOnDefault %>);
    });
});