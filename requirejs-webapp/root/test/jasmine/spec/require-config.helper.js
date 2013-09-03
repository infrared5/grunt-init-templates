'use strict';

define('jquery', [], function() {
  return $;
});

define(['jquery'], function() {

  requirejs.config({
    config: {
      /** add any additional configuration required for proper testing. */
    }
  });

});