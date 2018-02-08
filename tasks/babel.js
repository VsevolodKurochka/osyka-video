/**
 * JS
 * -----------------------------------------------------------------------------
 */

import gulp 						from 'gulp';
import folders					from './folders';
import babel 						from 'gulp-babel';
import notify 					from 'gulp-notify';
import {server, reload, serve} from './browserSync';


// Task `scripts`
gulp.task('scripts', () =>
	gulp.src(`${folders.src}/js/*.js`)
		.pipe(babel())
		.on('error', notify.onError({
			title: 'Babel Error',
			message: '<%= error.message %>'
		}))
		.pipe(gulp.dest(`${folders.build}/js`))
);

// Task `scripts:watch`
gulp.task('scripts:watch', () =>
	gulp.watch(`${folders.src}/js/*.js`, gulp.series('scripts', reload))
);