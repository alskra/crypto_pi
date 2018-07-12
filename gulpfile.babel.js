'use strict';

import gulp from 'gulp';
import clean from './gulp/tasks/clean';
import html from './gulp/tasks/html';
import css from './gulp/tasks/css';
import js from './gulp/tasks/js';
import img from './gulp/tasks/img';
import copy from './gulp/tasks/copy';
import watch from './gulp/tasks/watch';
import server from './gulp/tasks/server';

gulp.task('set-node-env-prod', function (done) {
  process.env.NODE_ENV = 'production';
  done();
});

gulp.task(clean);
gulp.task(html);
gulp.task(css);
gulp.task(js);
gulp.task('img', img);
gulp.task(copy);
gulp.task(watch);
gulp.task(server);

gulp.task('default', gulp.series('clean', 'img', gulp.parallel('html', 'css', 'js', 'copy'), gulp.parallel('watch', 'server')));
gulp.task('prod', gulp.series('set-node-env-prod', 'default'));