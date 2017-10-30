'use strict';

describe('Filter: <%= cameledName %><%= nameSuffix %>', () => {

    // load the filter's module
    beforeEach(module('<%= scriptAppName %>'));

    // initialize a new instance of the filter before each test
    let <%= cameledName %><%= nameSuffix %>;
    beforeEach(inject(($filter) => {
        <%= cameledName %><%= nameSuffix %> = $filter('<%= cameledName %><%= nameSuffix %>');
    }));

    it('should change some output:"', () => {
        // var text = 'angularjs';
        // expect(<%= cameledName %><%= nameSuffix %>(text)).toBe('something else');
        expect(true).toBe(<%= testPassOnDefault %>);

    });

});