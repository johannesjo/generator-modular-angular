'use strict';

describe('Filter: <%= cameledName %><%= nameSuffix %>', function () {

    // load the filter's module
    beforeEach(module('<%= scriptAppName %>'));

    // initialize a new instance of the filter before each test
    var <%= cameledName %><%= nameSuffix %>;
    beforeEach(inject(function ($filter) {
        <%= cameledName %><%= nameSuffix %> = $filter('<%= cameledName %><%= nameSuffix %>');
    }));

    it('should change some output:"', function () {
        // var text = 'angularjs';
        // expect(<%= cameledName %><%= nameSuffix %>(text)).toBe('something else');
        expect(true).toBe(<%= testPassOnDefault %>);

    });

});