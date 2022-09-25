import gulp from 'gulp'
import browsersync from 'browser-sync'


export default function favicons() {
  return gulp.src('src/favicons/**/*')
    .pipe(gulp.dest('build'))
    .on('end', browsersync.reload)
}
