## Gruntfile.coffee

<pre><code data-trim data-noescape>
# Generated on 2016-08-18 using generator-reveal 0.5.9
module.exports = (grunt) ->

    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'

        watch:

            livereload:
                options:
                    livereload: true
                files: [
                    'index.html'
                    'slides/{,*/}*.{md,html}'
                    'js/*.js'
                    'resources/**'
                ]

            index:
                files: [
                    'templates/_index.html'
                    'templates/_section.html'
                    'slides/list.json'
                ]
                tasks: ['buildIndex']

            coffeelint:
                files: ['Gruntfile.coffee']
                tasks: ['coffeelint']

            jshint:
                files: ['js/*.js']
                tasks: ['jshint']

        connect:

            livereload:
                options:
                    port: 9000
                    # Change hostname to '0.0.0.0' to access
                    # the server from outside.
                    hostname: 'localhost'
                    base: '.'
                    open: true
                    livereload: true

        coffeelint:

            options:
                indentation:
                    value: 4
                max_line_length:
                    level: 'ignore'

            all: ['Gruntfile.coffee']

        jshint:

            options:
                jshintrc: '.jshintrc'

            all: ['js/*.js']

        copy:

            dist:
                files: [{
                    expand: true
                    src: [
                        'slides/**'
                        'bower_components/**'
                        'js/**'
                        'resources/**'
                    ]
                    dest: 'dist/'
                },{
                    expand: true
                    src: ['index.html']
                    dest: 'dist/'
                    filter: 'isFile'
                }]




    # Load all grunt tasks.
    require('load-grunt-tasks')(grunt)

    grunt.registerTask 'buildIndex',
        'Build index.html from templates/_index.html and slides/list.json.',
        ->
            indexTemplate = grunt.file.read 'templates/_index.html'
            sectionTemplate = grunt.file.read 'templates/_section.html'
            slides = grunt.file.readJSON 'slides/list.json'

            html = grunt.template.process indexTemplate, data:
                slides:
                    slides
                section: (slide) ->
                    grunt.template.process sectionTemplate, data:
                        slide:
                            slide
            grunt.file.write 'index.html', html

    grunt.registerTask 'test',
        '*Lint* javascript and coffee files.', [
            'coffeelint'
            'jshint'
        ]

    grunt.registerTask 'serve',
        'Run presentation locally and start watch process (living document).', [
            'buildIndex'
            'connect:livereload'
            'watch'
        ]

    grunt.registerTask 'dist',
        'Save presentation files to *dist* directory.', [
            'test'
            'buildIndex'
            'copy'
        ]

    # Define default task.
    grunt.registerTask 'default', [
        'test'
        'serve'
    ]
</code></pre>

<p class="fragment current-only" data-code-focus="7">
    Watch will monitore the code on changes and reload the page
</p>
<p class="fragment current-only" data-code-focus="35">
    Connect will manage the server connection
</p>
<p class="fragment current-only" data-code-focus="47,57">
    Check your code for errors
</p>
<p class="fragment current-only" data-code-focus="64">
    Copy files for build
</p>
<p class="fragment current-only" data-code-focus="89-103">
    Creates the index file containing all slides
</p>
<p class="fragment current-only" data-code-focus="105-109">
    Tests your code
</p>
<p class="fragment current-only" data-code-focus="111-115">
    Creates the server and sets up the watch task
</p>
<p class="fragment current-only" data-code-focus="118-123">
    Combines all files for deployment
</p>
<p class="fragment current-only" data-code-focus="125-130">
    Default action: test and serve
</p>
<p class="fragment current-only" >
    Each command can be run with ```grunt <command>```
</p>

