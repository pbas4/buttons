const gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create()
  

gulp.task('sass', () => {
  return gulp.src('./button-styles/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
});

gulp.task('serve', ['sass'], () => {
  browserSync.init({
    server: './'
  })

  gulp.watch('./button-styles/*.scss', ['sass'])
  gulp.watch('./*.html').on('change', browserSync.reload)
})
  
gulp.task('sass:watch', function () {
  gulp.watch('./button-styles/*.scss', ['sass']);
});

gulp.task('default', ['serve'])