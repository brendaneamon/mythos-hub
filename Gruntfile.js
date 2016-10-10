module.exports = function (grunt) {
  
  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['build/*'],
    concat: {
      options: {
        separator: '\n'
      },
      app: {
        src: ['public/**/*.js'],
        dest: 'build/<%= pkg.name %>.js'
      },
      vendor: {
        src: ['vendor/**/*.js'],
        dest: 'build/vendor.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        sourceMap: true,
        sourceMapIncludeSources: true
      },
      app: {
        files: {
          'build/<%= pkg.name %>.min.js': ['<%= concat.app.dest %>'],
        }
      },
      vendor: {
        files: {
          'build/vendor.min.js': ['<%= concat.vendor.dest %>']
        }
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      files: ['index.js', 'Grunfile.js', 'public/**/*.js']
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });
  
  grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify']);
};
