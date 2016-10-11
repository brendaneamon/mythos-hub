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
        dest: 'build/js/<%= pkg.name %>.js'
      },
      vendor: {
        src: ['vendor/**/*.js'],
        dest: 'build/js/vendor.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        sourceMap: true,
        mangle : {
          except: ['angular', 'jQuery']
        }
      },
      app: {
        files: {
          'build/js/<%= pkg.name %>.min.js': ['<%= concat.app.dest %>'],
        }
      },
      vendor: {
        files: {
          'build/js/vendor.min.js': ['<%= concat.vendor.dest %>']
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
