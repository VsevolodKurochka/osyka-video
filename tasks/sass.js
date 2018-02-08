/**
 * SASS
 * -----------------------------------------------------------------------------
 */

import gulp 						from 'gulp';
import folders					from './folders';
import sass 						from 'gulp-sass';
import sassGlob 				from 'gulp-sass-glob';
import autoprefixer 		from 'gulp-autoprefixer';
import csscomb 					from 'gulp-csscomb';
import {server, reload, serve} from './browserSync';


// Task `sass`
gulp.task('sass', () => gulp
	.src(`${folders.src}/sass/**/*.+(sass|scss)`)
	.pipe(sassGlob())
	.pipe(sass({
		outputStyle: 'expanded'
	}).on('error', sass.logError))
	.pipe(csscomb())
	.pipe(autoprefixer({
		browsers: ['last 15 versions'],
		cascade: false
	}))
	.pipe(gulp.dest(`${folders.build}/css`))
);


// Task `sass:watch`
gulp.task('sass:watch', () => {
	gulp.watch(`${folders.src}/sass/**/*.+(sass|scss)`, gulp.series('sass', reload));
});
