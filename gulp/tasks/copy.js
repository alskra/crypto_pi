'use strict';

import paths from "../paths";
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import combiner from 'stream-combiner2';
import {bs} from './server';

const gp = gulpLoadPlugins();

export default function copy() {
  return combiner.obj([
    gulp.src(paths.copy.src, {base: paths.src}),
    gp.debug({title: "Asset task 'copy'"}),
    gulp.dest(paths.copy.dest),
    bs.stream({once: true})
  ]).on('error', gp.notify.onError(function (err) {
    return {
      title: "Error task 'copy'",
      message: err.message
    }
  }));
};