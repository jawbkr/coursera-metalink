var pkg = require('./package.json')
var streamqueue = require('streamqueue')
var gulp = require('gulp')
var mocha = require('gulp-mocha')
var template = require('gulp-template')
var concat = require('gulp-concat')
var clean = require('gulp-clean')
var shell = require('gulp-shell')

var tsc = require('gulp-typescript-compiler')
var uglify = require('gulp-uglify')

var less = require('gulp-less')
var wrap = require('gulp-wrap')

var handlebars = require('gulp-handlebars')
var defineModule = require('gulp-define-module')
var declare = require('gulp-declare')

gulp.task('build', function () {
    var jsStream = streamqueue({objectMode: true})
    var allStream = streamqueue({objectMode: true})

    jsStream.queue(
        gulp.src('src/main/resources/*.html')
            .pipe(handlebars())
            .pipe(defineModule('plain'))
            .pipe(declare({namespace: "templates"}))
    )
    jsStream.queue(
        gulp.src('src/main/resources/*.less')
            .pipe(less({cleancss: true}))
            .pipe(wrap('var style = \'<%= contents %>\';'))
    )
    jsStream.queue(
        gulp.src('src/main/typescript/main.ts')
            .pipe(tsc({
                target: 'ES5',
                resolve: true,
                sourcemap: false
            }))
            .pipe(uglify({
                mangle: false,
                compress: false,
                output: {
                    beautify: true
                }
            }))
    )

    allStream.queue(
        gulp.src('src/main/resources/greasemonkey.txt')
            .pipe(template({
                description: pkg.description,
                version: pkg.version,
                homepage: pkg.homepage,
                license: pkg.license
            }))
    )
    allStream.queue(
        jsStream.done()
            .pipe(concat('to_userscript'))
            .pipe(wrap(';(function() {\n<%= contents %>})();'))
    )

    return allStream.done()
        .pipe(concat(pkg.name + '.user.js'))
        .pipe(gulp.dest('build'))
})

gulp.task('test', function () {
    var stream = streamqueue({objectMode: true})
    var testFiles = [
        'src/main/typescript/entity/*.ts',
        'src/main/typescript/coursera/**/*.ts',
        'src/main/typescript/metalink/*.ts'
    ]

    stream.queue(
        gulp.src(testFiles)
            .pipe(concat('to_ts'))
            .pipe(tsc({
                target: 'ES5',
                sourcemap: false
            }))
    )
    stream.queue(
        gulp.src('src/test/javascript/**/*.js')
    )

    return stream.done()
        .pipe(concat('test.js'))
        .pipe(gulp.dest('tmp'))
        .pipe(mocha())
})

gulp.task('clean', function () {
    return gulp.src(['build', 'tmp'], {read: false})
        .pipe(clean())
})

gulp.task('find-location', shell.task([
    "find ~/.mozilla/ -type d -path '*/gm_scripts/Coursera_Metalink_Generator'"
]))
