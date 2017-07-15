//npm install
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var sass = require("gulp-sass");


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
		.pipe(gulp.dest('dist'))
});


    
