'use strict';

describe('Factory: <%= classedName %><%= nameSuffix %>', function () {
    // load the service's module
    beforeEach(module('<%= scriptAppName %>'));

    // instantiate service
    var <%= classedName %><%= nameSuffix %>;
    beforeEach(inject(function (_<%= classedName %><%= nameSuffix %>_) {
        <%= classedName %><%= nameSuffix %> = _<%= classedName %><%= nameSuffix %>_;
    }));

    it('should be defined', function () {
        expect(true).toBe(<%= testPassOnDefault %>);
    });

});