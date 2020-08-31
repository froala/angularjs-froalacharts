module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    makeDemos: {
      demos: {
        options: {
          mainTemplate: 'index.ejs',
          out: 'demos'
        }
      },
      gh_pages: {
        options: {
          mainTemplate: 'index.ghpages.ejs',
          out: './'
        }
      }
    },
    uglify: {
      src: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %>*/\n\n'
        },
        files: {
          'dist/angular-froalacharts.min.js': ['src/angular-froalacharts.js']
        }
      }
    },
    copy: {
      core: {
        files: [
          {
            src: 'dist/angular-froalacharts.min.js',
            dest: 'demos/js/angular-froalacharts.min.js'
          },
          {
            src: 'src/angular-froalacharts.js',
            dest: 'dist/angular-froalacharts.js'
          }
        ]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      taskName: {
        files: ['src/*.js', 'example/*.*'],
        tasks: ['default']
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: './',
          livereload: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadTasks('./grunt-tasks');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.registerTask('default', ['makeDemos:demos', 'uglify', 'copy']); // For gh-pages branch only
  grunt.registerTask('default', ['uglify', 'copy']); // For other branches
  grunt.registerTask('watch-server', ['connect', 'watch']);
};
