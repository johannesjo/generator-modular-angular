'use strict';

describe('Filter: <%= cameledName %>', function () {

    // load the filter's module
    beforeEach(module('<%= scriptAppName %>'));

    // initialize a new instance of the filter before each test
    var <%= cameledName %>;
    beforeEach(inject(function ($filter) {
        <%= cameledName %> = $filter('<%= cameledName %>');
    }));

    it('should change some output:"', function () {
        // var text = 'angularjs';
        // expect(<%= cameledName %>(text)).toBe('something else');
        expect(true).toBe(<%= testPassOnDefault %>);

    });

});