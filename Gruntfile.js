"use strict";

const harmonyFlags = ['--harmony_destructuring', '--harmony_default_parameters'];

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-babel');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
      test: {
        src: ['test/*.js']
      }
    },
    mocha_istanbul: {
      coverage: {
        src: 'test/*.js',
        options: {
          mochaOptions: harmonyFlags,
          istanbulOptions: harmonyFlags
        }
      }
    },
    babel: {
      dist: {
        options: {
          presets: ['es2015']
        },
        files: {
          'dist/lib/API.js': 'lib/API.js',
          'dist/lib/config.js': 'lib/config.js',
          'dist/lib/assistant.js': 'lib/assistant.js'
        }
      }
    }
  });
  grunt.registerTask('test', 'mochaTest');
  grunt.registerTask('coverage', 'mocha_istanbul');
};