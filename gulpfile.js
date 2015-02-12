var gulp = require('gulp'),
	markdown = require('gulp-markdown'),
	reveal = require('gulp-reveal'), 
	notify = require('gulp-notify'), 
	express = require('express'),
	del = require('del'),
	paths = {
		target: './target/',
		base: './src/',
		vendor: './src/vendors/**',
		markdown: './src/*.md',
		template: './template.mustache',
		img: './src/img/**',
		html: './src/**.html'
		
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
 
gulp.task('html', function () {
    return gulp.src(paths.html, {base: paths.base})
        .pipe(gulp.dest(paths.target))
  		.pipe(notify({message: 'html copied'}));
}); 

gulp.task('img', function () {
    return gulp.src(paths.img, {base: paths.base})
        .pipe(gulp.dest(paths.target))
  		.pipe(notify({message: 'img copied'}));
}); 

gulp.task('clean', function (cb) {
  del([
    paths.target
    ], cb);
});

gulp.task('default', ['markdown', 'vendor', 'html', 'img']); 
 
gulp.task('watch', ['express'], function () {
  gulp.watch(paths.markdown, ['default']);
});