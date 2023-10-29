const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');

const configs = {
    autoprefixer: {
        overrideBrowserslist: [
            'last 2 versions',
            '> 1%',
            'Chrome >= 30',
            'Firefox >= 30',
            'ie >= 9',
            'Safari >= 8',
        ],
    },
    cleanCSS: {
        compatibility: 'ie9'
    },
};

// gulp.task('minify-js', () => {
//     return gulp.src('src/**/*.js')
//         .pipe(uglify({
//             output: {
//                 comments: /^!/
//             }
//         }))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest('js'));
// });

gulp.task('minify-css', () => {
    return gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(configs.autoprefixer))
        .pipe(gulp.dest('css'))
        .pipe(cleanCSS(configs.cleanCSS))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'));
});

// gulp.task('build', gulp.parallel('minify-js', 'minify-css'));
gulp.task('build', gulp.parallel('minify-css'));

gulp.task('default', gulp.parallel('build'));

gulp.task('watch', () => {
    gulp.watch('scss/**/*.scss', gulp.parallel('minify-css'));
});

