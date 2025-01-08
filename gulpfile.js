const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

function convertSass(){
    return gulp.src('./source/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/styles/'));
   
}

function compressedImg() {
    return gulp.src('./source/img/*')
        .pipe(imagemin([
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: false },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('./build/images/'));
}

function compressedJS(){
    return gulp.src('./source/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'))
}


exports.convertSass = convertSass;
exports.imagemin = compressedImg;
exports.jsTask = compressedJS;