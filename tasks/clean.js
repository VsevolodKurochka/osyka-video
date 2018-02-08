/**
 * Clean
 * -----------------------------------------------------------------------------
 */

import gulp 						from 'gulp';
import folders					from './folders';
import del 							from 'del';


// Task `clean`
gulp.task('clean', () =>
	del(`${folders.build}`, {force: true})
);