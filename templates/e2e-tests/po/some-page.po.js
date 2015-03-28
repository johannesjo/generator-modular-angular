var SomePage = (function ()
{
    'use strict';

    function SomePage()
    {
        this.btn = element(by.cssContainingText('.btn', 'Nice Button Text'));
    }

    SomePage.prototype.goTo = function ()
    {
        return browser.get('/');
    };


    return SomePage;
})();

module.exports = new SomePage();
