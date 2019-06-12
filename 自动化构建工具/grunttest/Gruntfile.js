module.exports = function(grunt){
    grunt.initConfig({
        concat:{    //给指定插件进行配置，通常这里的插件名就是官网中插件名的后缀
            options: {   //可选项
                seperator: ';'  //指定使用分号来分隔不同js文件
            },
            dist:{  //此名称任意
                files: {
                    'src/js/build.js': ['src/js/test1.js', 'src/js/test2.js'],    //指定输出的js文件,指定需要合并的js文件
                }
            }
        },
        pkg: grunt.file.readJSON('package.json'),       //读取json文件方便插件中调用json文件中的属性
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
              '<%= grunt.template.today("yyyy-mm-dd") %> */'
          },
          my_target: {          //名称任意
            files: {
              'dist/js/build.min.js': ['src/js/build.js']
            }
          }
        },
        jshint:{
            options: {
              "curly": true,
              "eqnull": true,
              "eqeqeq": true,
              "undef": true,
              "asi": true,
              "predef": true,
              "esversion": 5,
              "globals": {          //设置需要忽略的全局变量
                "jQuery": true,
                "module": true,
                'environment': true
              }
            },
            build: {
                files: {
                src: ['Gruntfile.js', 'src/js/*.js']
                }
            }
        },
        cssmin:{
            options: {
            mergeIntoShorthands: false,
            roundingPrecision: -1
          },
          build: {      //任意名称
            files: {
              'dist/css/output.min.css': ['src/css/test1.css', 'src/css/test2.css']
            }
          }
        },
        watch: {
            scripts: { 
              files: ['src/js/*.js', 'src/css/*.css'],
              tasks: ['jshint', 'concat', 'uglify', 'cssmin'],
              options: {
                spawn: false,       //false：变量更新，只执行与修改了的文件相关的任务 true：全量更新，即无论修改哪个文件都会执行所有的任务
              },
            },
          }
    })
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.registerTask('default', ['concat','uglify','cssmin','jshint'])
    grunt.registerTask('mywatch', ['default', 'watch'])
}