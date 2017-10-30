'use strict';

describe('Service: <%= classedName %><%= nameSuffix %>', () => {
    // load the service's module
    beforeEach(module('<%= scriptAppName %>'));

    // instantiate service
    let <%= classedName %><%= nameSuffix %>;
    beforeEach(inject((_<%= classedName %><%= nameSuffix %>_) => {
        <%= classedName %><%= nameSuffix %> = _<%= classedName %><%= nameSuffix %>_;
    }));

    it('should be defined', () => {
        expect(true).toBe(<%= testPassOnDefault %>);
    });

});