var gulp = require('gulp');
gulp.task('copy-assets', function () {
	// Stuff here
    console.log('About to copy files!');
    return gulp.src('./game/assets/*.*').pipe(gulp.dest('dist/assets'))
});