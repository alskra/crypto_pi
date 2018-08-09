'use strict';

import paths from "../paths";
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import combiner from 'stream-combiner2';
import * as emitty from 'emitty';
import {bs} from './server';

const gp = gulpLoadPlugins();
const emittySCSS = emitty.setup(paths.src, {
  extends: 'scss',
  matcher: /@import[\t ]+['"](?!http)([^'"]+)['"]\s*/
});

export default function css() {
  const development = process.env.NODE_ENV !== 'production';
  const changedFile = global.scssChangedFile;

  global.scssChangedFile = undefined;

  return combiner.obj([
    gulp.src(paths.css.src),
    gp.if(global.watch && changedFile !== undefined, emittySCSS.stream(changedFile), (emittySCSS.scan(), null)),
    gp.sourcemaps.init(),
    gp.cssimport({matchPattern: '*.css'}),
    gp.sass({
      outputStyle: 'expanded'
    }),
    gp.autoprefixer({
      cascade: false
    }),
    gp.pxtorem({
      rootValue: 16,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: ['.visuallyhidden', '.min-w-0'],
      replace: true,
      mediaQuery: true,
      minPixelValue: 0
    }),
    gp.sourcemaps.write('.'),
    gp.debug({title: "Asset task 'css'"}),
    gulp.dest(paths.css.dest),
    gp.if(!development, combiner.obj([
      gp.filter(['**', '!**/*.min.*', '!**/*.map']),
      gp.rename({suffix: '.min'}),
      gp.csso({
        sourceMap: false,
        debug: true
      }),
      gp.debug({title: "Asset task 'css'"}),
      gulp.dest(paths.css.dest)
    ])),
    bs.stream()
  ]).on('error', gp.notify.onError(function (err) {
    return {
      title: "Error task 'css'",
      message: err.message
    }
  }));
};