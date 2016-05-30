module.exports = function(grunt) {
  grunt.initConfig({
    "babel": {
      options: {
        sourceMap: false,
        presets: ['es2015']
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
        files: ['./modules/*.js'],
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
  grunt.registerTask("dev", ["babel", "watch"]);
  grunt.registerTask("deploy", "babel");
};