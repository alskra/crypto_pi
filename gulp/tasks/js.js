'use strict';

import paths from "../paths";
import gulp from 'gulp';
import named from 'vinyl-named';
import gulpLoadPlugins from 'gulp-load-plugins';
import combiner from 'stream-combiner2';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import {bs} from './server';

const gp = gulpLoadPlugins();

export default function js() {
  const development = process.env.NODE_ENV !== 'production';
  return combiner.obj([
    gulp.src(paths.js.src),
    named(),
    gp.if(function (file) {
      return file.basename === 'lib.js';
    }, webpackStream({
      mode: 'none',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
          }
        ]
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        })
      ],
      devtool: 'source-map',
    }, webpack), webpackStream({
      mode: 'none',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
          }
        ]
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        })
      ],
      externals: {
        jquery: 'jQuery'
      },
      devtool: 'source-map',
    }, webpack)),
    gp.debug({title: "Asset task 'js'"}),
    gulp.dest(paths.js.dest),
    gp.if(!development, combiner.obj([
      gp.filter(['**', '!**/*.min.*', '!**/*.map']),
      gp.rename({suffix: '.min'}),
      gp.uglify(),
      gp.debug({title: "Asset task 'js'"}),
      gulp.dest(paths.js.dest)
    ])),
    bs.stream({once: true})
  ]).on('error', gp.notify.onError(function (err) {
    return {
      title: "Error task 'js'",
      message: err.message
    }
  }));
};