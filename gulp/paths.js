'use strict';

const src = 'src', dest = 'dist';

export default {
  src,
  dest,
  clean: dest,
  html: {
    src: `${src}/pug/*.pug`,
    dest,
    watch: `${src}/**/*.{html,pug,json}`
  },
  css: {
    src: `${src}/scss/*.scss`,
    dest: `${dest}/css`,
    watch: `${src}/**/*.{css,scss}`
  },
  js: {
    src: `${src}/js/*.js`,
    dest: `${dest}/js`,
    watch: `${src}/**/*.js`
  },
  img: {
    src: `${src}/img/**/*.*`,
    dest: `${dest}/img`,
    srcSVGSymbolsIcons: `${src}/img/icons/**/*.svg`,
    srcSVGSymbolsCSS: `${src}/vendors/svg-symbols/template-css`,
    destSVGSymbolsCSS: `${src}/vendors/svg-symbols`,
    watch: `${src}/img/**/*.*`
  },
  copy: {
    src: [`${src}/favicon/**/*.*`, `${src}/fonts/**/*.*`, `${src}/vendors/**/*.*`, `${src}/data/**/*.*`],
    dest,
    watch: [`${src}/favicon/**/*.*`, `${src}/fonts/**/*.*`, `${src}/vendors/**/*.*`, `${src}/data/**/*.*`]
  }
};