"use strict";
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var webpack = require('webpack');
var gutil = require('gulp-util');
var path = require("path")
var jshint = require('gulp-jshint')
var config = require('./webpack.config.js');
var exec = require('child_process').exec;
var fs = require("fs")

var paths = {
	watch: ["./src/*,", "./src/**/*", "./demo/*", "./nv-services/*", "./node_modules/e1js-components/dist/*"],
	jshint: ["src/*.js,", "src/**/*.js", "./nv-services/*"]
}


gulp.task('jshint', function () {
	return gulp.src(paths.jshint)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});


gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: "./docs/"
		},
		https: true
	});
});

gulp.task('publish', function (done) {
	exec('rm -R dist', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);

		exec('mkdir dist', function (err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);

			// run webpack
			webpack(prodConfig, function (err, stats) {
				if (err) throw new gutil.PluginError('webpack:build', err);
				gutil.log('[webpack:build]', stats.toString({
					colors: true
				}));

				exec('cp node_modules/e1js-components/dist/image-renderer-lib.js docs/image-renderer-lib.js', function (err, stdout, stderr) {
					console.log(stdout);
					console.log(stderr);
				})

				exec('cp demo/index.html docs/index.html', function (err, stdout, stderr) {
					console.log(stdout);
					console.log(stderr);
				})

				exec('cp dist/nvidia_uploader.js docs/nvidia_uploader.js', function (err, stdout, stderr) {
					console.log(stdout);
					console.log(stderr);
				})

				exec('cp dist/nvidia_uploader.css docs/nvidia_uploader.css', function (err, stdout, stderr) {
					console.log(stdout);
					console.log(stderr);
				})

				exec('cp lib/exif.js dist/exif.js', function (err, stdout, stderr) {
					console.log(stdout);
					console.log(stderr);
				})

				exec('cp lib/png.js dist/png.js', function (err, stdout, stderr) {
					console.log(stdout);
					console.log(stderr);
				})
			});
		});
	});
});

gulp.task("dev", ["server", "jshint", "publish"], function () {
	gulp.watch(paths.watch, ["jshint", "publish"]);
});

gulp.task("default", [
	"dev"
], function () { });