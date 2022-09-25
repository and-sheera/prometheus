import gulp from 'gulp'
import plumber from 'gulp-plumber'
import gulpStylelint from 'gulp-stylelint'
import filter from 'gulp-filter'
import sassGlob from 'gulp-sass-glob'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import rename from 'gulp-rename'
import browsersync from 'browser-sync'
import header from 'gulp-header'

const sass = gulpSass(dartSass)

const headerStyles = `@import '../../styles/utils/variables';\n@import '../../styles/utils/media';\n@import '../../styles/utils/fonts';\n\n`

export default function styles() {
  return gulp.src('src/**/*.scss')
    .pipe(filter(['src/styles/**/*.scss', '!src/styles/style.scss'])) // копирование scss
    .pipe(gulp.dest('build'))
    .pipe(gulp.src('src/**/*.scss')) // преобразование в css
    .pipe(plumber())
    .pipe(gulpStylelint({
      failAfterError: false,
      reporters: [{ formatter: 'string', console: true }]
    }))
    .pipe(filter(['src/styles/style.scss', 'src/styles/main.scss']))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest('build'))
    .pipe(gulp.src('src/**/*.scss')) // билд только (!) UI scss
    .pipe(filter('src/blocks/_ui/**/*.scss'))
    .pipe(rename(function(path) {
      path.basename = `_${path.basename}`
    }))
    .pipe(gulp.dest('build'))
    .pipe(gulp.src('src/**/*.scss')) // отдльные стили для блоков scss
    .pipe(filter(['src/blocks/**/*.scss', '!src/blocks/_ui/**/*.scss']))
    .pipe(header(headerStyles))
    .pipe(gulp.dest('build'))
    .pipe(gulp.src('src/**/*.scss')) // преобразование для блоков в css
    .pipe(filter(['src/blocks/**/*.scss', '!src/blocks/_ui/**/*.scss']))
    .pipe(header(headerStyles))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest('build'))
    .pipe(gulp.src('src/**/*.css')) // библиотеки
    .pipe(filter('src/libs/**/*.css'))
    .pipe(gulp.dest('build'))
    // .pipe(browsersync.stream())
    .on('end', browsersync.reload)
}
