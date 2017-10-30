'use strict';

describe('Provider: <%= classedName %><%= nameSuffix %>', () => {
    // load the service's module
    let provider;

    beforeEach(module('<%= scriptAppName %>', (<%= classedName %><%= nameSuffix %>Provider) => {
        provider = <%= classedName %><%= nameSuffix %>Provider;
    }));

    // instantiate service-function
    let <%= classedName %><%= nameSuffix %>;
    beforeEach(inject(function (_<%= classedName %><%= nameSuffix %>_) {
        <%= classedName %><%= nameSuffix %> = _<%= classedName %><%= nameSuffix %>_;
    }));

    it('should be defined', () => {
        // provider.extendConfig({});
        expect(true).toBe(<%= testPassOnDefault %>);
    });

});