var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));

gulp.task('compile-scss', function () {
        return gulp.src('assets/scss/style.scss')
                .pipe(sass())
                .pipe(gulp.dest('gulp-test'))
});

gulp.task('watch', function () {
        gulp.watch('**/*.scss', gulp.series('compile-scss')); // all scss file
})

// TODO: generate html from php (watch all php)

