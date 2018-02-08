/**
 * PUG
 * -----------------------------------------------------------------------------
 */
 
import gulp 						from 'gulp';
import folders					from './folders';
import notify 					from 'gulp-notify';
import pug 							from 'gulp-pug';
import {server, reload, serve} from './browserSync';


// Task `templates`
gulp.task('templates', () =>
	gulp.src(`${folders.src}/views/site/**/*.pug`)
		.pipe(pug({ basedir: `${folders.src}/views`, pretty: true }))
		.on('error', notify.onError({
				title: 'PUG Error',
				message: '<%= error.message %>'
		}))
		.pipe(gulp.dest(`${folders.build}`))
);


// Tassk `templates:watch`
gulp.task('templates:watch', () => {
	gulp.watch(`${folders.src}/views/**/*.pug`, gulp.series('templates', reload))
		.on('all', (event, filepath) => {
			global.emittyChangedFile = filepath;
		})
});