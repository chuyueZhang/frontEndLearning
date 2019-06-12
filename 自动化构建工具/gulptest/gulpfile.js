const {src, dest, series, parallel, watch} = require('gulp')
const $ = require('gulp-load-plugins')()
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const cleanCss = require('gulp-clean-css')
const htmlmin = require('gulp-htmlmin')
const livereload = require('gulp-livereload')
const connect = require('gulp-connect')
const less = require('gulp-less')
const open = require('open') 

function js(){
    return src('src/js/*.js')
           .pipe($.concat('build.js'))
           .pipe(dest('dist/js/'))
           .pipe($.uglify())
           .pipe($.rename({suffix: '.min'}))
           .pipe(dest('dist/js/'))
           .pipe($.livereload())
           .pipe($.connect.reload())
}

function css(){
    return src('src/css/*.css')
           .pipe($.concat('build.css'))
           .pipe($.cleanCss({compatibility: 'ie8'}))
           .pipe($.rename({suffix: '.min'}))
           .pipe(dest('dist/css/'))
           .pipe($.livereload())
           .pipe($.connect.reload())
}
function lessfunc(){
    return src('src/less/*.less')
           .pipe($.less())
           .pipe(dest('src/css/'))
           .pipe($.livereload())
           .pipe($.connect.reload())
}
function html(){
    return src('index.html')
           .pipe($.htmlmin({collapseWhitespace: true}))
           .pipe(dest('dist/'))
           .pipe($.livereload())
           .pipe($.connect.reload())
}
function live(){
    $.livereload.listen()
    watch(['src/js/*.js'], js)
    watch(['src/css/*.css'], css)
    watch(['src/less/*.less'], series(lessfunc, css))
    watch(['index.html'], html)
}
function connection(){
    $.connect.server({
        root: 'dist/',
        port: 5000,
        livereload: true
    })
    watch(['src/js/*.js'], js)
    watch(['src/css/*.css'], css)
    watch(['src/less/*.less'], series(lessfunc, css))
    watch(['index.html'], html)
    open('http://localhost:5000/index.html')
}
exports.js = js
exports.css = css
exports.less = lessfunc
exports.html = html
exports.allcss = series(lessfunc, css)
exports.all = parallel(js, html, series(lessfunc, css))
exports.live = series(parallel(js, html, series(lessfunc, css)), live)
exports.connect = series(parallel(js, html, series(lessfunc, css)), connection)