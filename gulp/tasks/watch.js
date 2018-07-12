'use strict';

import paths from "../paths";
import gulp from 'gulp';
import path from 'path';

export default function watch() {
  global.watch = true;

  gulp.watch(paths.html.watch, gulp.series('html'))
    .on('all', (event, filepath) => {
      console.log(`Watch 'html:' => event: ${event}, filepath: ${filepath}`);
      event !== 'unlink' ? global.pugChangedFile = filepath : undefined;
    });
  gulp.watch(paths.css.watch, gulp.series('css'))
    .on('all', (event, filepath) => {
      event !== 'unlink' ? global.scssChangedFile = filepath : undefined;
    });
  gulp.watch(paths.js.watch, gulp.series('js'));
  gulp.watch(paths.img.watch, gulp.series('img'));
  gulp.watch(paths.copy.watch, gulp.series('copy'));
};