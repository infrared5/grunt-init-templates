define(['jquery', 'module', 'text!template/main.hb'], function($, module, mainPartial) {

  'use strict';

  var title = module.config().title,
      mainTemplate = Handlebars.compile(mainPartial);

  return {
    enter: function() {
      $('#main-container')
        .empty()
        .append(mainTemplate({title:title}));
      return title;
    }
  };

});