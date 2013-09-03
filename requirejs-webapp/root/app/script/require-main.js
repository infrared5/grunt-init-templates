/*global requirejs, console*/
'use strict';

// off-loaded to HTML script tags to shave off runtime load size of main.js
define('jquery', [], function () {
  return $;
});

require.config({
  baseUrl: '.',
  paths: {
    src: './script',
    template: './template',
    text: './components/requirejs-text/text'
  },
  config: {
    'src/{%= name %}-index': {
      title: 'Hello, World!'
    }
  }
});

require(['jquery', 'src/{%= name %}-index'], function ($, page) {
  console.log('running jQuery ' + $().jquery);
  console.log(page.enter());
});