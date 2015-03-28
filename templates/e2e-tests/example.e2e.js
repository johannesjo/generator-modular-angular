describe('test', function ()
{
    var somePage = require('./po/some-page.po.js');

    var test = {
        ifSomething: function (something)
        {
            expect(true).toBeTruthy(something);
        }
    };


    describe('test', function ()
    {
        it('is a test', function ()
        {
            somePage.goTo();
            test.ifSomething(true);
        });
    });
});
