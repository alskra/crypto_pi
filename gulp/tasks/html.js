'use strict';

import paths from '../paths';
import pkg from '../../package';
import readdirsyncRecursive from '../readdirsync-recursive';
import fs from 'fs';
import camelize from '../camelize';
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

  readdirsyncRecursive(`${paths.src}/json`).forEach((item) => {
    if (fs.statSync(item).isFile() && path.extname(item) === '.json') {
      locals[camelize(path.basename(item, path.extname(item)))] = JSON.parse(fs.readFileSync(item));
    }
  });

  return combiner.obj([
    gulp.src(paths.html.src),
    gp.if(global.watch && changedFile !== undefined && path.extname(changedFile) !== '.json', emittyPug.stream(changedFile)),
    gp.pug({
      locals
    }),
    gp.prettyHtml({
      indent_size: 2,
      indent_char: ' ',
      preserve_newlines: false,
      brace_style: 'collapse',
      indent_scripts: 'normal',
      unformatted: ['b', 'strong', 'i', 'em', 'mark', 'small', 'del', 'ins', 'sub', 'sup', 'code', 'br', 'span'],
      content_unformatted: ['pre', 'no-html-formatted']
    }),
    gp.typograf({
      locale: ['ru', 'en-US'],
      htmlEntity: {type: 'default'},
      safeTags: [
        ['<\\?php', '\\?>'],
        ['<pre', '/pre>'],
        ['<code', '/code>'],
        ['<textarea', '/textarea>'],
        ['<no-typography', '/no-typography>']
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
