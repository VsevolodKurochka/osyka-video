/**
 * Concat
 * -----------------------------------------------------------------------------
 */

import gulp 						from 'gulp';
import concat 					from 'gulp-concat';
import folders					from './folders';
import {reload} 				from './browserSync';


// Task `scripts`
gulp.task('concat', () =>
	gulp.src(`${folders.src}/js/lib/*.js`)
		.pipe(concat('libs.min.js'))
		.pipe(gulp.dest(`${folders.build}/js`))
);

// Task `scripts:watch`
gulp.task('concat:watch', () =>
	gulp.watch(`${folders.src}/js/lib/*.js`, gulp.series('concat', reload))
);