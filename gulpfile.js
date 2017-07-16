//npm install
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var sass = require("gulp-sass");
var cleanCSS = require('gulp-clean-css');
var imageop = require('gulp-image-optimization');  //not working properly


gulp.task("sass", function (){
    return gulp.src("scss/index.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
        errLogToConsole:true,
        outputStyle: "expanded",
        sourceComments: "map"
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("css"))
});

gulp.task("watch", function(){
    gulp.watch(['scss/**/*.scss' ], ['sass']); 
});


gulp.task('prefix', function (){
	return gulp.src('css/index.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'Firefox >= 20'],
			cascade: false,
            grid: true
        
		}))
		.pipe(gulp.dest('css'))
});

gulp.task('minify-css', function () {
  return gulp.src('css/index.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('css-minified'));
});


gulp.task('images', function(cb) {
    gulp.src(['images/**/*.png','images/**/*.jpg','images/**/*.gif','images/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('public/images')).on('end', cb).on('error', cb);
});


    
