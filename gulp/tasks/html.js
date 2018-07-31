'use strict';

import paths from '../paths';
import pkg from '../../package';
import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import combiner from 'stream-combiner2';
import * as emitty from 'emitty';
import {bs} from './server';

const gp = gulpLoadPlugins();
const emittyPug = emitty.setup(paths.src, 'pug');

export default function html() {
  const development = process.env.NODE_ENV !== 'production';
  const locals = {
    pkg,
    development
  };
  const changedFile = global.pugChangedFile;

  global.pugChangedFile = undefined;

  fs.readdirSync(`${paths.src}/data`).forEach((item) => {
    let filepath = path.resolve(`${paths.src}/data`, item),
      extname = path.extname(filepath);
    if (fs.lstatSync(filepath).isFile() && extname === '.json') {
      locals[path.basename(filepath, extname)] = JSON.parse(fs.readFileSync(filepath));
    }
  });

  return combiner.obj([
    gulp.src(paths.html.src),
    gp.if(global.watch && changedFile !== undefined && path.extname(changedFile) !== '.json', emittyPug.stream(changedFile)),
    gp.pug({
      locals
    }),
    gp.prettify({indent_inner_html: true, indent_size: 2, unformatted: ['pre', 'code']}),
    gp.typograf({
      locale: ['ru', 'en-US'],
      htmlEntity: {type: 'default'},
      safeTags: [
        ['<\\?php', '\\?>'],
        ['<textarea>', '</textarea>']
      ]
    }),
    gp.debug({title: "Asset task 'html'"}),
    gulp.dest(paths.html.dest),
    bs.stream({once: true})
  ]).on('error', gp.notify.onError(function (err) {
    return {
      title: "Error task 'html'",
      message: err.message
    }
  }));
};
