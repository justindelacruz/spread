"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                lineNumbers: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['*.scss'],
                    dest: '../css',
                    ext: '.css'
                }]
            }
        },

        react: {
            dynamic_mappings: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/jsx',
                        src: ['**/*.jsx'],
                        dest: 'src/js',
                        ext: '.js'
                    }
                ]
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            app: {
                src: [
                    'src/js/components/**/*.js',
                    'src/js/**/*.js'
                ],
                dest: 'build/app.js'
            }
        },

        uglify: {
            dist: {
                files: {
                    'build/app.min.js': [ 'build/app.js' ]
                },
                options: {
                    mangle: true
                }
            }
        },

        watch: {
            dev: {
                files: [ 'Gruntfile.js', 'src/**/*.jsx', 'sass/**/*.scss' ],
                tasks: [ 'react:dynamic_mappings', 'concat:app' ],
                options: {
                    atBegin: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-react');

    grunt.registerTask('dev', [ 'watch:dev' ]);
    grunt.registerTask('minified', [ 'watch:minified' ]);
};
