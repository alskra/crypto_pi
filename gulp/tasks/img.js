'use strict';

import paths from "../paths";
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import combiner from 'stream-combiner2';
import imageminJpegRecompress from 'imagemin-jpeg-recompress';
import path from 'path';
import {bs} from './server';

const removeSvgProperties = require('remove-svg-properties');

const gp = gulpLoadPlugins();
const rsp = removeSvgProperties.stream;

export default gulp.parallel(
  function imgCommon() {
    return combiner.obj([
      gulp.src(paths.img.src),
      gp.newer(paths.img.dest),
      gp.imagemin([
        gp.imagemin.gifsicle({interlaced: true}),
        imageminJpegRecompress({progressive: true}),
        gp.imagemin.optipng({optimizationLevel: 5}),
        gp.imagemin.svgo({
          plugins: [
            {removeViewBox: false},
            {cleanupIDs: true}
          ]
        })
      ], {
        verbose: true
      }),
      gp.debug({title: "Asset task 'imgCommon'"}),
      gulp.dest(paths.img.dest),
      bs.stream({once: true})
    ]).on('error', gp.notify.onError(function (err) {
      return {
        title: "Error task 'imgCommon'",
        message: err.message
      }
    }));
  },
  function imgSvgSymbols() {
    return combiner.obj([
      gulp.src(paths.img.srcSVGSymbolsIcons),
      gp.if(function (file) {
        return file.relative.indexOf('rsp') !== -1;
      }, rsp.remove({
        properties: [rsp.PROPS_FILL],
        namespaces: ['i', 'sketch', 'inkscape']
      })),
      gp.svgmin(function getOptions(file) {
        return {
          plugins: [
            {removeViewBox: false},
            {
              cleanupIDs: {
                prefix: file.basename + '-',
                minify: true
              }
            }
          ]
        }
      }),
      gp.svgSymbols(
        {
          id: 'icon-svg-%f',
          class: '.icon-svg-%f',
          fontSize: 16,
          svgAttrs: {
            class: 'svg-symbols',
            style: 'position: absolute; clip: rect(0, 0, 0, 0);'
          },
          templates: ['default-svg', paths.img.srcSVGSymbolsCSS, 'default-demo']
        }
      ),
      gp.debug({title: "Asset task 'imgSvgSymbols'"}),
      gulp.dest(function (file) {
        return file.extname === '.svg' ? paths.img.dest : file.extname === '' ? (file.basename = 'svg-symbols.css', paths.img.destSVGSymbolsCSS) : paths.html.dest
      }),
      bs.stream({once: true})
    ]).on('error', gp.notify.onError(function (err) {
      return {
        title: "Error task 'imgSvgSymbols'",
        message: err.message
      }
    }));
  }
);