module.exports = function(grunt) {
  grunt.initConfig({
    "babel": {
      options: {
        sourceMap: true
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
    watch: {
      babel: {
        files: ['./**/*.js'],
        tasks: ['babel'],
        options: {
          spawn: false,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.registerTask("default", ["babel", "watch"]);
};