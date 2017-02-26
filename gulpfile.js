var gulp = require('gulp');
var sass = require('gulp-sass');

var input = './sass/**/*.scss';
var output = './test';

var input1 = './css/main/style.scss';
var output1 = './css/main/';

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