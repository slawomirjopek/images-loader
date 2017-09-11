var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var minifyJs = require('gulp-minify');
var minyfyCSS = require('gulp-cssnano');

gulp.task('clean', function() {
    del('dist/');
});

gulp.task('styles', function() {
    gulp.src('src/loader.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/'))
        .pipe(minyfyCSS())
        .pipe(gulp.dest('dist/min/'))
});

gulp.task('scripts', function() {
    return gulp.src('src/loader.js')
        .pipe(gulp.dest('dist/'))
        .pipe(minifyJs({
            noSource: true
        }))
        .pipe(gulp.dest('dist/min/'))
});

gulp.task('watch', function() {
    gulp.watch('src/loader.scss', ['styles']);
    gulp.watch('src/loader.js', ['scripts'])
});