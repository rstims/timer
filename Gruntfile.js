const path = require('path');

module.exports = function (grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        // setting folder templates
        dirs: {
            js: './assets/js',
            css: './assets/css',
            sass: './assets/sass'
        },
        watch: {
            sass: {
                files: [
                    '<%= dirs.sass %>/*.scss',
                    '<%= dirs.sass %>/_partials/*.scss'
                ],
                tasks: ['sass:dev']
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                },
                files: {
                    '<%= dirs.css %>/style.css': ['<%= dirs.sass %>/style.scss']
                }
            },
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap:'none'
                },
                files: {
                    '<%= dirs.css %>/style.min.css': ['<%= dirs.sass %>/style.scss']
                }
            }
        },
        //Babel for ES6 suppport
        babel: {
            options: {
                presets: ['es2015']
            },
            dist: {
                files: {
                    '<%= dirs.js %>/frontend.js': '<%= dirs.js %>/src/index.js'
                }
            }
        },
        // Minify .js files.
        uglify: {
            jsfiles: {
                files: [{
                        expand: true,
                        cwd: '<%= dirs.js %>/',
                        src: [
                            '*.js',
                            '!*.min.js',
                            '!Gruntfile.js',
                        ],
                        dest: '<%= dirs.js %>/',
                        ext: '.min.js'
                    }]
            }
        },
        
        //Modualar js
        webpack: {
            dist: {
                // webpack options
                entry: "<%= dirs.js %>/src/index.js",
                output: {
                    path: "<%= dirs.js %>",
                    filename: "timer.js",
                    library: 'timer',
                    libraryTarget: 'umd'
                },
                progress: true, // Don't show progress
                // Defaults to true

                failOnError: true, // don't report error to grunt if webpack find errors
                resolve: {
                    root: [path.resolve("<%= dirs.js %>/src")]
                },
                module: {
                    loaders: [
                        {
                            test: /\.js$/,
                            exclude: /node_modules/,
                            loader: 'babel'
                        },
                    ],
                },
            }
        }

    });

    // Register tasks
    grunt.registerTask('dev', ['webpack']);
    grunt.registerTask('buildjs', ['webpack', 'uglify']);
    grunt.registerTask('css', ['sass:dist']);
    
    

};