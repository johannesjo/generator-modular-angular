'use strict';

describe('Provider: <%= classedName %>', function () {
    // load the service's module
    var provider;

    beforeEach(module('<%= scriptAppName %>', function (<%= classedName %>Provider)
    {
        provider = <%= classedName %>Provider;
    }));

    // instantiate service-function
    var <%= classedName %>;
    beforeEach(inject(function (_<%= classedName %>_) {
        <%= classedName %> = _<%= classedName %>_;
    }));

    it('should be defined', function () {
        // provider.extendConfig({});
        expect(true).toBe(<%= testPassOnDefault %>);
    });

});