'use strict';

describe('Decorator: <%= classedName %>', function () {
    // load the service's module
    beforeEach(module('<%= scriptAppName %>'));

    // instantiate service
    var <%= classedName %>;
    beforeEach(inject(function (_<%= classedName %>_) {
        <%= classedName %> = _<%= classedName %>_;
    }));

    it('should be defined', function () {
        expect(true).toBe(<%= testPassOnDefault %>);
    });

});