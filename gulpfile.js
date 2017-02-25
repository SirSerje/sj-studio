var gulp = require('gulp');
var sass = require('gulp-sass');

var input = './sass/**/*.scss';
var input1 = 'style.scss';
var output = './test';
var output1 = './';

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

gulp.task('sass1', function () {
    return gulp
        .src(input1)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(gulp.dest(output1));
});