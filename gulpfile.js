var gulp = require('gulp');
gulp.task('copy-assets', function () {
	// Stuff here
    console.log('About to copy files!');
    gulp.src('./game/assets/sprites/characters/*.*').pipe(gulp.dest('dist/assets/sprites/characters'))
    return gulp.src('./game/assets/*.*').pipe(gulp.dest('dist/assets'))
});