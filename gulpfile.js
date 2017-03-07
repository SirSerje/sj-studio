//----------------requires----------------
var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
//---------------end requires--------------

var input = './sass/**/*.scss';
var output = './test';
var input1 = './css/main/style.scss';
var output1 = './css/main/';

var jadeInput = "*.jade";
var jadeOutput = "./jadeTest/";

var spaceportDestination = '/sj-photostudio.com/spaceport';
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded' /* compressed expanded */
};

gulp.task('sass', function () {
    return gulp
        .src(input)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(gulp.dest(output));
});

gulp.task('sass-main', function () {
    return gulp
        .src(input1)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(gulp.dest(output1));
});

gulp.task('jade-test', function() {
    var YOUR_LOCALS = {};

    gulp.src(jadeInput)
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest(jadeOutput))
});

gulp.task('spaceport-deploy', function () {
//TODO WARINNG!!! do not commit with real login / password
    var conn = ftp.create( {
        host:     'XXXX',              //insert host
        user:     'XXXX',              //insert user
        password: 'XXXX',             //insert pass
        parallel: 10,
        log:      gutil.log
    } );

    var globs = [
        'index-main.html',
        'js/**',
        'include/**',
        'images/**',
        'css/**'
    ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src( globs, { base: '.', buffer: false } )
        //.pipe( conn.newer( '/public_html' ) ) // only upload newer files
        .pipe(conn.dest(spaceportDestination));
} );
