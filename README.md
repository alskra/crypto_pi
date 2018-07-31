# Начало работы со сборкой
Для работы сборки должны быть установлены:

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [Gulp.js](https://gulpjs.com/) - глобальная установка: `npm install gulp-cli -g`

## Установка зависимостей из package.json
В каталоге проекта выполнить: `yarn`.

После установки зависимостей сборка готова к работе.

## Файловая структура
```
dist // собранные файлы проекта
|--css // стили
|--data // json-данные
|--favicon // файлы favicon
|--fonts // шрифты
|--img // изображения
|  |--content // контентные изображения
|  |--icons // иконки
|  |  |--rsp
|  |--svg-symbols.svg // svg-спрайт
|--js // скрипты
|--vendors // библиотеки
|--*.html // страницы
gulp
|--tasks // задачи gulp
node_modules
src // исходники файлов проекта
|--data // json-данные
|--favicon // файлы favicon
|--fonts // шрифты
|--img // изображения
|  |--content // контентные изображения
|  |--icons // иконки; svg-иконки доступны после сборки напрямую и через спрайт
|     |--rsp // svg-иконки для обработки "remove-svg-properties"
|--js // скрипты
|  |--blocks
|  |--lib
|--pug // шаблоны
|  |--blocks
|  |--lib
|--scss // стили
|  |--blocks
|  |--lib
|--vendors // библиотеки
```

## Gulp-задачи
- `gulp clean` - очистить `./dist`
- `gulp html` - собрать `./src/pug/*.pug`
- `gulp css` - собрать `./src/scss/*.scss`
- `gulp js` - собрать `./src/js/*.js`
- `gulp img` - оптимизация изображений, а также генерация svg-спрайта
- `gulp copy` - копирование файлов `./src/favicon/**/*.*`, `./src/fonts/**/*.*`, `./src/vendors/**/*.*`, `./src/data/**/*.*` в `./dist`
- `gulp watch` - отслеживание изменений и запуск соответствующих тасков для всех редактируемых исходников
- `gulp server` - сервер на директории `./dist`
- `gulp`, `gulp default` - сборка в режиме **development**.
- `gulp prod` - сборка в режиме **production** (то же, что **development** + минификация `*.css` и `*.js`)

## Дополнительно (при инициализации проекта с нуля)
### Установка dev-зависимостей:
```
yarn add --dev babel-core babel-loader babel-preset-env bemto.pug browser-sync del emitty gulp@4.0.0 gulp-autoprefixer gulp-clean-css gulp-cssimport gulp-debug gulp-filter gulp-if gulp-imagemin gulp-inline-css gulp-load-plugins gulp-newer gulp-notify gulp-prettify gulp-pug gulp-pxtorem gulp-rename gulp-sass gulp-sass-glob gulp-sass-image gulp-sourcemaps gulp-svg-symbols gulp-svgmin gulp-typograf gulp-uglify imagemin-jpeg-recompress remove-svg-properties stream-combiner2 vinyl-named webpack webpack-stream
```

### Polyfills
```
yarn add babel-polyfill css-vars-ponyfill element-closest nodelist-foreach-polyfill
```

### Параметры browserslist и babel
```json
{
  "browserslist": ["> 0.5%", "last 2 versions", "Firefox ESR", "not dead", "IE >= 10"],
  "babel": {
    "presets": [
      ["env", {
        "targets": {
          "browsers": ["> 0.5%", "last 2 versions", "Firefox ESR", "not dead", "IE >= 10"]
        },
        "useBuiltIns": true
      }]
    ]
  }
}
```