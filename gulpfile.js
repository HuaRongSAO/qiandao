var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task('copy',  function() {
  return gulp.src('./app/**/*')
    .pipe(gulp.dest('./dist'))
});

gulp.task("dist",['copy'], function () {
  return gulp.src(["./app/**/*.js",'!./app/public/**/*.js'])// ES6 源码存放的路径
    .pipe(babel())
    .pipe(gulp.dest("./dist")); //转换成 ES5 存放的路径
});

