var gulp = require("gulp");
var browserify = require("gulp-browserify");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var livereload = require("gulp-livereload");

var paths = {
  scripts: ["src/js/**/*.js", "src/js/**/*.jsx"],
  sass: ["src/sass/**/*.scss"],
  static: ["src/index.html"]
};

gulp.task("browserify", function() {
	gulp.src("src/js/app.jsx")
		.pipe(browserify({
			transform: ["reactify"],
			extensions: [".jsx"]
		}))
		.pipe(rename("app.js"))
		.pipe(gulp.dest("www/js"))
		.pipe(livereload());
});

gulp.task("sass", function() {
	gulp.src("src/sass/**/*.scss")
		.pipe(sass({
			outputStyle: "compressed",
			souceComments: "map",
			includePaths: "./sass"
		}))
		.pipe(gulp.dest("www/css"))
		.pipe(livereload());
});

gulp.task("copy-static", function() {
	gulp.src("src/index.html")
		.pipe(gulp.dest("www"))
		.pipe(livereload());
});

gulp.task("watch", function() {
	livereload.listen();
	gulp.watch(paths.scripts, ["browserify"]);
	gulp.watch(paths.sass, ["sass"]);
	gulp.watch(paths.static, ["copy-static"]);
});

gulp.task("default", ["browserify", "sass", "copy-static"]);