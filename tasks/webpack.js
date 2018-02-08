/**
 * Webpack
 * -----------------------------------------------------------------------------
 */
import gulp 						from 'gulp';
import webpack 					from 'gulp-webpack';
import folders					from './folders';
import {server, reload, serve} from './browserSync';

gulp.task('webpack', () => {
	gulp.src(`${folders.src}/js/bundle/bundle.js`)
		.pipe(webpack())
		.pipe(gulp.dest(`${folders.build}/js`))
});

// Task `scripts:watch`
// gulp.task('webpack:watch', () =>
// 	gulp.watch(`${folders.src}/js/bundle/**/*.js`, gulp.series('webpack', reload))
// );