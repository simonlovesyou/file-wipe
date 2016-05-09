module.exports = function(grunt) {
  grunt.initConfig({
    "babel": {
      options: {
        sourceMap: false
      },
      dist: {
        files: [
        {
          "expand": true,
          "cwd": "modules/",
          "src": ["**/*.js"],
          "dest": "dist",
          "ext": ".js"
        }]
      }
    },
    eslint: {
      target: ["./modules/**/*.js"]
    },
    watch: {
      babel: {
        files: ['./**/*.js'],
        tasks: ['babel'],
        options: {
          spawn: false,
        }
      }
    },
    ava: {
      target: ['test/*.spec.js']
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-ava');

  grunt.registerTask("default", ["test", "watch"]);
  grunt.registerTask("test", ["lint", "babel", "ava"]);
  grunt.registerTask("lint", "eslint");
  grunt.registerTask("deploy", "babel");
};