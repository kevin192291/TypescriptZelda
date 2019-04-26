const gulp = require('gulp');
const changed = require('gulp-changed');

gulp.task('copy-assets', function () {
    gulp.src('./game/assets/sprites/characters/*.*').pipe(changed('dist/assets/sprites/characters'));
    gulp.src('./game/assets/tilemaps/*.*').pipe(changed('dist/assets/tilemaps'));
    gulp.src('./game/assets/tilesets/*.*').pipe(changed('dist/assets/tilesets'));
    gulp.src('./game/assets/music/*.*').pipe(changed('dist/assets/music'));
    return gulp.src('./game/assets/*.*').pipe(changed('dist/assets'));
});