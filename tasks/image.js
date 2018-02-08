/**
 * Optimize PNG, JPEG, GIF, SVG images.
 * -----------------------------------------------------------------------------
 */
 
import gulp 						from 'gulp';
import folders					from './folders';
import image 						from 'gulp-image';
import del 							from 'del';
import {server, reload, serve} from './browserSync';


// Task `image`
gulp.task('image', () => {
	//del(`${folders.build}/img`, {force: true})
	gulp.src(`${folders.src}/img/**/*`)
		.pipe(image({
			zopflipng: false,
			svgo: false
		}))
		.pipe(gulp.dest(`${folders.build}/img`))
});


// Task `image:watch`
gulp.task('image:watch', () =>
	gulp.watch(`${folders.src}/img/**/*`).on('all', gulp.series('image', reload))
);