module.exports = function(grunt) {
	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
		   concat: {

		    basic: {
		      src: ['app/scripts/**/*.js'],
		      dest: 'app/dist/vendor.js',
		    },

		    extras: {
		      src: ['app/ext-modules/**/*.js'],
		      dest: 'app/dist/script.js',
		    }

		  },
		  htmlmin: {
		   dist: {
		      options: {
		         removeComments: true,
		         collapseWhitespace: true
		      },
		      files: [{
		         cwd: 'app',
		         src: '**/*.html',
		         dest: 'dist/index.html'
		      }]
		   }
		},
	watch: {
    options: {
      livereload: true,
    },
    css: {
      files: ['css/**/*.css'],
    },
    js: {
      files: ['js/**/*.js'],
    },
    html: {
      files: ['*.html'],
    }
  },
  connect: {
    server: {
      options: {
        port: 9000,
        base: 'app/',
        hostname: '0.0.0.0',
        protocol: 'http',
        livereload: true,
        open: true,
      }
    }
  },
  });
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.registerTask('serve', ['connect','watch']);
};