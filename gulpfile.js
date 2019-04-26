const gulp = require('gulp');
const changed = require('gulp-changed');

gulp.task('copy-assets', function() {
    // Copy the Character sprites
  gulp
    .src('./game/assets/sprites/characters/*.*')
    .pipe(changed('dist/assets/sprites/characters'))
    .pipe(gulp.dest('dist/assets/sprites/characters'));
    // Copy the tile maps
  gulp
    .src('./game/assets/tilemaps/*.*')
    .pipe(changed('dist/assets/tilemaps'))
    .pipe(gulp.dest('dist/assets/tilemaps'));
    // copy the tilesets (pngs)
  gulp
    .src('./game/assets/tilesets/*.*')
    .pipe(changed('dist/assets/tilesets'))
    .pipe(gulp.dest('dist/assets/tilesets'));
    // copy the audio
  gulp
    .src('./game/assets/music/*.*')
    .pipe(changed('dist/assets/music'))
    .pipe(gulp.dest('dist/assets/music'));
    // Copy everything else in the asset directory
  return gulp
    .src('./game/assets/*.*')
    .pipe(changed('dist/assets'))
    .pipe(gulp.dest('dist/assets'));
});
