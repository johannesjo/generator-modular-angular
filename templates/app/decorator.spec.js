'use strict';

describe('Decorator: <%= classedName %><%= nameSuffix %>', () => {
    // load the service's module
    beforeEach(module('<%= scriptAppName %>'));

    // instantiate service
    let <%= classedName %><%= nameSuffix %>;
    beforeEach(inject(function (_<%= classedName %><%= nameSuffix %>_) {
        <%= classedName %><%= nameSuffix %> = _<%= classedName %><%= nameSuffix %>_;
    }));

    it('should be defined', () => {
        expect(true).toBe(<%= testPassOnDefault %>);
    });

});