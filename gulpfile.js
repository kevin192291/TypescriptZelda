var gulp = require('gulp');
gulp.task('copy-assets', function () {
	// Stuff here
    console.log('About to copy files!');
    gulp.src('./game/assets/sprites/characters/*.*').pipe(gulp.dest('dist/assets/sprites/characters'));
    gulp.src('./game/assets/maps/*.*').pipe(gulp.dest('dist/assets/maps'))
    return gulp.src('./game/assets/*.*').pipe(gulp.dest('dist/assets'))
});