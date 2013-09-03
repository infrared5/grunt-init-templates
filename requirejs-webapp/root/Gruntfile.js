/*global config */
'use strict';
var connect = require('connect');

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

  var config = grunt.file.readJSON('{%= name %}.json');

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(function (name) {
      grunt.loadNpmTasks.call(null, name);
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: config,
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app: {
        src: ['<%= config.app %>/app/script/**/*.js']
      },
      jasmine: {
        src: ['test/jasmine/spec/**/*.js']
      },
      casperjs: {
        src: ['test/casper/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      }
    },
    connect: {
      options: {
        port: '<%= config.connect.port %>',
        hostname: '<%= config.connect.host %>'
      },
      app: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.')
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.')
            ];
          }
        }
      }
    },
    open: {
      app: {
        path: 'http://localhost:<%= connect.options.port %>/<%= config.app %>'
      },
      dist: {
        path: 'http://localhost:<%= connect.options.port %>/<%= config.dist %>'
      },
      test: {
        path: 'http://localhost:<%= connect.options.port %>/test/jasmine'
      }
    },
    jasmine: {
      // add other repository examples here...
      require: {
        src: './<%= config.app %>/script/**/*.js',
        options: {
          specs: './test/jasmine/spec/**/*.spec.js',
          helpers: 'test/jasmine/spec/*.helper.js',
          template: require('./test/jasmine/grunt/template-jasmine'),
          templateOptions: {
            requireConfig: {
              // set base url as .grunt/grunt-contrib-jasmine.
              baseUrl: '.',
              paths: {
                // define specs relative to baseUrl > up to out of .grunt/grunt-contrib-jasmine.
                'spec': '../../test/jasmine/spec',
                // define source relative to baseUrl. It can be thought of as relative to the app dir as well,
                // since they will be copied into the /.grunt directory where the template resides.
                'src': './<%= config.app %>/script',
                'template': './<%= config.app %>/template',
                'text': './<%= config.app %>/components/requirejs-text/text'
              }
            }
          }
        }
      }
    },
    casperjs: {
      options: {
        async: {
          parallel: false
        }
      },
      files: ['test/casper/**/*.js']
    },
    requirejs: {
      app: {
        options: {
          almond: true,
          baseUrl: '.',
          paths: {
            'src': './<%= config.app %>/script',
            'template': './<%= config.app %>/template',
            'text': './<%= config.app %>/components/requirejs-text/text',
            'jquery': 'empty:'
          },
          name: './<%= config.app %>/components/almond/almond',
          include: ['./<%= config.app %>/script/{%= name %}', 'src/{%= name %}-index'],
          generateSourceMaps: false,
          preserveLicenseComments: false,
          wrap: true,
          optimize: 'uglify2'
        }
      }
    },
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: [
              '<%= config.dist %>/*'
            ]
          }
        ]
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/script/{,*/}*.js',
            '<%= config.dist %>/style/{,*/}*.css'
          ]
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },
    usemin: {
      options: {
        dirs: ['<%= config.dist %>']
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/style/{,*/}*.css']
    },
    cssmin: {
      dist: {
        files: {
          '<%= config.dist %>/style/{%= name %}.css': [
            '<%= config.app %>/style/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
           //collapseWhitespace: true,
           collapseBooleanAttributes: true,
           removeAttributeQuotes: true,
           removeRedundantAttributes: true,
           useShortDoctype: true,
           removeEmptyAttributes: true,
           removeOptionalTags: true*/
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.app %>',
            src: '*.html',
            dest: '<%= config.dist %>'
          }
        ]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.app %>',
            dest: '<%= config.dist %>',
            src: [
              /** list static files to copy over into dist */
            ]
          }
        ]
      }
    }
  });

  grunt.registerTask('server', function (target) {
      if (target === 'dist') {
        return grunt.task.run(['build', 'open:dist', 'connect:dist:keepalive']);
      }
      else if(target === 'test') {
        return grunt.task.run(['open:test', 'connect:test:keepalive']);
      }

      grunt.task.run([
        'open:app',
        'connect:app:keepalive'
      ]);
  });

  grunt.registerTask('test', [
      'jshint',
      'connect:test',
      'jasmine:require'
  ]);

  grunt.registerTask('casper', function() {
    var baseUrl = require('path').resolve(config.app);
    grunt.log.write('server static: ' + baseUrl);
    connect(connect.static(baseUrl)).listen(config.connect.port);
    grunt.task.run(['jshint:casperjs', 'casperjs']);
  });

  grunt.registerTask('build', [
      'clean:dist',
      'useminPrepare',
      'requirejs:app',
      'htmlmin',
      'cssmin',
      'concat',
      'uglify',
      'copy:dist',
      'rev',
      'usemin'
  ]);

  grunt.registerTask('default', [
      'test',
      'build'
  ]);
};
