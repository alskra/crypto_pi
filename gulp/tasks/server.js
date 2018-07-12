'use strict';

import paths from "../paths";
import browserSync from 'browser-sync';

export const bs = browserSync.create();

export default function server() {
  // bs.watch(paths.dest, function (event, filepath) {
  //   bs.reload(filepath);
  // });

  bs.init({
    server: {
      baseDir: paths.dest,
      index: 'pages-list.html'
    }
  });
};