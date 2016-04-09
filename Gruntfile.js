"use strict";

const harmonyFlags = ['--harmony_destructuring', '--harmony_default_parameters'];

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
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
    }
  });
  grunt.registerTask('test', 'mochaTest');
  grunt.registerTask('coverage', 'mocha_istanbul');
};