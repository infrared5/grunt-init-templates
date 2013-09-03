
'use strict';

// Nodejs libs.
var path = require('path');

// Basic template description.
exports.description = 'Scaffold a common webapp development environment used by Infrared5.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

exports.after = 'You should now install project development dependencies with _npm ' +
  'install_ and client libraries with _bower install_.' + 
  ' After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = "*";

// The actual init template.
exports.template = function(grunt, init, done) {

  grunt.util._.extend(init.prompts, {
    "description": {
      message: "Description of the application.",
      default: "A human-readable description of the app.",
      validator: /^.{1,1024}$/,
      warning: "Maximum length is 1024 characters."
    }
  });

  init.process({}, [
    // Prompt for these values.
    init.prompt("name"),
    init.prompt("description"),
    init.prompt("version", "0.1.0"),
    init.prompt("repository"),
    init.prompt("homepage"),
    init.prompt("author_name"),
    init.prompt("author_url"),
    init.prompt("licenses", "MIT")
  ],
  function(err, props) {

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON("package.json", {
      name: props.name,
      version: props.version,
      node_version: '>= 0.10.0',
      devDependencies: {
        "grunt": "~0.4.1",
        "grunt-rev": "~0.1.0",
        "grunt-open": "~0.2.0",
        "grunt-contrib-jshint": "~0.4.3",
        "grunt-contrib-watch": "~0.4.0",
        "grunt-contrib-connect": "~0.2.0",
        "grunt-contrib-copy": "~0.4.1",
        "grunt-contrib-cssmin": "~0.6.0",
        "grunt-contrib-htmlmin": "~0.1.3",
        "grunt-contrib-clean": "~0.4.0",
        "grunt-contrib-concat": "~0.3.0",
        "grunt-contrib-uglify": "~0.2.0",
        "grunt-contrib-requirejs": "~0.4.0",
        "grunt-contrib-jasmine": "~0.4.2",
        "grunt-casperjs": "~1.0.9",
        "matchdep": "~0.1.2",
        "connect": "~2.8.7",
        "grunt-usemin": "git://github.com/bustardcelly/grunt-usemin"
      }
    });

    // All done!
    done();
  });

};