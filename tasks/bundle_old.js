/**
 * JS
 * -----------------------------------------------------------------------------
 */


import gulp 						from 'gulp';
import folders					from './folders';
import babel 						from 'gulp-babel';
import browserify 			from 'browserify';
import source 					from 'vinyl-source-stream';
import babelify 				from "babelify";
import notify 					from 'gulp-notify';
import {reload} from './browserSync';


// Task `bundle`
gulp.task('bundle', () =>{
	browserify({
		entries: `${folders.src}/js/bundle/bundle.js`,
		debug: true
	})
	.on('error', notify.onError({
			title: 'Browserify Error',
			message: '<%= error.message %>'
	}))
	.transform(babelify)
	.on('error', notify.onError({
		title: 'Babelify Error',
		message: '<%= error.message %>'
	}))
	.bundle()
	.on('error', notify.onError({
			title: 'Bundle Error',
			message: '<%= error.message %>'
	}))
	.pipe(source('bundle.js'))
	.pipe(gulp.dest(`${folders.build}/js`))
});


// Task `bundle:watch`
gulp.task('bundle:watch', () =>
	gulp.watch(`${folders.src}/js/bundle/**/*.js`, gulp.series('bundle', reload))
);


// Task `bundle-modules`
// gulp.task('bundle-modules', () =>
// 	gulp.src(`${folders.src}/js/bundle/modules/**/*.js`)
// 		.pipe(babel())
// 		.pipe(gulp.dest(`${folders.build}/js/modules`))
// );


// // Task `bundle-modules:watch`
// gulp.task('bundle-modules:watch', () =>
// 	gulp.watch(`${folders.src}/js/bundle/modules/**/*.js`, gulp.series('bundle', reload))
// );