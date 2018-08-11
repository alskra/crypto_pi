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

export default gulp.series(
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
            {
              cleanupIDs: {
                prefix: {
                  toString() {
                    this.counter = this.counter || 0;
                    return `id-${this.counter++}`;
                  }
                }
              }
            },
            {
              inlineStyles: {
                onlyMatchedOnce: false,
                removeMatchedSelectors: true,
                useMqs: ['', 'screen'],
                usePseudos: ['']
              }
            },
            {convertStyleToAttrs: true}
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
  function imgSASSImage() {
    return combiner.obj([
      gulp.src(paths.img.srcSASSImage),
      gp.sassImage({
        targetFile: 'sass-image.scss',
        images_path: paths.img.dest,
        css_path: paths.css.dest,
        prefix: ''
      }),
      gp.debug({title: "Asset task 'imgSASSImage'"}),
      gulp.dest(paths.img.destSASSImage),
      bs.stream({once: true})
    ]).on('error', gp.notify.onError(function (err) {
      return {
        title: "Error task 'imgSASSImage'",
        message: err.message
      }
    }));
  },
  function imgSVGSymbols() {
    return combiner.obj([
      gulp.src(paths.img.srcSVGSymbolsIcons),
      gp.if(function (file) {
        return file.relative.indexOf('rsp') !== -1;
      }, rsp.remove({
        properties: [rsp.PROPS_FILL],
        namespaces: ['i', 'sketch', 'inkscape']
      })),
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
      gp.debug({title: "Asset task 'imgSVGSymbols'"}),
      gulp.dest(function (file) {
        return file.extname === '.svg' ? paths.img.dest : file.extname === '.scss' ? (file.basename = 'svg-symbols.scss', paths.img.destSVGSymbolsCSS) : paths.html.dest
      }),
      bs.stream({once: true})
    ]).on('error', gp.notify.onError(function (err) {
      return {
        title: "Error task 'imgSVGSymbols'",
        message: err.message
      }
    }));
  }
);