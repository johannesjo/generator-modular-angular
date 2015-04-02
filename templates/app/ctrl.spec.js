'use strict';

describe('Controller: <%= classedName %>Ctrl', function () {

    // load the controller's module
    beforeEach(module('<%= scriptAppName %>'));

    var <%= classedName %>Ctrl;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        <%= classedName %>Ctrl = $controller('<%= classedName %>Ctrl', {
        // place here mocked dependencies
        });
    }));

    it('should ...', function () {
         expect(true).toBe(<%= testPassOnDefault %>);
    });
});