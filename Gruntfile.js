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
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask("default", ["babel", "watch"]);
  grunt.registerTask("lint", "eslint");
};