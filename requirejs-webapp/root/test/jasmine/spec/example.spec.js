/*global AsyncSpec*/
'use strict';

define(['module'], function (module) {

    describe('Basic Example', function() {
      it('should return string type', function() {
        expect('hello, world!').toEqual(jasmine.any(String));
      });
    });

    describe('AsyncSpec Example', function () {

      var async = new AsyncSpec(this);

      async.it('should wait until async response', function (done) {
        var delay = 1000,
          stamp = new Date().getTime(),
          timeout = setTimeout(function () {
            clearTimeout(timeout);
            expect((new Date().getTime() - stamp) + 10).toBeGreaterThan(delay);
            done();
          }, delay);
      });

    });

});