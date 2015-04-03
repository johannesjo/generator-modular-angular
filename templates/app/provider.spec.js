'use strict';

describe('Provider: <%= classedName %><%= nameSuffix %>', function () {
    // load the service's module
    var provider;

    beforeEach(module('<%= scriptAppName %>', function (<%= classedName %><%= nameSuffix %>Provider)
    {
        provider = <%= classedName %><%= nameSuffix %>Provider;
    }));

    // instantiate service-function
    var <%= classedName %><%= nameSuffix %>;
    beforeEach(inject(function (_<%= classedName %><%= nameSuffix %>_) {
        <%= classedName %><%= nameSuffix %> = _<%= classedName %><%= nameSuffix %>_;
    }));

    it('should be defined', function () {
        // provider.extendConfig({});
        expect(true).toBe(<%= testPassOnDefault %>);
    });

});