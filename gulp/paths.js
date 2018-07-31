'use strict';

const src = 'src', dest = 'dist';

export default {
  src,
  dest,
  clean: dest,
  html: {
    src: `${src}/pug/*.pug`,
    dest,
    watch: `${src}/**/*.{pug,html,json}`
  },
  css: {
    src: `${src}/scss/*.scss`,
    dest: `${dest}/css`,
    watch: `${src}/**/*.{scss,css}`
  },
  js: {
    src: `${src}/js/*.js`,
    dest: `${dest}/js`,
    watch: `${src}/**/*.js`
  },
  img: {
    src: `${src}/img/**/*.{jpeg,jpg,png,gif,svg}`,
    dest: `${dest}/img`,
    srcSASSImage: [`${dest}/img/**/*.{jpeg,jpg,png,gif,svg}`, `!${dest}/img/content/**/*.*`],
    destSASSImage: `${src}/scss/lib`,
    srcSVGSymbolsIcons: `${dest}/img/icons/**/*.svg`,
    srcSVGSymbolsCSS: `${src}/vendors/svg-symbols/template-css`,
    destSVGSymbolsCSS: `${src}/scss/lib`,
    watch: `${src}/img/**/*.{jpeg,jpg,png,gif,svg}`
  },
  copy: {
    src: [`${src}/data/**/*`, `${src}/favicon/**/*`, `${src}/fonts/**/*`, `${src}/vendors/**/*`],
    dest,
    watch: [`${src}/data/**/*`, `${src}/favicon/**/*`, `${src}/fonts/**/*`, `${src}/vendors/**/*`]
  }
};