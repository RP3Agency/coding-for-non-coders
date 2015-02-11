var gulp = require('gulp'),
	markdown = require('gulp-markdown'),
	reveal = require('gulp-reveal'), 
	notify = require('gulp-notify'), 
	express = require('express'),
	paths = {
		target: './target/',
		base: './src/',
		vendor: './src/vendor/**',
		markdown: './src/*.md',
		template: './template.mustache'
		
	};
 
gulp.task('markdown', function () {
  return gulp.src(paths.markdown)
    .pipe(markdown())
    .pipe(reveal({template: paths.template }))
    .pipe(gulp.dest(paths.target));
});
 
gulp.task('express', function () {
  var app = express();
  app.use(express.static(paths.target));
  app.listen(5000);
});

gulp.task('vendor', function () {
    return gulp.src(paths.vendor, {base: paths.base})
        .pipe(gulp.dest(paths.target))
  		.pipe(notify({message: 'vendor copied'}));
}); 
 
 
 
gulp.task('default', ['markdown', 'vendor']); 
 
gulp.task('watch', ['express'], function () {
  gulp.watch(paths.markdown, ['default']);
});