var gulp = require('gulp');
gulp.task('copy-assets', function () {
	// Stuff here
    console.log('About to copy files!');
    gulp.src('./game/assets/sprites/characters/*.*').pipe(gulp.dest('dist/assets/sprites/characters'));
    gulp.src('./game/assets/tilemaps/*.*').pipe(gulp.dest('dist/assets/tilemaps'));
    gulp.src('./game/assets/tilesets/*.*').pipe(gulp.dest('dist/assets/tilesets'));
    gulp.src('./game/assets/music/*.*').pipe(gulp.dest('dist/assets/music'));
    return gulp.src('./game/assets/*.*').pipe(gulp.dest('dist/assets'));
});