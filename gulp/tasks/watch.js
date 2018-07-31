'use strict';

import paths from "../paths";
import gulp from 'gulp';

export default function watch() {
  global.watch = true;

  gulp.watch(paths.html.watch, gulp.series('html'))
    .on('all', (event, filepath) => {
      console.log(`Watch 'html:' => event: ${event}, filepath: ${filepath}`);
      event !== 'unlink' && global.pugChangedFile === undefined ? global.pugChangedFile = filepath : global.pugChangedFile = undefined;
    });
  gulp.watch(paths.css.watch, gulp.series('css'))
    .on('all', (event, filepath) => {
      console.log(`Watch 'css:' => event: ${event}, filepath: ${filepath}`);
      event !== 'unlink' && global.scssChangedFile === undefined ? global.scssChangedFile = filepath : global.scssChangedFile = undefined;
    });
  gulp.watch(paths.js.watch, gulp.series('js'));
  gulp.watch(paths.img.watch, gulp.series('img'));
  gulp.watch(paths.copy.watch, gulp.series('copy'));
};