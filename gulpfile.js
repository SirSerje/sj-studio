//----------------requires----------------
var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var rename = require('gulp-rename');
//---------------end requires--------------

var input = './sass/**/*.scss';
var output = './test';
var input1 = './css/main/style.scss';
var output1 = './css/main/';

var jadeInput = "*.jade";
var jadeOutput = "./";

var spaceportDestination = '/sj-photostudio.com/spaceport';
var prodDestination = '/sj-photostudio.com/';
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

gulp.task('jade-test', function () {
    var YOUR_LOCALS = {};

    gulp.src(jadeInput)
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest(jadeOutput))
});

gulp.task('spaceport-deploy', function () {
//TODO WARINNG!!! do not commit with real login / password
    var conn = ftp.create({
        host: 'sjphotos.ftp.ukraine.com.ua',              //insert host
        user: 'sjphotos_serje',              //insert user
        password: '3z20jar3',             //insert pass
        parallel: 10,
        log: gutil.log
    });

    var globs = [
        'index.html',
        'js/**',
        'include/**',
        'images/**',
        'css/**'
    ];


    return gulp.src(globs, {base: '.', buffer: false})
    //.pipe( conn.newer( '/public_html' ) ) // only upload newer files
        .pipe(conn.dest(spaceportDestination));
});


gulp.task('prod-deploy', function () {
    var conn = ftp.create({
        host: 'sjphotos.ftp.ukraine.com.ua',
        user: 'sjphotos_gulptask',
        password: 'z6h9g79th272si0d',
        parallel: 10,
        log: gutil.log
    });

    var globs = [
        'www/**/*',
    ];

    return gulp.src(globs, {base: '.', buffer: false})
        .pipe(conn.dest(prodDestination));
});


gulp.task('copydest', [], function () {

    gulp.copy = function (src, dest) {
        return gulp.src(src, {base: "."})
            .pipe(gulp.dest(dest));
    };

    var sourceFiles = [
        'css/**/*',
        'images/**/*',
        'include/**/*',
        'js/**/*',
        'one-page/**/*',
        'sass/**/*',
        'sendmail_example/**/*',
        '.htaccess',
        '404.html',
        'index.html',
        'robots.txt',
        'sitemap.html',
        'sitemap.xml',
        'style-import.css',
        'style-rtl.css'
    ];
    var destination = [
        'www/',
        'www/',
        'www/',
        'www/',
        'www/',
        'www/',
        'www/',
        'www/',
        'www/',
        'www/',
        'www/',
        'www/',
        'www/',
        'www/',
        'www/'
    ];
    for (var i = 0; i < destination.length; i++) {
        gulp.copy(sourceFiles[i], destination[i])
    }

});

var htmlmin = require('gulp-htmlmin');
gulp.task('html-min', [], function () {

    return gulp.src(['index.html', '404.html']).pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
    })).pipe(gulp.dest('www/'));
});


gulp.task('css-min', [], function () {
    return gulp.src('css/**/*.css').pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
    })).pipe(gulp.dest('www/css'));
});


gulp.task('js-min', [], function () {
    var gulp = require('gulp'),
        uglify = require('gulp-uglify');


    gulp.src('js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('www/js'));
});

gulp.task('minify-img', [], function () {
    const imagemin = require('imagemin');
    const imageminJpegtran = require('imagemin-jpegtran');
    const imageminPngquant = require('imagemin-pngquant');

    imagemin(['images/**/*.{jpg,png}'], 'www/images', {
        plugins: [
            imageminJpegtran(),
            imageminPngquant({quality: '65-80'})
        ]
    })
})


gulp.task('makeAllPerfect', ['copydest', 'html-min', 'css-min', 'js-min', 'minify-img']);