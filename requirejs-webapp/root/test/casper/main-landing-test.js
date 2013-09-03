/*global casper*/
casper.test.begin('Landing Page Welcome Text', 1, function suite(test) {

  'use strict';

  var mainLandingSelector = '#main-landing';

  casper.start('http://localhost:9000')
    .waitForSelector(mainLandingSelector, function() {
      test.assertSelectorHasText(mainLandingSelector + ' h1', 'Hello, World!');
    })
    .run(function() {
      test.done();
    });

});