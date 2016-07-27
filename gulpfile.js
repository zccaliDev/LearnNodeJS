var gulp = require("gulp");
var Path = require("path");
var gulpConcat = require("gulp-concat");
var gulpClean = require("gulp-dest-clean");
var bowerMain = require('bower-main');

var bowerRootPath = Path.join(__dirname, "bower_components/");
gulp.task("copy:fonts", function () {
    gulp.src(Path.join(bowerRootPath, "font-awesome/fonts/*.*"))
        .pipe(gulp.dest(Path.join(__dirname, "public/fonts/")))
});
gulp.task("copy:css", function() {
    var destPath = Path.join(__dirname, "public/css");

    gulp.src([
        Path.join(bowerRootPath, "bootstrap/dist/css/bootstrap.css"),
        Path.join(bowerRootPath, "font-awesome/css/font-awesome.css")
    ])  .pipe(gulpClean(destPath, "main.css"))
        .pipe(gulpConcat("main.css"))
        .pipe(gulp.dest(destPath))
});

gulp.task("copy:bower:scripts", function () {
    var bowerMainJavaScriptFilesObject = bowerMain('js','min.js');
    gulp.src(bowerMainJavaScriptFilesObject.normal)
        .pipe(gulp.dest(Path.join(__dirname, "public/scripts")))
});

gulp.task("copy:special:scripts", function () {
    gulp.src([
        "bower_components/systemjs-plugin-text/text.js"
    ])
        .pipe(gulp.dest(Path.join(__dirname, "public/scripts")))
});

gulp.task("development", ["copy:css", "copy:fonts", "copy:bower:scripts", "copy:special:scripts"]);