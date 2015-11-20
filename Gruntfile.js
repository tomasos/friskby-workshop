module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      browserify: {
	  main: {
              files: {
		  'build/friskby.js': ['app/friskby.js']
              },
              options: {
		  debug: true
              }
	  }
      },
      watch: {
	  scripts: {
	      files: ['app/*/**.js'],
	      tasks: ['browserify'],
	      options: {
		  livereload: true
	      }
	  },
	  html: {
	      files: ['*.html'],
	      options: {
		  livereload: true
	      }
	  }
      },
      connect: {
	  server: {
	      options: {
		  port: 8000,
		  livereload: true
	      }
	  }
      }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  // Default task(s).
    grunt.registerTask('default', ['browserify', 'connect', 'watch']);

};
