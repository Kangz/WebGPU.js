/* global module */

module.exports = function(grunt) {
  "use strict";

  grunt.loadNpmTasks('grunt-rollup');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['build'],
        options: {
          interrupt: true,
        }
      }
    },

    eslint: {
      webgpu: ['src/**/*.js', 'tests/**/*.js']
    },

    rollup: {
      options: {
        moduleName: 'webgpu',
        format: 'umd',
      },

      webgpu: {
        files: {
          'out/webgpu.js' : ['src/WebGPU.js']
        },
        options: {
          sourceMap: 'inline'
        }
      },
    },

    uglify: {
      options: {
        mangle: {
          safari10: true,
        }
      },
      webgpu: {
        files: {
          'out/webgpu.min.js': ['out/webgpu.js']
        }
      }
    }
  });

  grunt.registerTask('package', ['uglify']);
  grunt.registerTask('build', ['rollup:webgpu']);
  grunt.registerTask('lint', ['eslint']);

  grunt.registerTask('release', ['lint', 'build', 'package']);
  grunt.registerTask('export', ['release']);

  grunt.registerTask('default', ['lint', 'build']);
};
